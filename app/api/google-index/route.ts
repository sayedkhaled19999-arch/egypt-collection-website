import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    // معالجة المفتاح لضمان قراءة السطور الجديدة (\n) بشكل صحيح
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
      return NextResponse.json({ 
        success: false, 
        error: 'المفاتيح السرية غير موجودة في ملف الـ .env' 
      }, { status: 500 });
    }

    // ✅ التعديل هنا: نرسل كائن واحد فقط (Object) للـ JWT
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ version: 'v3', auth });

    const result = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });

    return NextResponse.json({ success: true, data: result.data });
  } catch (error: any) {
    const errorMessage = error.response?.data?.error?.message || error.message;
    console.error('Google Indexing Error:', errorMessage);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}