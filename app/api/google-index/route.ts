import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // التعديل هنا: بنبعت البيانات جوه { } كـ Object واحد عشان الـ TypeScript ميزعلش
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ version: 'v3', auth });

    const result = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });

    return NextResponse.json({ success: true, message: 'تم إرسال الرابط بنجاح!', data: result.data });
  } catch (error: any) {
    console.error('Indexing Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}