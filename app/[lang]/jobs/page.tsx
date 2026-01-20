// --- START OF FILE app/[lang]/jobs/page.tsx ---

import { Metadata } from "next";
import JobsClient from "./JobsClient";
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';
  
  return {
    title: {
      absolute: dict.jobsPage.hero_title + ' | ' + (isAr ? 'وظائف المصرية للتحصيلات ECC' : 'ECC Careers'),
    },
    description: isAr 
       ? 'انضم لفريق عمل الشركة المصرية للتحصيلات. وظائف خالية للمحصلين، المحققين، ومدخلي البيانات بمرتبات مجزية.'
       : 'Join ECC Team. Job vacancies for Debt Collectors, Field Investigators, and Data Entry with competitive salaries.',
    keywords: isAr
       ? ['وظائف ECC', 'شغل تحصيل', 'مطلوب محصلين', 'وظائف خالية', 'توظيف', 'المصرية للتحصيلات توظيف']
       : ['ECC Jobs', 'Debt Collector Jobs', 'Hiring Egypt', 'Careers at ECC', 'Field Investigation Jobs'],
    alternates: { 
      canonical: `${SITE_URL}/${params.lang}/jobs`,
      languages: {
        'ar-EG': `${SITE_URL}/ar/jobs`,
        'en-US': `${SITE_URL}/en/jobs`,
      }
    },
    openGraph: {
      title: dict.jobsPage.hero_title,
      description: dict.jobsPage.hero_subtitle,
      url: `${SITE_URL}/${params.lang}/jobs`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ECC Jobs'
      }]
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
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/${params.lang}/jobs/#webpage`,
        'url': `${SITE_URL}/${params.lang}/jobs`,
        'name': `${dict.navbar.jobs} | ${orgName}`,
        'isPartOf': { '@id': `${SITE_URL}/#website` }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': dict.navbar.home, 'item': `${SITE_URL}/${params.lang}` },
          { '@type': 'ListItem', 'position': 2, 'name': dict.navbar.jobs, 'item': `${SITE_URL}/${params.lang}/jobs` }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <JobsClient lang={params.lang} dict={dict} />
    </>
  );
}