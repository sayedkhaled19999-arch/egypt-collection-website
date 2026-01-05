import { Metadata } from "next";
import JobClient from "./JobClient";

// ===== بيانات الوظائف (للـ SEO + الشير) =====
const jobs = [
  { 
    id: "office-collector", 
    title: "محصل مكتبي", 
    description: "فرصة عمل كمحصل مكتبي بمرتب ثابت وعمولات مجزية. شغل إداري داخل الشركة بدون أي مجهود ميداني.",
    keywords: [
      "محصل مكتبي",
      "تحصيل هاتفي",
      "كول سنتر",
      "خدمة عملاء",
      "وظائف شركات",
      "وظائف إدارية",
      "شغل مكتب",
      "وظائف تحصيل",
      "وظائف القاهرة",
      "وظائف الدقي"
    ],
    salary: "مرتب ثابت + عمولة"
  },
  { 
    id: "field-collector", 
    title: "محصل ميداني", 
    description: "مطلوب محصلين ميدانيين للعمل داخل مناطق محددة. عمولات مجزية وفرص دخل ممتاز.",
    keywords: [
      "محصل ميداني",
      "تحصيل ديون",
      "تحصيل خارجي",
      "وظائف مبيعات",
      "وظائف شركات تحصيل",
      "شغل ميداني",
      "وظائف في مصر"
    ],
    salary: "أساسي + عمولات"
  },
  { 
    id: "field-investigator", 
    title: "مستعلم ميداني", 
    description: "وظيفة مستعلم ميداني للتحقق من البيانات ميدانياً داخل مناطق محددة.",
    keywords: [
      "مستعلم ميداني",
      "استعلام بنكي",
      "تحقق ميداني",
      "وظائف استعلام",
      "وظائف شركات",
      "شغل ميداني"
    ],
    salary: "راتب مجزي + بدلات"
  },
  { 
    id: "data-entry", 
    title: "مدخل بيانات (Data Entry)", 
    description: "مطلوب مدخلي بيانات سرعة ودقة. شغل إداري داخل مقر الشركة بمواعيد منتظمة.",
    keywords: [
      "مدخل بيانات",
      "Data Entry",
      "شغل إداري",
      "وظائف مكتبية",
      "وظائف كمبيوتر",
      "Excel",
      "Word"
    ],
    salary: "راتب ثابت"
  }
];

type Props = {
  params: { id: string }
};

// ===== 1. ميتا تاجز + شير فيسبوك وجوجل =====
export const generateMetadata = ({ params }: Props): Metadata => {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    return {
      title: "الوظيفة غير متاحة | ECC Collections",
      description: "الوظيفة المطلوبة غير متاحة حالياً."
    };
  }

  const fullUrl = `https://egyptcollections.com/jobs/${job.id}`;
  const ogImage = "https://egyptcollections.com/og-image.png"; // 👈 مهم جداً

  return {
    title: `مطلوب للتعيين: ${job.title} | ECC Collections`,
    description: job.description,
    keywords: [
      "وظائف خالية",
      "وظائف اليوم",
      "وظائف شركات",
      "ECC Collections",
      "شركة تحصيل",
      "وظائف مصر",
      ...job.keywords
    ],

    // ===== Open Graph (فيسبوك - واتساب - لينكدإن) =====
    openGraph: {
      title: `فرصة عمل: ${job.title}`,
      description: job.description,
      url: fullUrl,
      siteName: "ECC Collections",
      locale: "ar_EG",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `وظيفة ${job.title} - ECC Collections`
        }
      ]
    },

    // ===== Twitter (احتياطي) =====
    twitter: {
      card: "summary_large_image",
      title: `فرصة عمل: ${job.title}`,
      description: job.description,
      images: [ogImage]
    },

    // ===== Canonical =====
    alternates: {
      canonical: fullUrl
    }
  };
};

// ===== 2. صفحة الوظيفة =====
export default function Page({ params }: Props) {
  const job = jobs.find((j) => j.id === params.id);
  if (!job) return null;

  const datePosted = "2026-01-01";
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const validThrough = nextYear.toISOString().split("T")[0];

  // ===== Structured Data لجوجل وظائف =====
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "ECC Collections",
      "value": job.id
    },
    "datePosted": datePosted,
    "validThrough": validThrough,
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Egyptian Collections Co. (ECC)",
      "sameAs": "https://egyptcollections.com",
      "logo": "https://egyptcollections.com/og-image.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Giza",
        "addressCountry": "EG"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "EGP",
      "value": {
        "@type": "QuantitativeValue",
        "unitText": "MONTH"
      }
    }
  };

  return (
    <>
      {/* Schema لجوجل */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* UI */}
      <JobClient id={params.id} />
    </>
  );
}
