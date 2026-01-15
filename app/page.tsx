import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

// تعريف رابط الموقع مرة واحدة
const SITE_URL = 'https://egyptcollections.com';

export const metadata: Metadata = {
  title: {
    // التعديل هنا: الاسم فقط، قصير ومميز واحترافي
    absolute: 'الشركة المصرية للتحصيلات ECC'
  },
  description:
    'الشركة المصرية للتحصيلات (ECC) اختيارك الأول من 2001. نقدم حلولاً متكاملة للبنوك والشركات لاسترداد الديون المتعثرة والاستعلام الميداني في جميع محافظات مصر.',
  alternates: {
    canonical: '/'
  },
  keywords: [
    'ECC',
    'استعلام بنكي',
    'استرداد مديونيات',
    'تحصيل ديون مصر',
    'شركات تحصيل'
  ]
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        'url': SITE_URL,
        'name': 'الشركة المصرية للتحصيلات ECC',
        'alternateName': [
          'ECC',
          'ECC Collections',
          'Egyptian Collections Company'
        ],
        'language': 'ar-EG'
      },
      {
        '@type': 'FinancialService',
        '@id': `${SITE_URL}/#organization`,
        'name': 'الشركة المصرية للتحصيلات ECC',
        'url': SITE_URL,
        'logo': {
          '@type': 'ImageObject',
          'url': `${SITE_URL}/icon.png`,
          'width': 512,
          'height': 512
        },
        'image': `${SITE_URL}/og-image.png`,
        'priceRange': '$$',
        'description':
          'الشركة المصرية للتحصيلات (ECC) هي الرائدة في خدمات التحصيل الميداني والاستعلام الائتماني في مصر منذ عام 2001. نقدم حلولاً متكاملة للبنوك والشركات لاسترداد الديون المتعثرة (Retail & Corporate)، تحديث البيانات، والتقصي الميداني.',
        'telephone': '+201110600280',
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
              'Saturday',
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday'
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
        'sameAs': ['https://www.facebook.com/egyptcollectionsco'],
        'areaServed': {
          '@type': 'Country',
          'name': 'Egypt'
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