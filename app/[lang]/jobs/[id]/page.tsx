// --- START OF FILE app/[lang]/jobs/[id]/page.tsx ---

import { Metadata } from "next";
import JobClient from "./JobClient";
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

const SITE_URL = "https://egyptcollections.com";

// --- دوال مساعدة لضبط السكيما ---
function extractSalaryNumber(salaryString: string): number | null {
  if (!salaryString) return null;
  const numbers = salaryString.match(/\d+/g);
  if (!numbers || numbers.length === 0) return null;
  return parseInt(numbers[numbers.length - 1]);
}

function getValidDate(dateString?: string): string {
  if (dateString) return new Date(dateString).toISOString();
  return new Date().toISOString().split('T')[0];
}

export async function generateMetadata({ params }: { params: { id: string, lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  // @ts-ignore
  const job = dict.jobsData[params.id];
  const isAr = params.lang === 'ar';

  if (!job) {
    return {
      title: isAr ? "الوظيفة غير متاحة" : "Job Not Found",
      robots: { index: false } // منع أرشفة الصفحات الخطأ
    };
  }

  return {
    title: {
      absolute: `${job.title} | ${isAr ? 'وظائف ECC' : 'ECC Careers'}`,
    },
    description: job.desc.substring(0, 160),
    keywords: isAr 
       ? [job.title, 'وظائف خالية', 'ECC', job.location, 'توظيف', 'راتب مجزي', 'الشركة المصرية للتحصيلات'] 
       : [job.title, 'Jobs', 'ECC', job.location, 'Hiring Egypt', 'High Salary', 'Debt Collection Jobs'],
    
    // --- (World Class SEO) الربط الصحيح للغات ---
    alternates: { 
      canonical: `${SITE_URL}/${params.lang}/jobs/${params.id}`,
      languages: {
        'ar': `${SITE_URL}/ar/jobs/${params.id}`,
        'en': `${SITE_URL}/en/jobs/${params.id}`,
        'x-default': `${SITE_URL}/jobs/${params.id}`, // ده الرابط الذكي للزوار الجدد
      }
    },

    openGraph: {
      title: job.title,
      description: job.desc,
      url: `${SITE_URL}/${params.lang}/jobs/${params.id}`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'article', // جوجل بيفضل ده لصفحات المحتوى المحدد
      images: [{ 
        url: '/og-image.png', 
        width: 1200, 
        height: 630, 
        alt: job.title 
      }]
    },
  };
};

export default async function Page({ params }: { params: { id: string, lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  // @ts-ignore
  const job = dict.jobsData[params.id];
  const isAr = params.lang === 'ar';
  const orgName = isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.';

  // توليد Schema احترافية (Google for Jobs Compliant)
  let jsonLd = null;
  
  if (job) {
    const salaryNumber = extractSalaryNumber(job.salary); 
    const postedDate = getValidDate(job.date);

    jsonLd = {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": job.title,
      "description": `<p>${job.desc}</p><ul>${job.details.map((d: string) => `<li>${d}</li>`).join('')}</ul>`,
      "identifier": {
        "@type": "PropertyValue",
        "name": "ECC",
        "value": params.id
      },
      "hiringOrganization": {
        "@type": "Organization",
        "name": orgName,
        "sameAs": SITE_URL,
        "logo": `${SITE_URL}/icon.png`
      },
      "datePosted": postedDate,
      "validThrough": "2026-12-31", // تاريخ انتهاء الصلاحية
      "employmentType": "FULL_TIME",
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "EG"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "30 Haroun St, El Mesaha Sq",
          "addressLocality": "Dokki",
          "addressRegion": "Giza",
          "postalCode": "12611",
          "addressCountry": "EG"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "EGP",
        "value": {
          "@type": "QuantitativeValue",
          "value": salaryNumber || 4000,
          "unitText": "MONTH"
        }
      },
      // إضافة زر "تقديم" مباشر (Direct Apply)
      "directApply": true
    };
  }
  
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': dict.navbar.home, 'item': `${SITE_URL}/${params.lang}` },
      { '@type': 'ListItem', 'position': 2, 'name': dict.navbar.jobs, 'item': `${SITE_URL}/${params.lang}/jobs` },
      { '@type': 'ListItem', 'position': 3, 'name': job?.title || 'Job', 'item': `${SITE_URL}/${params.lang}/jobs/${params.id}` }
    ]
  };

  return (
    <>
      {jsonLd && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      <JobClient id={params.id} lang={params.lang} dict={dict} />
    </>
  );
}