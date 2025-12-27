import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const type = formData.get('type'); // بنشوف نوع الرسالة إيه

    // إعداد "الناقل" (Transporter) - ثابت في الحالتين
    const transporter = nodemailer.createTransport({
      service: 'gmail', // غيرها لاسم الهوست لما تشتري الدومين الرسمي
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    let mailOptions: any = {};

    // ==========================================
    // الحالة الأولى: رسالة تواصل معنا (Contact Us)
    // ==========================================
    if (type === 'contact') {
      const fullName = formData.get('fullName');
      const phone = formData.get('phone');
      const email = formData.get('email');
      const address = formData.get('address');
      const message = formData.get('message');

      mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: process.env.RECEIVER_EMAIL,
        subject: `📩 رسالة تواصل جديدة من: ${fullName}`,
        html: `
          <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #2563EB;">رسالة جديدة من الموقع</h2>
            <p><strong>الاسم:</strong> ${fullName}</p>
            <p><strong>الموبايل:</strong> ${phone}</p>
            ${email ? `<p><strong>البريد الإلكتروني:</strong> ${email}</p>` : ''}
            ${address ? `<p><strong>العنوان:</strong> ${address}</p>` : ''}
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <h3 style="margin-bottom: 10px;">نص الرسالة:</h3>
            <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
            <br/>
            <small style="color: #888;">تم الإرسال عبر نموذج "تواصل معنا"</small>
          </div>
        `,
      };
    } 
    // ==========================================
    // الحالة الثانية: تقديم وظيفة (Job Application)
    // ==========================================
    else {
      const fullName = formData.get('fullName');
      const phone = formData.get('phone');
      const address = formData.get('address');
      const jobTitle = formData.get('jobTitle');
      const experience = formData.get('experience');
      const previousCompanies = formData.get('previousCompanies');
      const cvFile: File | null = formData.get('cv') as unknown as File;

      mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: process.env.RECEIVER_EMAIL,
        subject: `🚀 تقديم جديد: ${jobTitle} - ${fullName}`,
        html: `
          <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #2563EB;">طلب توظيف جديد</h2>
            <p><strong>الاسم:</strong> ${fullName}</p>
            <p><strong>رقم الهاتف:</strong> ${phone}</p>
            <p><strong>العنوان:</strong> ${address}</p>
            <p><strong>الوظيفة المتقدم لها:</strong> <span style="color: #d97706; font-weight: bold;">${jobTitle}</span></p>
            <p><strong>الخبرة:</strong> ${experience === 'yes' ? '✅ يوجد خبرة سابقة' : '❌ لا يوجد خبرة'}</p>
            ${previousCompanies ? `<p><strong>الشركات السابقة:</strong><br/> ${previousCompanies}</p>` : ''}
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>تم الإرسال من خلال موقع ECC Collections</p>
          </div>
        `,
        attachments: []
      };

      // إرفاق ملف الـ CV لو موجود
      if (cvFile && cvFile.size > 0) {
        const buffer = Buffer.from(await cvFile.arrayBuffer());
        mailOptions.attachments.push({
          filename: cvFile.name,
          content: buffer,
        });
      }
    }

    // ==========================================
    // إرسال الإيميل النهائي
    // ==========================================
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}