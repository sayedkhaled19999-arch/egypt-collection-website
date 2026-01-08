import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: {
    absolute: 'الشركة المصرية للتحصيلات ECC'
  },
  description:
    'الشركة المصرية للتحصيلات (ECC) اختيارك الأول من 2001. بنغطي مصر كلها بفريق محترف في التحصيل الميداني والاستعلام البنكي. رجع فلوسك وأنت مطمن.',
  alternates: {
    canonical: 'https://egyptcollections.com/'
  },
  keywords: [
    'المصرية للتحصيلات',
    'ECC',
    'تحصيل الديون في مصر',
    'Debt Collection Agency Egypt',
    'Credit Reporting',
    'Data Verification Egypt'
  ]
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://egyptcollections.com/#website',
        'url': 'https://egyptcollections.com/',

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
        '@id': 'https://egyptcollections.com/#organization',

        'name': 'الشركة المصرية للتحصيلات ECC',

        'url': 'https://egyptcollections.com/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://egyptcollections.com/icon.png',
          'width': 512,
          'height': 512
        },
        'image': 'https://egyptcollections.com/og-image.png',
        'priceRange': '$$',

        'description':
          'الشركة المصرية للتحصيلات (ECC) هي الرائدة في خدمات التحصيل الميداني والاستعلام الائتماني في مصر منذ عام 2001. نقدم حلولاً متكاملة للبنوك والشركات لاسترداد الديون المتعثرة (Retail & Corporate)، تحديث البيانات، والتقصي الميداني. نغطي جميع محافظات الجمهورية بفريق محترف يضمن أعلى معدلات التحصيل مع الحفاظ على سمعة عملائنا.',

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
        'sameAs': ['https://www.facebook.com/EgyptCollectionsCo'],
        'areaServed': {
          '@type': 'Country',
          'name': 'Egypt'
        }
      },

      // ✅ الإضافة الجديدة (Organization Logo Structured Data)
      {
        '@type': 'Organization',
        '@id': 'https://egyptcollections.com/#logo',
        'name': 'الشركة المصرية للتحصيلات ECC',
        'url': 'https://egyptcollections.com/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://egyptcollections.com/icon.png',
          'width': 512,
          'height': 512
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
