// --- START OF FILE app/[lang]/page.tsx ---

import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';

  return {
    title: {
      absolute: isAr 
        ? 'الشركة المصرية للتحصيلات ECC' 
        : 'Egyptian Collections CO.',
    },
    description: isAr 
      ? 'الشركة المصرية للتحصيلات ECC تقدم حلولاً متكاملة في تحصيل الديون، الاستعلام الائتماني، والتحصيل الميداني للبنوك والشركات بأعلى معايير الجودة والامتثال القانوني.'
      : 'ECC provides top-tier debt collection, credit investigation, and field recovery services in Egypt. We serve major banks and corporations with full legal compliance.',
    keywords: isAr 
      ? ['تحصيل ديون', 'الشركة المصرية للتحصيلات', 'ECC', 'استعلام ائتماني', 'تحصيل ميداني', 'تسوية مديونيات', 'شركات تحصيل في مصر', 'حلول مالية'] 
      : ['Debt Collection Egypt', 'ECC', 'Credit Investigation', 'Field Collection', 'Debt Recovery Agency', 'Financial Services Egypt', 'Bad Debt Recovery'],
    alternates: {
      canonical: `${SITE_URL}/${params.lang}`,
      languages: {
        'ar-EG': `${SITE_URL}/ar`,
        'en-US': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      description: dict.metadata.description,
      url: `${SITE_URL}/${params.lang}`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ECC Logo' }],
    },
  };
}

// السكيما (Schema) - تم تحسينها لضبط اسم الموقع واللوجو
function generateJsonLd(lang: Locale) {
  const isAr = lang === 'ar';
  const orgName = isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.';
  const alternateName = isAr ? 'ECC Egypt' : 'ECC';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        'url': `${SITE_URL}/${lang}`,
        'name': orgName,
        'alternateName': alternateName,
        'inLanguage': isAr ? 'ar-EG' : 'en-US',
        'publisher': {
          '@id': `${SITE_URL}/#organization`
        }
      },
      {
        '@type': 'FinancialService',
        '@id': `${SITE_URL}/#organization`,
        'name': orgName,
        'legalName': 'Egyptian Collections Company',
        'alternateName': 'ECC',
        'url': SITE_URL,
        'logo': {
          '@type': 'ImageObject',
          'url': `${SITE_URL}/icon.png`,
          'width': 512,
          'height': 512,
          'caption': orgName
        },
        'image': {
            '@type': 'ImageObject',
            'url': `${SITE_URL}/og-image.png`,
            'width': 1200,
            'height': 630
        },
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '30 Haroun St, El Mesaha Sq',
          'addressLocality': 'Dokki',
          'addressRegion': 'Giza',
          'postalCode': '12611',
          'addressCountry': 'EG'
        },
        'hasMap': 'https://maps.app.goo.gl/CcmDDN7XqEvbE5Rj6',
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '30.0385',
          'longitude': '31.2185'
        },
        'telephone': '+201110600280',
        'email': 'info@egyptcollections.com',
        'priceRange': '$$',
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            'opens': '08:30',
            'closes': '18:30'
          }
        ],
        'sameAs': [
          'https://www.facebook.com/egyptcollectionsco',
        ],
        'founder': {
          '@type': 'Person',
          'name': 'Wael Swellam',
          'jobTitle': 'CEO & Founder',
          'url': `${SITE_URL}/${lang}/about`
        }
      }
    ]
  };
}

// المكون الرئيسي للصفحة
export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const jsonLd = generateJsonLd(params.lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent lang={params.lang} dict={dict} />
    </>
  );
}