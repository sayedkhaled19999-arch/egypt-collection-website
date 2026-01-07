import { Metadata } from "next";
import JobClient from "./JobClient";

// ===== بيانات الوظائف =====
// نصيحة: لو تقدر في المستقبل تجيب البيانات دي من داتابيز يكون أفضل، بس حالياً كده تمام
const jobs = [
  { 
    id: "office-collector", 
    title: "محصل مكتبي", 
    description: "فرصة عمل كمحصل مكتبي بمرتب ثابت وعمولات مجزية. شغل إداري داخل الشركة بدون أي مجهود ميداني. مطلوب مهارات تواصل قوية والالتزام بالمواعيد.",
    keywords: [
      "محصل مكتبي", "تحصيل هاتفي", "كول سنتر", "خدمة عملاء",
      "وظائف شركات", "وظائف إدارية", "شغل مكتب", "وظائف تحصيل",
      "وظائف القاهرة", "وظائف الدقي"
    ],
    salary: "مرتب ثابت + عمولة"
  },
  { 
    id: "field-collector", 
    title: "محصل ميداني", 
    description: "مطلوب محصلين ميدانيين للعمل داخل مناطق محددة. عمولات مجزية وفرص دخل ممتاز. يشترط الجدية وحسن المظهر.",
    keywords: [
      "محصل ميداني", "تحصيل ديون", "تحصيل خارجي", "وظائف مبيعات",
      "وظائف شركات تحصيل", "شغل ميداني", "وظائف في مصر"
    ],
    salary: "أساسي + عمولات"
  },
  { 
    id: "field-investigator", 
    title: "مستعلم ميداني", 
    description: "وظيفة مستعلم ميداني للتحقق من البيانات ميدانياً داخل مناطق محددة. مطلوب دقة في الملاحظة وأمانة في النقل.",
    keywords: [
      "مستعلم ميداني", "استعلام بنكي", "تحقق ميداني",
      "وظائف استعلام", "وظائف شركات", "شغل ميداني"
    ],
    salary: "راتب مجزي + بدلات"
  },
  { 
    id: "data-entry", 
    title: "مدخل بيانات (Data Entry)", 
    description: "مطلوب مدخلي بيانات سرعة ودقة. شغل إداري داخل مقر الشركة بمواعيد منتظمة. يشترط إجادة التعامل مع الكمبيوتر.",
    keywords: [
      "مدخل بيانات", "Data Entry", "شغل إداري", "وظائف مكتبية",
      "وظائف كمبيوتر", "Excel", "Word"
    ],
    salary: "راتب ثابت"
  }
];

type Props = { params: { id: string } };

const SITE_URL = "https://egyptcollections.com";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

// ===== 1. ميتا تاجز =====
export const generateMetadata = ({ params }: Props): Metadata => {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    return {
      title: "الوظيفة غير متاحة | المصرية للتحصيلات - ECC Collections",
      description: "الوظيفة المطلوبة غير متاحة حالياً.",
      metadataBase: new URL(SITE_URL),
      alternates: { canonical: `${SITE_URL}/jobs` }
    };
  }

  const canonicalUrl = `${SITE_URL}/jobs/${job.id}`;

  return {
    metadataBase: new URL(SITE_URL),
    // الترتيب الموحد: اسم الوظيفة | البراند
    title: `مطلوب للتعيين: ${job.title} | المصرية للتحصيلات - ECC Collections`,
    description: job.description,
    keywords: [
      "وظائف خالية", "وظائف اليوم", "وظائف شركات",
      "ECC Collections", "شركة تحصيل", "وظائف مصر",
      ...job.keywords
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `فرصة عمل: ${job.title}`,
      description: job.description,
      url: canonicalUrl,
      // الاسم الموحد
      siteName: 'المصرية للتحصيلات ECC',
      locale: "ar_EG",
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `وظيفة ${job.title} - ECC Collections` }]
    },
    twitter: {
      card: "summary_large_image",
      title: `فرصة عمل: ${job.title}`,
      description: job.description,
      images: [OG_IMAGE]
    },
    robots: { index: true, follow: true }
  };
};

// ===== 2. صفحة الوظيفة =====
export default function Page({ params }: Props) {
  const job = jobs.find((j) => j.id === params.id);
  if (!job) return null;

  // تواريخ النشر (مهمة لجوجل)
  const datePosted = new Date().toISOString().split('T')[0]; // تاريخ اليوم
  const validThrough = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]; // سارية لمدة سنة

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. هيكل الوظيفة (JobPosting)
      {
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
          // وحدنا الاسم هنا كمان
          "name": "المصرية للتحصيلات - ECC Collections", 
          "sameAs": SITE_URL, 
          "logo": OG_IMAGE 
        },
        // حددنا المكان بدقة عشان جوجل يثق في الوظيفة
        "jobLocation": { 
          "@type": "Place", 
          "address": { 
            "@type": "PostalAddress", 
            "streetAddress": "30 شارع هارون، ميدان المساحة", 
            "addressLocality": "Dokki", 
            "addressRegion": "Giza", 
            "postalCode": "12611", 
            "addressCountry": "EG" 
          } 
        }
        // ملحوظة: شلت baseSalary عشان منعملش Error في جوجل
        // طالما مفيش رقم محدد، الأفضل نسيبه فاضي ونكتبه في الوصف
      },
      // 2. فتات الخبز (Breadcrumbs) - عشان يظهر المسار للزائر
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/jobs/${job.id}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "الرئيسية",
            "item": SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "وظائف خالية",
            "item": `${SITE_URL}/jobs`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": job.title,
            "item": `${SITE_URL}/jobs/${job.id}`
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <JobClient id={params.id} />
    </>
  );
}