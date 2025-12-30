import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'تواصل معنا | المصرية للتحصيلات – ECC Collections',
  description: 'تواصل مع خدمة عملاء المصرية للتحصيلات ECC. رقم الهاتف: 01110600280، البريد الإلكتروني: Info@egyptcollections.com. مقر الشركة: الدقي، الجيزة.',
  keywords: [
    'تواصل معنا', 'رقم تليفون ECC', 'عنوان المصرية للتحصيلات', 
    'خدمة عملاء ECC', 'وظائف تحصيل', 'استعلام ميداني'
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'تواصل معنا | ECC Collections',
    description: 'نحن هنا لمساعدتك. تواصل معنا الآن.',
    // 👇 الرابط المؤقت عشان يشتغل معاك دلوقتي
    url: 'https://egyptcollections.com/contact',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    // 👇 إضافة الصورة الموحدة
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'تواصل معنا - المصرية للتحصيلات',
      },
    ],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "المصرية للتحصيلات – ECC Collections",
      "url": "https://www.egyptcollections.com", // سيب ده دومين الشركة الأصلي عشان جوجل يفهم إن ده الكيان الرسمي
      "logo": "https://egyptcollections.com/og-image.png", // ممكن تحدث ده لرابط الصورة الجديد
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+201110600280",
        "contactType": "customer service",
        "email": "Info@egyptcollections.com",
        "areaServed": "EG",
        "availableLanguage": ["Arabic", "English"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "الدقي",
        "addressLocality": "Giza",
        "addressRegion": "Giza",
        "postalCode": "12311",
        "addressCountry": "EG"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}