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
      absolute: dict.contactPage.hero_title + ' | ' + (isAr ? 'الشركة المصرية للتحصيلات ECC' : 'ECC'),
    },
    description: isAr 
      ? 'تواصل مع الشركة المصرية للتحصيلات ECC. العنوان: 30 شارع هارون، ميدان المساحة، الدقي. هاتف: 01110600280.'
      : 'Contact Egyptian Collections CO. (ECC). Address: 30 Haroun St, El Mesaha Sq, Dokki, Giza. Phone: +201110600280.',
    keywords: isAr
      ? ['تواصل معنا', 'عنوان ECC', 'رقم تليفون ECC', 'خدمة عملاء المصرية للتحصيلات', 'مقر الشركة بالدقي']
      : ['Contact ECC', 'ECC Address', 'ECC Phone Number', 'Debt Collection Contact', 'ECC Dokki Location'],
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/contact`,
      languages: {
        'ar-EG': `${SITE_URL}/ar/contact`,
        'en-US': `${SITE_URL}/en/contact`,
      },
    },
    openGraph: {
      title: dict.contactPage.hero_title,
      description: dict.contactPage.hero_desc,
      url: `${SITE_URL}/${params.lang}/contact`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ECC Contact' }],
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
        '@id': `${SITE_URL}/#organization`,
        'name': orgName,
        'url': `${SITE_URL}/${params.lang}`,
        'telephone': '+201110600280',
        'email': 'info@egyptcollections.com',
        'logo': `${SITE_URL}/icon.png`,
        
        // --- التعديلات هنا لحل مشاكل التحذيرات ---
        'image': `${SITE_URL}/og-image.png`, // جوجل بيحتاج صورة تعبيرية للمكان (استخدمنا صورة الـ OG مؤقتاً)
        'priceRange': '$$', // بتعرف جوجل إن الأسعار متوسطة (مطلب أساسي للشركات الخدمية)
        // ----------------------------------------

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
        'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+201110600280',
            'contactType': 'customer service',
            'availableLanguage': ['Arabic', 'English']
        }
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