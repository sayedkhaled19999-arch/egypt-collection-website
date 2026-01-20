// --- START OF FILE app/[lang]/privacy/page.tsx ---

import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';

  return {
    title: {
      absolute: dict.privacyPage.hero_title + ' | ' + (isAr ? 'المصرية للتحصيلات ECC' : 'ECC'),
    },
    description: dict.privacyPage.hero_desc,
    keywords: isAr 
       ? ['سياسة الخصوصية', 'حماية البيانات', 'حقوق المستخدم', 'ECC Privacy']
       : ['Privacy Policy', 'Data Protection', 'GDPR', 'User Rights'],
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/privacy`,
      languages: {
        'ar-EG': `${SITE_URL}/ar/privacy`,
        'en-US': `${SITE_URL}/en/privacy`,
      },
    },
    openGraph: {
      title: dict.privacyPage.hero_title,
      description: dict.privacyPage.hero_desc,
      url: `${SITE_URL}/${params.lang}/privacy`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ECC Privacy Policy' }],
    },
  };
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const lastUpdated = new Date().toISOString().split('T')[0];
  const isAr = params.lang === 'ar';
  const orgName = isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/${params.lang}/privacy/#webpage`,
        'url': `${SITE_URL}/${params.lang}/privacy`,
        'name': dict.privacyPage.hero_title,
        'description': dict.privacyPage.hero_desc,
        'datePublished': "2024-01-01",
        'dateModified': lastUpdated,
        'isPartOf': { '@id': `${SITE_URL}/#website` },
        'inLanguage': isAr ? 'ar-EG' : 'en-US'
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': dict.navbar.home, 'item': `${SITE_URL}/${params.lang}` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Privacy', 'item': `${SITE_URL}/${params.lang}/privacy` }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PrivacyClient dict={dict} />
    </>
  );
}