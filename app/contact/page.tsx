import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'تواصل معنا | المصرية للتحصيلات – ECC Collections',
  description: 'تواصل مع خدمة عملاء المصرية للتحصيلات ECC. رقم الهاتف: 01110600280، البريد الإلكتروني: Info@collection.eg. مقر الشركة: الدقي، الجيزة.',
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
    url: 'https://www.collection.eg/contact',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "المصرية للتحصيلات – ECC Collections",
      "url": "https://www.collection.eg",
      "logo": "https://www.collection.eg/favicon.ico",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+201110600280",
        "contactType": "customer service",
        "email": "Info@collection.eg",
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