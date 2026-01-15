import { Metadata } from 'next';
import customersClient from './customersClient';

const SITE_URL = 'https://egyptcollections.com';

export const metadata: Metadata = {
  // ✅ التعديل التسويقي: "شركاء النجاح"
  // النتيجة: "شركاء النجاح | الشركة المصرية للتحصيلات ECC"
  title: 'شركاء النجاح',
  
  description: 'تفتخر ECC بسابقة أعمال قوية مع كبرى البنوك في مصر منذ 2001. نحن الوكيل المعتمد للبنك الأهلي، بنك مصر، وبنك القاهرة. ثقة تبنيها سنوات من الاحترافية.',
  
  keywords: [
    'ECC', 
    'شركاء النجاح', 
    'عملاء المصرية للتحصيلات', 
    'بنوك مصر', 
    'البنك الأهلي المصري', 
    'بنك مصر', 
    'بنك القاهرة',
    'شركات تحصيل ديون معتمدة',
    'سابقة أعمال ECC',
    'Debt Collection customers Egypt'
  ],
  
  alternates: { 
    // يفضل الروابط تكون حروف صغيرة (lowercase)
    canonical: '/customers' 
  },
  
  openGraph: {
    title: 'شركاء النجاح | سابقة أعمال نفخر بها',
    description: 'قائمة شركاء النجاح من أكبر البنوك والمؤسسات المالية التي تثق في خدماتنا الميدانية منذ 2001.',
    url: '/customers',
    siteName: 'المصرية للتحصيلات ECC',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'شركاء النجاح - المصرية للتحصيلات',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'شركاء النجاح | المصرية للتحصيلات ECC',
    description: 'تعرف على البنوك والمؤسسات التي تثق في خدماتنا الميدانية في مصر.',
    images: ['/og-image.png'],
  },
  
  // ❌ تم حذف robots لأنها موجودة في layout.tsx
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. تعريف الصفحة
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/customers/#webpage`,
        'url': `${SITE_URL}/customers`,
        'name': 'شركاء النجاح | الشركة المصرية للتحصيلات ECC',
        'isPartOf': {
          '@id': `${SITE_URL}/#website`
        },
        'about': {
          '@id': `${SITE_URL}/#organization`
        },
        'breadcrumb': {
          '@id': `${SITE_URL}/customers/#breadcrumb`
        }
      },
      // 2. فتات الخبز
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/customers/#breadcrumb`,
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
            'name': 'شركاء النجاح',
            'item': `${SITE_URL}/customers`
          }
        ]
      },
      // 3. بيانات الشركة (تم إصلاح الخطأ المطبعي)
      {
        '@type': 'FinancialService',
        '@id': `${SITE_URL}/#organization`,
        'name': 'الشركة المصرية للتحصيلات ECC',
        'url': `${SITE_URL}/`,
        'logo': {
          '@type': 'ImageObject',
          'url': `${SITE_URL}/icon.png`,
          'width': 512,
          'height': 512
        },
        'image': `${SITE_URL}/og-image.png`,
        'foundingDate': '2001',
        'priceRange': '$$',
        'telephone': '+201110600280',
        
        // ✅ تم إصلاح التكرار هنا
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
          'https://www.facebook.com/egyptcollectionsco'
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <customersClient />
    </>
  );
}