import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

// 1. تظبيطات الـ SEO للصفحة الرئيسية
export const metadata: Metadata = {
  title: {
    // تم تقصير العنوان هنا لحل مشكلة "Title too long" (52 حرف)
    absolute: 'المصرية للتحصيلات (ECC) | خدمات التحصيل والاستعلام'
  },
  description: 'المصرية للتحصيلات – ECC Collections الخيار الأول للبنوك والشركات في مصر لخدمات التحصيل الميداني، الاستعلام الائتماني، وتحديث البيانات. دقة، سرعة، والتزام بالقانون.',
  keywords: [
    'تحصيل ميداني', 'شركة تحصيل ديون', 'ECC Collections', 
    'الشركة المصرية للتحصيلات', 'استعلام بنكي', 'استعلام ميداني',
    'استرداد مديونيات', 'تحصيل محافظ بنكية', 'مناديب تحصيل', 
    'تحديث بيانات العملاء', 'شركات الاوت سورس في مصر',
    'تحصيل في القاهرة', 'خدمات بنكية مصر', 'الجيزة', 'الاسكندرية'
  ],
  alternates: {
    canonical: 'https://egyptcollections.com',
  },
  openGraph: {
    title: 'المصرية للتحصيلات – ECC Collections | حلول التحصيل المتكاملة',
    description: 'شريكك الاستراتيجي في التحصيل الميداني والاستعلام. نغطي كافة محافظات مصر بخبرة تتجاوز 20 عاماً.',
    url: 'https://egyptcollections.com',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'المصرية للتحصيلات – ECC Collections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المصرية للتحصيلات – ECC Collections',
    description: 'خدمات التحصيل الميداني والتحقق من البيانات بأعلى معايير الجودة في مصر.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  // 2. كود السكيما (Schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://egyptcollections.com/#website',
        'url': 'https://egyptcollections.com',
        'name': 'ECC Collections', 
        'alternateName': 'المصرية للتحصيلات',
        'description': 'المصرية للتحصيلات (ECC) رائدة خدمات التحصيل الميداني في مصر',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://egyptcollections.com/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://egyptcollections.com/#organization',
        'name': 'Egyptian Collections Co. (ECC)', 
        'alternateName': 'الشركة المصرية للتحصيلات',
        'url': 'https://egyptcollections.com',
        'logo': 'https://egyptcollections.com/icon.png',
        'image': 'https://egyptcollections.com/og-image.png',
        'description': 'شركة رائدة في مجال التحصيل الميداني والاستعلام الائتماني في جمهورية مصر العربية.',
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