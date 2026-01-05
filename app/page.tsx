import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

// 1. تظبيطات الـ SEO للصفحة الرئيسية
export const metadata: Metadata = {
  title: {
    // تم البدء بـ ECC Collections لضمان التميز في نتائج البحث
    absolute: 'ECC Collections | المصرية للتحصيلات - خدمات التحصيل والاستعلام'
  },
  description: 'ECC Collections (المصرية للتحصيلات) الخيار الأول للبنوك والشركات في مصر منذ 2001 لخدمات التحصيل الميداني، الاستعلام الائتماني، وتحديث البيانات.',
  keywords: [
    'ECC Collections', 'المصرية للتحصيلات', 'تحصيل ميداني', 'شركة تحصيل ديون', 
    'الشركة المصرية للتحصيلات', 'استعلام بنكي', 'استعلام ميداني', 'استرداد مديونيات', 
    'تحصيل محافظ بنكية', 'مناديب تحصيل', 'تحديث بيانات العملاء', 'شركات الاوت سورس في مصر'
  ],
  alternates: {
    canonical: 'https://egyptcollections.com',
  },
  openGraph: {
    title: 'ECC Collections | المصرية للتحصيلات - حلول التحصيل المتكاملة',
    description: 'شريكك الاستراتيجي منذ 2001 في التحصيل الميداني والاستعلام. نغطي كافة محافظات مصر بخبرة تتجاوز 20 عاماً.',
    url: 'https://egyptcollections.com',
    siteName: 'ECC Collections - المصرية للتحصيلات',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: 'https://egyptcollections.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ECC Collections - المصرية للتحصيلات',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECC Collections | المصرية للتحصيلات',
    description: 'خدمات التحصيل الميداني والتحقق من البيانات بأعلى معايير الجودة في مصر منذ 2001.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  // 2. كود السكيما (Schema) - تم توحيد الاسم هنا لتغيير Site Name في جوجل
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://egyptcollections.com/#website',
        'url': 'https://egyptcollections.com',
        'name': 'ECC Collections - المصرية للتحصيلات', 
        'alternateName': ['ECC Collections', 'المصرية للتحصيلات'],
        'description': 'ECC Collections (المصرية للتحصيلات) رائدة خدمات التحصيل الميداني في مصر منذ 2001',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://egyptcollections.com/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://egyptcollections.com/#organization',
        'name': 'ECC Collections - المصرية للتحصيلات', 
        'alternateName': 'Egyptian Collections Co.',
        'url': 'https://egyptcollections.com',
        'logo': 'https://egyptcollections.com/icon.png',
        'image': 'https://egyptcollections.com/og-image.png',
        'foundingDate': '2001', 
        'description': 'شركة رائدة ومستقلة في مجال التحصيل الميداني والاستعلام الائتماني في مصر منذ عام 2001.',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '30 شارع هارون، ميدان المساحة',
          'addressLocality': 'Dokki',
          'addressRegion': 'Giza',
          'postalCode': '12611',
          'addressCountry': 'EG'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '30.0385', 
          'longitude': '31.2185'
        },
        'telephone': '+201110600280',
        'priceRange': '$$', 
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            'opens': '09:00',
            'closes': '17:00'
          }
        ],
        'sameAs': [
          'https://www.facebook.com/EgyptCollectionsCo',
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'خدمات التحصيل والاستعلام',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'التحصيل الميداني (Field Collection)'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'الاستعلام الائتماني (Credit Investigation)'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'التحقق من البيانات (Data Verification)'
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}