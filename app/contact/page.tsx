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
        url: 'https://egyptcollections.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'اتصل بالمصرية للتحصيلات',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تواصل معنا | ECC Collections',
    description: 'كلمنا فوراً أو زور مقرنا بالدقي. فريق خدمة العملاء جاهز للرد.',
    images: ['https://egyptcollections.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://egyptcollections.com",
    "name": "المصرية للتحصيلات – ECC Collections",
    "image": "https://egyptcollections.com/og-image.png",
    "url": "https://egyptcollections.com/contact",
    "telephone": "+201110600280",
    "email": "Info@egyptcollections.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "30 شارع هارون، ميدان المساحة",
      "addressLocality": "Dokki",
      "addressRegion": "Giza",
      "postalCode": "12611",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.0358,
      "longitude": 31.2166
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"],
        "opens": "08:30",
        "closes": "18:30"
      }
    ],
    "hasMap": "https://maps.app.goo.gl/CcmDDN7XqEvbE5Rj6",
    "areaServed": {
      "@type": "Country",
      "name": "Egypt"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactClient />
    </>
  );
}
