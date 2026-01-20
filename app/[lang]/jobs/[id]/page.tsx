// --- START OF FILE app/[lang]/jobs/[id]/page.tsx ---

import { Metadata } from "next";
import JobClient from "./JobClient";
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

const SITE_URL = "https://egyptcollections.com";

// --- دوال مساعدة لضبط السكيما (السحر كله هنا) ---

// 1. دالة لاستخراج الرقم من وسط الكلام (عشان "تصل الي 8000" تبقا 8000 بس)
function extractSalaryNumber(salaryString: string): number | null {
  if (!salaryString) return null;
  // بناخد كل الأرقام اللي في النص
  const numbers = salaryString.match(/\d+/g);
  if (!numbers || numbers.length === 0) return null;
  
  // لو فيه رقمين (مثلاً 3000 - 5000) بناخد الكبير عشان الإغراء :D
  // لو رقم واحد (8000) بناخده هو
  return parseInt(numbers[numbers.length - 1]);
}

// 2. دالة لضبط التاريخ (لو مفيش تاريخ في الملف، بنحط تاريخ النهاردة)
function getValidDate(dateString?: string): string {
  if (dateString) return new Date(dateString).toISOString();
  // لو مفيش، رجع تاريخ النهاردة بصيغة ISO المطلوبة
  return new Date().toISOString().split('T')[0];
}

// ---------------------------------------------------

export async function generateMetadata({ params }: { params: { id: string, lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  // @ts-ignore
  const job = dict.jobsData[params.id];
  const isAr = params.lang === 'ar';

  if (!job) {
    return {
      title: isAr ? "الوظيفة غير متاحة" : "Job Not Found",
    };
  }

  return {
    title: {
      absolute: `${job.title} | ${isAr ? 'المصرية للتحصيلات ECC' : 'ECC Careers'}`,
    },
    description: job.desc.substring(0, 160),
    keywords: isAr 
       ? [job.title, 'وظائف', 'ECC', job.location, 'توظيف', 'راتب مجزي'] 
       : [job.title, 'Jobs', 'ECC', job.location, 'Hiring', 'High Salary'],
    alternates: { 
      canonical: `${SITE_URL}/${params.lang}/jobs/${params.id}` 
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

  // توليد Schema
  let jsonLd = null;
  
  if (job) {
    // هنا بنستخدم الدوال اللي عملناها فوق
    const salaryNumber = extractSalaryNumber(job.salary); 
    const postedDate = getValidDate(job.date); // بيفترض تاريخ اليوم لو مفيش date في الـ json

    jsonLd = {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": job.title,
      "description": `<p>${job.desc}</p><ul>${job.details.map((d: string) => `<li>${d}</li>`).join('')}</ul>`,
      "hiringOrganization": {
        "@type": "Organization",
        "name": orgName,
        "sameAs": SITE_URL,
        "logo": `${SITE_URL}/icon.png`
      },
      "datePosted": postedDate,
      "validThrough": "2026-12-31", // صلاحية الاعلان (سنتين قدام مثلاً)
      "employmentType": "FULL_TIME",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": job.location, // زي "Cairo" أو "Giza"
          "addressCountry": "EG"
        }
      },
      // الجزء الخاص بالراتب المعدل
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "EGP",
        "value": {
          "@type": "QuantitativeValue",
          "value": salaryNumber || 3000, // لو معرفش يطلع رقم بيحط حد أدنى 3000 عشان السكيما ما تضربش
          "unitText": "MONTH"
        }
      }
    };
  }
  
  // Breadcrumb Schema
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