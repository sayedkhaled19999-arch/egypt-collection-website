import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const type = formData.get('type'); // بنشوف نوع الرسالة إيه

    // ==========================================
    // 👇 التغيير هنا: إعدادات Zoho Mail بدل Gmail
    // ==========================================
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',  // سيرفر زوهو
      port: 465,              // البورت الآمن
      secure: true,           // التشفير SSL
      auth: {
        user: process.env.SMTP_EMAIL, // info@egyptcollections.com
        pass: process.env.SMTP_PASSWORD, // الباسورد بتاعته
      },
    });

    // 👇 اسم المرسل هيبان للناس باسم الشركة الفخم
    const senderIdentity = `"Egypt Collections" <${process.env.SMTP_EMAIL}>`;

    let mailOptions: any = {};

    // ==========================================
    // الحالة الأولى: رسالة تواصل معنا (Contact Us)
    // ==========================================
    if (type === 'contact') {
      const fullName = formData.get('fullName');
      const phone = formData.get('phone');
      const email = formData.get('email') as string;
      const address = formData.get('address');
      const message = formData.get('message');

      mailOptions = {
        from: senderIdentity, 
        to: process.env.RECEIVER_EMAIL, // هتروح لـ egyptcollections
        replyTo: email, // عشان لما تعمل Reply يرد على العميل
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
            <small style="color: #888;">تم الإرسال عبر نموذج "تواصل معنا" - Egypt Collections</small>
          </div>
        `,
      };
    } 
    // ==========================================
    // الحالة الثالثة: تنبيه الوظائف (Job Alert)
    // ==========================================
    else if (type === 'job-alert') {
      const email = formData.get('email') as string;
      mailOptions = {
        from: senderIdentity,
        to: process.env.RECEIVER_EMAIL,
        subject: `🔔 اشتراك جديد في تنبيهات الوظائف: ${email}`,
        html: `
          <div style="font-family: Arial; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #2563EB;">اشتراك جديد في تنبيهات الوظائف</h2>
            <p><strong>البريد:</strong> ${email}</p>
            <small style="color: #888;">تم الاشتراك عبر موقع Egypt Collections</small>
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
        from: senderIdentity,
        to: process.env.RECEIVER_EMAIL, // هتروح لـ egyptcollections
        replyTo: process.env.SMTP_EMAIL, 
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
            <p>تم الإرسال من خلال موقع Egypt Collections</p>
          </div>
        `,
        attachments: []
      };

      // معالجة ملف الـ CV
      if (cvFile && cvFile.size > 0) {
        const buffer = Buffer.from(await cvFile.arrayBuffer());
        mailOptions.attachments.push({
          filename: cvFile.name,
          content: buffer,
        });
      }
    }

    // إرسال الرسالة
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}