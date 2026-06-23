// --- START OF FILE app/[lang]/jobs/[id]/page.tsx ---

import { Metadata } from "next";
import JobClient from "./JobClient";
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

const SITE_URL = "https://egyptcollections.com";

// ✅ إضافة generateStaticParams عشان تولد الصفحات بشكل ثابت
export async function generateStaticParams() {
  const jobIds = ['office-collector', 'field-collector', 'field-investigator', 'data-entry'];
  const locales = ['ar', 'en'];
  
  return locales.flatMap(locale => 
    jobIds.map(id => ({ lang: locale, id }))
  );
}

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
      robots: { index: false }
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
    
    alternates: { 
      canonical: `${SITE_URL}/${params.lang}/jobs/${params.id}`,
      languages: {
        'ar': `${SITE_URL}/ar/jobs/${params.id}`,
        'en': `${SITE_URL}/en/jobs/${params.id}`,
        'x-default': `${SITE_URL}/ar/jobs/${params.id}`, 
      }
    },

    openGraph: {
      title: job.title,
      description: job.desc,
      url: `${SITE_URL}/${params.lang}/jobs/${params.id}`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'article',
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

  let jsonLd = null;
  
  if (job) {
    const salaryNumber = extractSalaryNumber(job.salary); 
    const postedDate = getValidDate(job.date);

    const salaryValue = salaryNumber 
      ? { 
          "@type": "QuantitativeValue", 
          "value": salaryNumber, 
          "unitText": "MONTH" 
        } 
      : { 
          "@type": "QuantitativeValue", 
          "minValue": 6000, 
          "maxValue": 10000, 
          "unitText": "MONTH" 
        };

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
      "validThrough": "2026-12-31",
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
        "value": salaryValue
      },
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

  const faqLd = job ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': isAr ? `ما هي مميزات وظيفة ${job.title} في ECC؟` : `What are the benefits of the ${job.title} job at ECC?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': isAr
            ? `وظيفة ${job.title} في الشركة المصرية للتحصيلات توفر: ${job.salary}، ${job.hours}، إجازة ${job.vacation}. بالإضافة لتدريب مستمر وتأمين اجتماعي وفرص ترقي حقيقية.`
            : `The ${job.title} position at ECC offers: ${job.salary}, ${job.hours}, ${job.vacation} off. Plus continuous training, social insurance, and real promotion opportunities.`
        }
      },
      {
        '@type': 'Question',
        'name': isAr ? `ما هي متطلبات وظيفة ${job.title}؟` : `What are the requirements for the ${job.title} job?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': isAr
            ? `متطلبات وظيفة ${job.title}: ${job.requirements.join('، ')}. لا يشترط خبرة سابقة - تدريب متاح.`
            : `Requirements for ${job.title}: ${job.requirements.join(', ')}. No previous experience required - training provided.`
        }
      },
      {
        '@type': 'Question',
        'name': isAr ? `كيف أتقدم لوظيفة ${job.title} في ECC؟` : `How do I apply for ${job.title} at ECC?`,
        'acceptedAnswer': {
          '@type': 'Answer',
        'text': isAr
            ? `يمكنك التقديم على وظيفة ${job.title} من خلال موقعنا الإلكتروني: اذهب إلى صفحة الوظائف، اختر الوظيفة، واضغط على قدم الآن. يمكنك أيضاً التواصل عبر واتساب 01110600280.`
            : `You can apply for ${job.title} through our website: go to the Jobs page, select the job, and click Apply Now. You can also contact us via WhatsApp at 01110600280.`
        }
      },
      {
        '@type': 'Question',
        'name': isAr ? `ما هو راتب ${job.title} في الشركة المصرية للتحصيلات؟` : `What is the salary for ${job.title} at ECC?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': isAr
            ? `راتب ${job.title} في ECC: ${job.salary}. بالإضافة إلى حوافز ومكافآت حسب الأداء الشهري.`
            : `The salary for ${job.title} at ECC: ${job.salary}. Plus performance-based incentives and bonuses.`
        }
      }
    ]
  } : null;

  return (
    <>
      {jsonLd && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      
      <JobClient id={params.id} lang={params.lang} dict={dict} />
    </>
  );
}