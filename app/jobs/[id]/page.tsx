import { Metadata } from "next";
import JobClient from "./JobClient";

// بيانات الوظائف (زي ما هي ماحذفناش حاجة عشان جوجل يفهم)
const jobs = [
  { 
    id: "office-collector", 
    title: "محصل مكتبي ", 
    description: "مطلوب موظفين تحصيل عبر الهاتف. شغلك من المكتب، تكييف، ومرتب ثابت. دورك تتفاوض مع العملاء بأسلوب محترم وتساعدهم يرجعوا للانتظام.",
    keywords: ["كول سنتر", "تلي سيلز", "خدمة عملاء", "تحصيل هاتفي", "وظائف مكتبية"],
    salary: "مرتب ثابت + عمولة"
  },
  { 
    id: "field-collector", 
    title: "وكيل تحصيل ميداني", 
    description: "وظيفة للرجالة اللي بتحب الحركة. هتنزل تقابل العملاء وتحل مشاكل المديونيات. مطلوب حسن مظهر ولباقة. العمولات في الوظيفة دي عالية جداً.",
    keywords: ["تحصيل خارجي", "مندوب بنك", "تحصيل ديون", "عمل ميداني", "رخصة قيادة"],
    salary: "أساسي + بدل انتقالات + عمولات مجزية"
  },
  { 
    id: "field-investigator", 
    title: "مستعلم ميداني", 
    description: "مطلوب شباب للاستعلام البنكي. دورك تنزل تتحقق من العناوين والبيانات بدقة. وظيفة محتاجة أمانة وسرعة في الحركة.",
    keywords: ["استعلام بنكي", "تحقق ميداني", "Investigator", "زيارات ميدانية"],
    salary: "راتب مجزي + بدلات"
  },
  { 
    id: "data-entry", 
    title: "مدخل بيانات (Data Entry)", 
    description: "مطلوب سرعة ودقة على الكمبيوتر. هتدخل بيانات العملاء على السيستم. مكانك في مقر الشركة بالدقي. مواعيد عمل منتظمة.",
    keywords: ["تايبست", "Excel", "Word", "سكرتارية", "أعمال إدارية"],
    salary: "راتب ثابت"
  }
];

type Props = {
  params: { id: string }
}

// 1. توليد الميتا داتا الديناميكية (عشان الشير على فيسبوك وجوجل يبقى شكله حلو)
export const generateMetadata = ({ params }: Props): Metadata => {
  const job = jobs.find((j) => j.id === params.id);
  
  if (!job) return { title: "الوظيفة غير متاحة | المصرية للتحصيلات" };

  return {
    title: `${job.title} | وظائف المصرية للتحصيلات (ECC) - قدم الآن`,
    description: `${job.description} - مقر الشركة: الدقي، الجيزة. ${job.salary}.`,
    keywords: [
      "وظائف خالية", "ECC Collections", "المصرية للتحصيلات",
      ...job.keywords // دمجنا الكلمات العامة مع كلمات الوظيفة الخاصة
    ],
    openGraph: {
      title: `فرصة عمل: ${job.title}`,
      description: job.description,
      url: `https://www.egyptcollections.com/jobs/${job.id}`,
      siteName: "ECC Collections",
      locale: "ar_EG",
      type: "website",
      images: [
        { 
            url: '/og-image.png', 
            width: 1200, 
            height: 630, 
            alt: job.title 
        }
      ]
    },
    alternates: { 
      canonical: `https://www.egyptcollections.com/jobs/${job.id}` 
    },
  };
};

// 2. صفحة الوظيفة (Server Component)
export default function Page({ params }: Props) {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) return null; // أو ممكن ترجع صفحة 404 مخصصة

  // 👇👇👇 الكود الذكي للتواريخ هنا 👇👇👇
  // 1. تاريخ النشر: ثابت 1-1-2026 زي ما طلبت
  const datePosted = "2026-01-01";
  
  // 2. تاريخ الانتهاء: بنحسب سنة كاملة قدام من تاريخ النهاردة أوتوماتيك
  // يعني لو حد فتح الموقع في 2026 هيشوفها صالحة لـ 2027 وهكذا
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1); 
  const validThrough = nextYear.toISOString().split('T')[0]; // بيطلع التاريخ بالشكل ده YYYY-MM-DD
  // 👆👆👆👆👆👆👆👆👆👆👆👆👆

  // 🔥 أهم حتة: كود Schema.org JobPosting
  // ده الكود اللي بيخلي الوظيفة تظهر في مربع "وظائف Google"
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "ECC Collections",
      "value": job.id
    },
    "datePosted": datePosted,     // التاريخ اللي انت حددته
    "validThrough": validThrough, // دايماً ساري لمدة سنة قدام
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Egyptian Collections Co. (ECC)",
      "sameAs": "https://www.egyptcollections.com",
      "logo": "https://www.egyptcollections.com/og-image.png"
    },
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
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "EGP",
      "value": {
        "@type": "QuantitativeValue",
        "unitText": "MONTH" // المرتب شهري
      }
    }
  };

  return (
    <>
      {/* حقن كود الوظيفة لجوجل عشان يظهر في البحث */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* عرض تفاصيل الوظيفة للمستخدم */}
      <JobClient id={params.id} />
    </>
  );
}