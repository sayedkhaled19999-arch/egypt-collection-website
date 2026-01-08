import { Metadata } from 'next';
import AboutClient from './AboutClient';

const SITE_URL = 'https://egyptcollections.com';

export const metadata: Metadata = {
  // ✅ التعديل هنا: غيرناها لـ "من نحن"
  // النتيجة هتظهر: "من نحن | الشركة المصرية للتحصيلات ECC"
  // كده شكلها احترافي جداً ومفيش تكرار لكلمة "شركة"
  title: 'من نحن', 
  
  description: 'تعرف على ECC (المصرية للتحصيلات)، الشريك الأول لكبرى البنوك في مصر منذ 2001. فريق عمل محترف بقيادة المستشار وائل سويلم وتغطية شاملة لجميع المحافظات.',
  
  alternates: {
    canonical: '/about',
  },

  openGraph: {
    // هنا ممكن نكتب عنوان مخصص وجذاب للسوشيال ميديا
    title: 'من نحن؟ قصة نجاح ECC منذ 2001',
    description: 'أكثر من 20 عاماً من التميز في مجال التحصيل والاستعلام الميداني في السوق المصري.',
    url: '/about',
    siteName: 'الشركة المصرية للتحصيلات ECC',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'الشركة المصرية للتحصيلات ECC',
      },
    ],
  },
  
  // تويتر هياخد البيانات من OpenGraph أو الـ Layout لو محددناش، بس زيادة تأكيد:
  twitter: {
    card: 'summary_large_image',
    title: 'من نحن | المصرية للتحصيلات ECC',
    description: 'تعرف على تاريخ ECC وخبرتها في التحصيل والاستعلام الميداني منذ 2001.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/about/#webpage`,
        'url': `${SITE_URL}/about`,
        'name': 'من نحن | المصرية للتحصيلات ECC', // هنا اسم الصفحة عادي
        'isPartOf': {
          '@id': `${SITE_URL}/#website`
        },
        'about': {
          '@id': `${SITE_URL}/#organization`
        },
        'breadcrumb': {
          '@id': `${SITE_URL}/about/#breadcrumb`
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/about/#breadcrumb`,
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
            'name': 'من نحن',
            'item': `${SITE_URL}/about`
          }
        ]
      },
      {
        '@type': 'FinancialService', 
        '@id': `${SITE_URL}/#organization`,
        
        // ✅ هنا لازم يفضل الاسم الرسمي للشركة (متغيروش أبداً)
        // جوجل بيربط البيانات دي ببعض عشان يعرف إن دي شركتك
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
        'founder': {
          '@type': 'Person',
          'name': 'المستشار/ وائل سويلم',
          'jobTitle': 'CEO & Founder',
          'description': 'خبير الائتمان والتحصيل المصرفي والمستشار القانوني للمجموعة.'
        },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}