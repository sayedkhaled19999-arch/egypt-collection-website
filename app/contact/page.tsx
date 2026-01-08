import { Metadata } from 'next';
import ContactClient from './ContactClient';

const SITE_URL = 'https://egyptcollections.com';

export const metadata: Metadata = {
  // ✅ التعديل هنا: "تواصل معنا" بس
  // النتيجة هتظهر: "تواصل معنا | الشركة المصرية للتحصيلات ECC"
  title: 'تواصل معنا',
  
  description: 'عايز تتواصل مع المصرية للتحصيلات؟ كلمنا فوراً على 01110600280 أو زور مقرنا في الدقي. فريق خدمة العملاء جاهز للرد على استفسارات البنوك والشركات.',
  
  keywords: [
    'تواصل معنا', 'عنوان المصرية للتحصيلات', 'رقم تليفون ECC',
    'خدمة عملاء ECC', 'ايميل الشركة',
    'مقر الشركة بالدقي', 'شركة تحصيل في الجيزة', 'لوكيشن ECC',
    'هوت لاين التحصيل', 'خريطة العنوان'
  ],
  
  alternates: {
    canonical: '/contact', // ✅ اختصار
  },
  
  openGraph: {
    title: 'تواصل مع المصرية للتحصيلات | ECC',
    description: 'كلمنا دلوقتي لبدء شراكة ناجحة. نحن في انتظارك.',
    url: '/contact', // ✅ اختصار
    siteName: 'المصرية للتحصيلات ECC',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // ✅ اختصار
        width: 1200,
        height: 630,
        alt: 'اتصل بالمصرية للتحصيلات',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'تواصل معنا | الشركة المصرية للتحصيلات ECC',
    description: 'كلمنا فوراً أو زور مقرنا بالدقي. فريق خدمة العملاء جاهز للرد.',
    images: ['/og-image.png'],
  },
  
  // ❌ تم حذف robots لأنها موجودة في layout.tsx
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. تعريف الصفحة (ContactPage) - ده مهم جداً لصفحة الاتصال
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/contact/#webpage`,
        'url': `${SITE_URL}/contact`,
        'name': 'تواصل معنا | الشركة المصرية للتحصيلات ECC',
        'isPartOf': {
          '@id': `${SITE_URL}/#website`
        },
        'about': {
          '@id': `${SITE_URL}/#organization`
        },
        'breadcrumb': {
          '@id': `${SITE_URL}/contact/#breadcrumb`
        }
      },
      // 2. فتات الخبز
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/contact/#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'الرئيسية',
            'item': `${SITE_URL}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'تواصل معنا',
            'item': `${SITE_URL}/contact`
          }
        ]
      },
      // 3. بيانات الشركة (تم إصلاح الخطأ المطبعي وتوحيد البيانات)
      {
        '@type': 'FinancialService',
        '@id': `${SITE_URL}/#organization`,
        'name': 'الشركة المصرية للتحصيلات ECC', // الاسم الرسمي
        'url': `${SITE_URL}/`,
        'logo': {
          '@type': 'ImageObject',
          'url': `${SITE_URL}/icon.png`,
          'width': 512,
          'height': 512
        },
        'image': `${SITE_URL}/og-image.png`,
        'priceRange': '$$',
        
        'telephone': '+201110600280',
        'email': 'info@egyptcollections.com',
        'hasMap': 'https://maps.app.goo.gl/CcmDDN7XqEvbE5Rj6',
        
        // ✅ تم إصلاح التكرار: (كانت "الشركة الشركة")
        'description': 'الشركة المصرية للتحصيلات (ECC) هي الرائدة في خدمات التحصيل الميداني والاستعلام الائتماني في مصر منذ عام 2001.',
        
        'address': {
          '@type': 'PostalAddress',
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
              "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"
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
          'latitude': '30.0385',
          'longitude': '31.2185'
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