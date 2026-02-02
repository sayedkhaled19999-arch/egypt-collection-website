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
       ? 'اكتشف فرص العمل المتاحة في الشركة المصرية للتحصيلات. مطلوب محصلين، إداريين، ومدخلي بيانات في القاهرة والجيزة.'
       : 'Explore career opportunities at ECC. We are hiring Debt Collectors, Field Investigators, and Data Entry specialists in Egypt.',
    keywords: isAr
       ? ['وظائف ECC', 'شغل تحصيل', 'مطلوب محصلين', 'وظائف خالية 2026', 'توظيف فوري', 'المصرية للتحصيلات توظيف']
       : ['ECC Jobs', 'Debt Collector Jobs', 'Hiring Egypt', 'Careers at ECC', 'Field Investigation Jobs', 'Data Entry Jobs'],
    
    // --- (World Class SEO) الربط الصحيح للغات ---
    alternates: { 
      canonical: `${SITE_URL}/${params.lang}/jobs`,
      languages: {
        'ar': `${SITE_URL}/ar/jobs`,
        'en': `${SITE_URL}/en/jobs`,
        'x-default': `${SITE_URL}/jobs`, // الرابط الأساسي
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
        alt: 'ECC Career Opportunities'
      }]
    },
  };
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';
  const orgName = isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.';

  // تعريف الـ Breadcrumb
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': dict.navbar.home, 'item': `${SITE_URL}/${params.lang}` },
      { '@type': 'ListItem', 'position': 2, 'name': dict.navbar.jobs, 'item': `${SITE_URL}/${params.lang}/jobs` }
    ]
  };

  // تعريف الـ CollectionPage (مهم جداً لصفحات الليستنج)
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/${params.lang}/jobs/#webpage`,
    'url': `${SITE_URL}/${params.lang}/jobs`,
    'name': `${dict.navbar.jobs} | ${orgName}`,
    'description': isAr ? 'قائمة الوظائف الشاغرة لدى الشركة المصرية للتحصيلات.' : 'List of available job vacancies at ECC.',
    'isPartOf': { '@id': `${SITE_URL}/#website` },
    'about': { '@id': `${SITE_URL}/#organization` } // ربط الصفحة بالشركة
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      
      <JobsClient lang={params.lang} dict={dict} />
    </>
  );
}