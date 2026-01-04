import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'تواصل معنا | المصرية للتحصيلات (ECC) - ارقامنا وعنوان المقر',
  description: 'عايز تتواصل مع المصرية للتحصيلات؟ كلمنا فوراً على 01110600280 أو زور مقرنا في الدقي. فريق خدمة العملاء جاهز للرد على استفسارات البنوك والشركات.',
  keywords: [
    'تواصل معنا', 'عنوان المصرية للتحصيلات', 'رقم تليفون ECC',
    'خدمة عملاء ECC', 'ايميل الشركة',
    'مقر الشركة بالدقي', 'شركة تحصيل في الجيزة', 'لوكيشن ECC',
    'هوت لاين التحصيل', 'خريطة العنوان'
  ],
  alternates: {
    canonical: 'https://egyptcollections.com/contact',
  },
  openGraph: {
    title: 'تواصل مع المصرية للتحصيلات | ECC Collections',
    description: 'كلمنا دلوقتي لبدء شراكة ناجحة. نحن في انتظارك.',
    url: 'https://egyptcollections.com/contact',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'اتصل بالمصرية للتحصيلات',
      },
    ],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService", // 👈 غيرتها لـ ProfessionalService عشان تظهر أسرع في الخدمات المحلية
    "mainEntity": {
      "@type": "Organization",
      "name": "المصرية للتحصيلات – ECC Collections",
      "url": "https://egyptcollections.com",
      "logo": "https://egyptcollections.com/og-image.png",
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
        "streetAddress": "30 شارع هارون، ميدان المساحة، الدقي",
        "addressLocality": "Dokki",
        "addressRegion": "Giza",
        "postalCode": "12611", // ده الرمز البريدي للدقي (أدق)
        "addressCountry": "EG"
      },
      // 👇 دي إحداثيات ميدان المساحة/شارع هارون بالظبط
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.0358", 
        "longitude": "31.2166" 
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "08:30",
          "closes": "18:30" // 👈 كده بقت 6:30 مساءً صح
        }
      ],
      "hasMap": "https://maps.app.goo.gl/CcmDDN7XqEvbE5Rj6"
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