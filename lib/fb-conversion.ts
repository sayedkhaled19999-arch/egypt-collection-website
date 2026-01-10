import { 
  FacebookAdsApi, 
  ServerEvent, 
  EventRequest, 
  UserData, 
  CustomData, 
  Content 
} from 'facebook-nodejs-business-sdk';

// تعريف البيانات المتوقعة
interface CustomerData {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  ip: string;
  userAgent: string;
  fbp?: string;
  fbc?: string;
}

interface EventData {
  eventName: 'SubmitApplication' | 'Contact' | 'Purchase' | 'Lead'; 
  eventId: string;   
  url: string;
  contentName?: string; 
  value?: number;
  currency?: string;
}

const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
const pixel_id = process.env.FACEBOOK_PIXEL_ID;

if (!access_token || !pixel_id) {
  throw new Error("Missing FACEBOOK_ACCESS_TOKEN or FACEBOOK_PIXEL_ID in .env");
}

// تهيئة الـ API
const api = FacebookAdsApi.init(access_token);

export const sendFbEvent = async (customer: CustomerData, eventDetails: EventData) => {
  const current_timestamp = Math.floor(new Date().getTime() / 1000);

  try {
    // 1. تجهيز بيانات المستخدم
    const userData = (new UserData())
      .setEmail(customer.email.toLowerCase())
      .setClientIpAddress(customer.ip)
      .setClientUserAgent(customer.userAgent);

    if (customer.phone) userData.setPhone(customer.phone);
    if (customer.firstName) userData.setFirstName(customer.firstName);
    if (customer.lastName) userData.setLastName(customer.lastName);
    if (customer.fbp) userData.setFbp(customer.fbp);
    if (customer.fbc) userData.setFbc(customer.fbc);

    // 2. تجهيز البيانات المخصصة
    const customData = (new CustomData());
    
    if (eventDetails.contentName) {
      customData.setContentName(eventDetails.contentName); 
    }
    
    if (eventDetails.value) {
      customData.setValue(eventDetails.value);
      customData.setCurrency(eventDetails.currency || 'EGP');
    }

    // 3. إنشاء الحدث
    const serverEvent = (new ServerEvent())
      .setEventName(eventDetails.eventName)
      .setEventTime(current_timestamp)
      .setUserData(userData)
      .setCustomData(customData)
      .setEventSourceUrl(eventDetails.url)
      .setActionSource('website')
      .setEventId(eventDetails.eventId);

    // 4. تجهيز الطلب
    const eventsData = [serverEvent];
    const eventRequest = (new EventRequest(access_token, pixel_id))
      .setEvents(eventsData);

    // 5. الإرسال
    const response = await eventRequest.execute();
    console.log(`✅ FB Event Sent: ${eventDetails.eventName}`);
    return response;

  } catch (error) {
    console.error('❌ FB Event Error:', error);
    return null;
  }
};