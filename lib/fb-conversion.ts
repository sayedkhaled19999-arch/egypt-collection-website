// المسار: lib/fb-conversion.ts
import bizSdk from 'facebook-nodejs-business-sdk';

const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

// تعريف البيانات
interface CustomerData {
  email: string;
  phone?: string;
  firstName?: string; // الاسم الأول للمتقدم
  lastName?: string;  // اسم العائلة
  ip: string;
  userAgent: string;
}

interface EventData {
  eventName: 'SubmitApplication' | 'Contact'; // الأحداث التي تهمك
  eventId: string;   
  url: string;
  contentName?: string; // هنا نضع اسم الوظيفة المتقدم لها
}

const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
const pixel_id = process.env.FACEBOOK_PIXEL_ID;

// التحقق من وجود التوكن لتجنب الأخطاء
if (!access_token || !pixel_id) {
  throw new Error("Missing FACEBOOK_ACCESS_TOKEN or FACEBOOK_PIXEL_ID in .env");
}

const api = bizSdk.FacebookAdsApi.init(access_token);

export const sendFbEvent = async (customer: CustomerData, eventDetails: EventData) => {
  const current_timestamp = Math.floor(new Date().getTime() / 1000);

  try {
    // 1. بيانات المستخدم
    const userData = (new UserData())
      .setEmail(customer.email.toLowerCase())
      .setClientIpAddress(customer.ip)
      .setClientUserAgent(customer.userAgent);

    if (customer.phone) userData.setPhone(customer.phone);
    if (customer.firstName) userData.setFirstName(customer.firstName);
    if (customer.lastName) userData.setLastName(customer.lastName);

    // 2. بيانات الحدث (اسم الوظيفة مثلاً)
    const customData = (new CustomData());
    
    // إذا كان هناك اسم للوظيفة، نضعه هنا
    if (eventDetails.contentName) {
      customData.setContentName(eventDetails.contentName); 
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

    // 4. إرسال الطلب
    const eventsData = [serverEvent];
    const eventRequest = (new EventRequest(access_token, pixel_id))
      .setEvents(eventsData);

    // eventRequest.setTestEventCode('TESTxxxxx'); // فعل هذا السطر أثناء التجربة فقط

    const response = await eventRequest.execute();
    console.log(`✅ FB Event Sent: ${eventDetails.eventName}`);
    return response;

  } catch (error) {
    console.error('❌ FB Event Error:', error);
    return null;
  }
};