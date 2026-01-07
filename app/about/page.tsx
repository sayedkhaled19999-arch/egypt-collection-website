import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: {
    // التعديل السحري: absolute
    // ده هيمنع التكرار ويخلي العنوان يظهر نظيف ومترتب: (اسم الصفحة | اسم الشركة)
    absolute: 'عن الشركة | المصرية للتحصيلات - ECC Collections'
  },
  description: 'تعرف على ECC Collections (المصرية للتحصيلات)، الشريك الأول لكبرى البنوك في مصر منذ 2001. فريق عمل محترف بقيادة المستشار وائل سويلم وتغطية شاملة لجميع المحافظات.',
  keywords: [
    'ECC Collections', 'المصرية للتحصيلات', 'من نحن', 'تاريخ المصرية للتحصيلات', 
    'ECC Collections Profile', 'سابقة أعمال', 'شركاء النجاح', 'المستشار وائل سويلم', 
    'فريق عمل ECC', 'إدارة مخاطر الائتمان', 'خدمات التعهيد البنكي', 'السرية والمصداقية',
    'تغطية جغرافية شاملة'
  ],
  alternates: {
    canonical: 'https://egyptcollections.com/about',
  },
  openGraph: {
    title: 'تاريخ من الخبرة منذ 2001 | المصرية للتحصيلات - ECC Collections',
    description: 'أكثر من 20 عاماً من التميز في مجال التحصيل والاستعلام الميداني في السوق المصري.',
    url: 'https://egyptcollections.com/about',
    siteName: 'المصرية للتحصيلات - ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: 'https://egyptcollections.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'المصرية للتحصيلات - ECC Collections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'عن الشركة | المصرية للتحصيلات - ECC Collections',
    description: 'تعرف على تاريخ ECC Collections وخبرتها في التحصيل والاستعلام الميداني منذ 2001.',
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
      {
        '@type': 'AboutPage',
        '@id': 'https://egyptcollections.com/about/#webpage',
        'url': 'https://egyptcollections.com/about',
        'name': 'عن الشركة | المصرية للتحصيلات - ECC Collections',
        'isPartOf': {
          '@id': 'https://egyptcollections.com/#website'
        },
        'about': {
          '@id': 'https://egyptcollections.com/#organization'
        },
        'breadcrumb': {
          '@id': 'https://egyptcollections.com/about/#breadcrumb'
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://egyptcollections.com/about/#breadcrumb',
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
            'name': 'عن الشركة',
            'item': 'https://egyptcollections.com/about'
          }
        ]
      },
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
        // التعديل هنا: ضفنا الصورة دي عشان التحذير يختفي ويبقى أخضر صريح
        'image': 'https://egyptcollections.com/og-image.png',
        
        'foundingDate': '2001',
        'priceRange': '$$',
        'telephone': '+201110600280',
        'description': 'الشركة المصرية للتحصيلات (ECC) هي الرائدة في خدمات التحصيل الميداني والاستعلام الائتماني في مصر منذ عام 2001. نقدم حلولاً متكاملة للبنوك والشركات لاسترداد الديون المتعثرة وتحديث البيانات.',
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