import { Metadata } from 'next';
import FaqClient from './FaqClient';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';

  return {
    title: {
      absolute: isAr
        ? 'الأسئلة الشائعة | الشركة المصرية للتحصيلات ECC'
        : 'FAQ | Egyptian Collections Co. ECC',
    },
    description: isAr
      ? 'إجابات لأكثر الأسئلة تكراراً عن خدمات التحصيل والاستعلام لدى الشركة المصرية للتحصيلات ECC. اعرف كل حاجة عن خدماتنا.'
      : 'Answers to frequently asked questions about collection and investigation services at Egyptian Collections Co. ECC.',
    keywords: isAr
      ? ['أسئلة شائعة ECC', 'الأسئلة الشائعة للتحصيل', 'استعلام ائتماني', 'تحصيل ديون', 'ECC FAQ']
      : ['ECC FAQ', 'Collection FAQ', 'Credit Investigation', 'Debt Collection FAQ', 'ECC Questions'],

    alternates: {
      canonical: `${SITE_URL}/${params.lang}/faq`,
      languages: {
        'ar': `${SITE_URL}/ar/faq`,
        'en': `${SITE_URL}/en/faq`,
        'x-default': `${SITE_URL}/ar/faq`,
      },
    },

    openGraph: {
      title: dict.faqPage.hero_title,
      description: dict.faqPage.hero_desc,
      url: `${SITE_URL}/${params.lang}/faq`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FAQ ECC' }],
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
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/${params.lang}/faq/#webpage`,
        'url': `${SITE_URL}/${params.lang}/faq`,
        'name': `${dict.faqPage.hero_title} | ${orgName}`,
        'inLanguage': isAr ? 'ar-EG' : 'en-US',
        'isPartOf': { '@id': `${SITE_URL}/#website` },
        'breadcrumb': { '@id': `${SITE_URL}/${params.lang}/faq/#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/${params.lang}/faq/#breadcrumb`,
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': dict.navbar.home, 'item': `${SITE_URL}/${params.lang}` },
          { '@type': 'ListItem', 'position': 2, 'name': dict.navbar.faq, 'item': `${SITE_URL}/${params.lang}/faq` },
        ],
      },
      {
        '@type': 'FinancialService',
        '@id': `${SITE_URL}/#organization`,
        'name': orgName,
        'url': `${SITE_URL}/${params.lang}`,
        'logo': `${SITE_URL}/icon.png`,
        'image': `${SITE_URL}/og-image.png`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqClient lang={params.lang} dict={dict} />
    </>
  );
}
