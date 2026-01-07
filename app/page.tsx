import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: {
    // ده العنوان اللي بيظهر في التاب وفي بحث جوجل للصفحة الرئيسية
    absolute: 'المصرية للتحصيلات - ECC Collections | الحل الأول للتحصيل والاستعلام'
  },
  description: 'المصرية للتحصيلات (ECC) اختيارك الأول من 2001. بنغطي مصر كلها بفريق محترف في التحصيل الميداني والاستعلام البنكي. رجع فلوسك وأنت مطمن.',
  alternates: {
    canonical: 'https://egyptcollections.com/'
  },
  // الكلمات المفتاحية هنا بتكمل اللي في الـ layout
  keywords: [
    'المصرية للتحصيلات', 'ECC Collections', 'تحصيل الديون في مصر', 
    'Debt Collection Agency Egypt', 'Credit Reporting', 'Data Verification Egypt'
  ]
};

export default function Home() {
  // الكود ده هو السحر اللي بيكلم جوجل عشان يفهم محتوى موقعك
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://egyptcollections.com/#website',
        'url': 'https://egyptcollections.com/',
        'name': 'المصرية للتحصيلات - ECC Collections',
        'alternateName': ['ECC Collections', 'المصرية للتحصيلات', 'Egyptian Collections Co.'],
        'description': 'الشركة الرائدة في خدمات التحصيل الميداني والاستعلام الائتماني في مصر',
        'publisher': {
          '@id': 'https://egyptcollections.com/#organization'
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://egyptcollections.com/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization', // غيرتها لـ Organization عشان تبقى أعم وأقوى للبراند
        '@id': 'https://egyptcollections.com/#organization',
        'name': 'المصرية للتحصيلات - ECC Collections',
        'url': 'https://egyptcollections.com/',
        // اللوجو هنا لازم يكون رابط صورة شغال ومربع وعالي الجودة
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://egyptcollections.com/icon.png',
          'width': 512,
          'height': 512
        },
        'image': 'https://egyptcollections.com/og-image.png',
        'foundingDate': '2001',
        'description': 'إحنا في المصرية للتحصيلات (ECC) بنقدم حلول متكاملة للبنوك والشركات لاسترداد المديونيات والاستعلام الميداني بخبرة أكثر من 20 سنة.',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '30 شارع هارون، ميدان المساحة',
          'addressLocality': 'الدقي',
          'addressRegion': 'الجيزة',
          'postalCode': '12611',
          'addressCountry': 'EG'
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
        // هنا حط لينكات السوشيال ميديا بتاعتكم عشان جوجل يربط كله ببعضه
        'sameAs': [
          'https://www.facebook.com/EgyptCollectionsCo',
          'https://www.linkedin.com/company/egypt-collections', // لو عندك لينكدان ضيفه
          'https://twitter.com/ECC_Collections' // لو عندك تويتر ضيفه
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'خدمات التحصيل',
          'itemListElement': [
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'التحصيل الميداني' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'الاستعلام الائتماني' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Data Verification' } }
          ]
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeContent />
    </>
  );
}