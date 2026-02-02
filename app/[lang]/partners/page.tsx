// --- START OF FILE app/[lang]/partners/page.tsx ---

import { Metadata } from 'next';
import PartnersClient from './PartnersClient';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';

  return {
    title: {
      absolute: dict.partnersPage.hero_title + ' | ' + (isAr ? 'عملاء الشركة المصرية للتحصيلات ECC' : 'ECC Clients & Partners'),
    },
    description: isAr 
       ? 'نفخر بخدمة كبرى البنوك والمؤسسات المالية في مصر. قائمة عملاء وشركاء الشركة المصرية للتحصيلات (ECC) تضم أسماء رائدة في القطاع المصرفي.'
       : 'Trusted by major banks and financial institutions. ECC Partners and Clients list includes leading names in the Egyptian banking sector.',
    keywords: isAr
       ? ['عملاء ECC', 'شركاء النجاح', 'بنوك مصر', 'البنك الأهلي المصري', 'بنك مصر', 'شركات التمويل العقاري', 'تحصيل بنكي']
       : ['ECC Clients', 'ECC Partners', 'Trusted by', 'NBE', 'Banque Misr', 'Financial Partners Egypt', 'Banking Collection'],
    
    // --- (World Class SEO) الربط العالمي ---
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/partners`,
      languages: {
        'ar': `${SITE_URL}/ar/partners`,
        'en': `${SITE_URL}/en/partners`,
        'x-default': `${SITE_URL}/partners`, // الرابط الذكي
      },
    },

    openGraph: {
      title: dict.partnersPage.hero_title,
      description: dict.partnersPage.hero_desc1,
      url: `${SITE_URL}/${params.lang}/partners`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ECC Partners' }],
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
        '@type': 'CollectionPage', // نوع الصفحة: تجميعة (قائمة شركاء)
        '@id': `${SITE_URL}/${params.lang}/partners/#webpage`,
        'url': `${SITE_URL}/${params.lang}/partners`,
        'name': `${dict.navbar.partners} | ${orgName}`,
        'description': isAr ? 'قائمة شركاء وعملاء الشركة.' : 'List of ECC partners and clients.',
        'isPartOf': { '@id': `${SITE_URL}/#website` },
        'about': { '@id': `${SITE_URL}/#organization` } // الصفحة دي بتتكلم عن مين؟ عن الشركة
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': dict.navbar.home, 'item': `${SITE_URL}/${params.lang}` },
          { '@type': 'ListItem', 'position': 2, 'name': dict.navbar.partners, 'item': `${SITE_URL}/${params.lang}/partners` }
        ]
      },
      {
        '@type': 'FinancialService',
        '@id': `${SITE_URL}/#organization`, // نفس الـ ID الموحد
        'name': orgName,
        'url': `${SITE_URL}/${params.lang}`,
        'logo': `${SITE_URL}/icon.png`,
        'image': `${SITE_URL}/og-image.png`,
        'telephone': '+201110600280',
        'priceRange': '$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '30 Haroun St, El Mesaha Sq',
          'addressLocality': 'Dokki',
          'addressRegion': 'Giza',
          'postalCode': '12611',
          'addressCountry': 'EG'
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PartnersClient lang={params.lang} dict={dict} />
    </>
  );
}