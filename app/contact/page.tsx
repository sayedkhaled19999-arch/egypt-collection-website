import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: {
    // الترتيب الموحد: تواصل معنا | البراند
    absolute: 'تواصل معنا | المصرية للتحصيلات - ECC Collections',
  },
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
    // الاسم الموحد
    siteName: 'المصرية للتحصيلات ECC',
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
    title: 'تواصل معنا | المصرية للتحصيلات - ECC Collections',
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
    '@context': 'https://schema.org',
    '@graph': [
      // 1. تعريف الصفحة (ContactPage)
      {
        '@type': 'ContactPage',
        '@id': 'https://egyptcollections.com/contact/#webpage',
        'url': 'https://egyptcollections.com/contact',
        'name': 'تواصل معنا | المصرية للتحصيلات - ECC Collections',
        'isPartOf': {
          '@id': 'https://egyptcollections.com/#website'
        },
        'about': {
          '@id': 'https://egyptcollections.com/#organization'
        },
        'breadcrumb': {
          '@id': 'https://egyptcollections.com/contact/#breadcrumb'
        }
      },
      // 2. فتات الخبز (Breadcrumbs)
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://egyptcollections.com/contact/#breadcrumb',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'الرئيسية',
            'item': 'https://egyptcollections.com/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'تواصل معنا',
            'item': 'https://egyptcollections.com/contact'
          }
        ]
      },
      // 3. بيانات الشركة (Local Business)
      {
        '@type': 'FinancialService',
        '@id': 'https://egyptcollections.com/#organization',
        'name': 'المصرية للتحصيلات ECC',
        'url': 'https://egyptcollections.com/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://egyptcollections.com/icon.png',
          'width': 512,
          'height': 512
        },
        'image': 'https://egyptcollections.com/og-image.png',
        'priceRange': '$$',
        
        // بيانات الاتصال الأساسية
        'telephone': '+201110600280',
        'email': 'info@egyptcollections.com', // صلحنا الحرف الأول خليناه small
        'hasMap': 'https://maps.app.goo.gl/CcmDDN7XqEvbE5Rj6', // ممتاز جداً وجود اللينك ده
        
        'description': 'الشركة المصرية للتحصيلات (ECC) هي الرائدة في خدمات التحصيل الميداني والاستعلام الائتماني في مصر منذ عام 2001.',
        
        'address': {
          '@type': 'PostalAddress',
          // وحدنا العنوان بالعربي عشان يبقى مطابق للصفحات التانية
          'streetAddress': '30 شارع هارون، ميدان المساحة',
          'addressLocality': 'الدقي',
          'addressRegion': 'الجيزة',
          'postalCode': '12611',
          'addressCountry': 'EG'
        },
        
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
              "Saturday",
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday"
            ],
            'opens': '08:30',
            'closes': '18:30'
          }
        ],
        
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+201110600280',
          'contactType': 'customer service',
          'areaServed': 'EG',
          'availableLanguage': ['Arabic', 'English']
        },
        
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 30.0385, // استخدمنا نفس الاحداثيات الموحدة
          'longitude': 31.2185
        },
        
        'sameAs': [
          'https://www.facebook.com/EgyptCollectionsCo'
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactClient />
    </>
  );
}