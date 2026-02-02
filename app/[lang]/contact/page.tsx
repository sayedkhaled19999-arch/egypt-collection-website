// --- START OF FILE app/[lang]/contact/page.tsx ---

import { Metadata } from 'next';
import ContactClient from './ContactClient';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';

  return {
    title: {
      absolute: isAr 
        ? 'تواصل معنا | عنوان وأرقام الشركة المصرية للتحصيلات ECC'
        : 'Contact Us | ECC Address & Phone Numbers',
    },
    description: isAr 
      ? 'تواصل فوراً مع الشركة المصرية للتحصيلات ECC. المقر الرئيسي: 30 شارع هارون، الدقي. هاتف: 01110600280. متاحون لخدمة البنوك والشركات.'
      : 'Get in touch with ECC. Head Office: 30 Haroun St, Dokki, Giza. Call: +201110600280. Professional debt collection services in Egypt.',
    keywords: isAr
      ? ['عنوان ECC', 'رقم تليفون المصرية للتحصيلات', 'خدمة عملاء ECC', 'مكان شركة التحصيل', 'الدقي', 'الجيزة']
      : ['ECC Address', 'ECC Phone', 'Contact Debt Collector', 'ECC Location', 'Dokki', 'Giza'],
    
    // --- الربط العالمي (Hreflang) ---
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/contact`,
      languages: {
        'ar': `${SITE_URL}/ar/contact`,
        'en': `${SITE_URL}/en/contact`,
        'x-default': `${SITE_URL}/contact`,
      },
    },

    openGraph: {
      title: dict.contactPage.hero_title,
      description: dict.contactPage.hero_desc,
      url: `${SITE_URL}/${params.lang}/contact`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact ECC' }],
    },
  };
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';
  const orgName = isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/${params.lang}/contact/#webpage`,
        'url': `${SITE_URL}/${params.lang}/contact`,
        'name': `${dict.contactPage.hero_title} | ${orgName}`,
        'inLanguage': isAr ? 'ar-EG' : 'en-US',
        'isPartOf': { '@id': `${SITE_URL}/#website` }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': dict.navbar.home, 'item': `${SITE_URL}/${params.lang}` },
          { '@type': 'ListItem', 'position': 2, 'name': dict.navbar.contact, 'item': `${SITE_URL}/${params.lang}/contact` }
        ]
      },
      {
        '@type': 'FinancialService',
        '@id': `${SITE_URL}/#organization`, // توحيد الـ ID مع باقي الصفحات
        'name': orgName,
        'url': `${SITE_URL}/${params.lang}`,
        'telephone': '+201110600280',
        'email': 'info@egyptcollections.com',
        'logo': `${SITE_URL}/icon.png`,
        'image': `${SITE_URL}/og-image.png`,
        'priceRange': '$$',
        'hasMap': 'https://maps.app.goo.gl/CcmDDN7XqEvbE5Rj6', // رابط الخريطة مهم جداً لصفحة التواصل

        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '30 Haroun St, El Mesaha Sq',
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
        // تفاصيل نقطة الاتصال عشان تظهر في جوجل بشكل مميز
        'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+201110600280',
            'contactType': 'customer service',
            'areaServed': 'EG',
            'availableLanguage': ['Arabic', 'English']
        },
        // مواعيد العمل (بتفرق جداً في Local SEO)
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            'opens': '09:00',
            'closes': '17:00'
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactClient lang={params.lang} dict={dict} />
    </>
  );
}