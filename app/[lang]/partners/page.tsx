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
      absolute: dict.partnersPage.hero_title + ' | ' + (isAr ? 'الشركة المصرية للتحصيلات ECC' : 'ECC'),
    },
    description: isAr 
       ? 'قائمة شركاء وعملاء الشركة المصرية للتحصيلات ECC، تضم كبرى البنوك والمؤسسات المالية في مصر والشرق الأوسط.'
       : 'ECC Partners and Clients list, including major banks and financial institutions in Egypt and the Middle East.',
    keywords: isAr
       ? ['عملاء ECC', 'شركاء المصرية للتحصيلات', 'بنوك مصر', 'البنك الأهلي', 'بنك مصر', 'شركات تمويل']
       : ['ECC Clients', 'ECC Partners', 'Banks in Egypt', 'NBE', 'Banque Misr', 'Financial Partners'],
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/partners`,
      languages: {
        'ar-EG': `${SITE_URL}/ar/partners`,
        'en-US': `${SITE_URL}/en/partners`,
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
        '@type': 'WebPage',
        '@id': `${SITE_URL}/${params.lang}/partners/#webpage`,
        'url': `${SITE_URL}/${params.lang}/partners`,
        'name': `${dict.navbar.partners} | ${orgName}`,
        'isPartOf': { '@id': `${SITE_URL}/#website` }
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
        '@id': `${SITE_URL}/#organization`,
        'name': orgName,
        'logo': `${SITE_URL}/icon.png`
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