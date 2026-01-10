// المسار: app/api/conversion/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendFbEvent } from '@/lib/fb-conversion';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // نستقبل اسم الوظيفة (jobTitle) ونوع الحدث
    const { email, phone, firstName, lastName, eventName, jobTitle, url, userEventId } = body;

    const userAgent = req.headers.get('user-agent') || '';
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // استخدام ID مرسل أو جديد
    const eventId = userEventId || uuidv4();

    await sendFbEvent(
      {
        email: email,
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        ip: ip,
        userAgent: userAgent,
      },
      {
        eventName: eventName || 'Contact', // الافتراضي تواصل
        eventId: eventId,
        url: url || 'https://egyptcollections.com',
        contentName: jobTitle // اسم الوظيفة إن وجد
      }
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}