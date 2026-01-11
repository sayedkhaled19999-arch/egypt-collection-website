import { Metadata } from "next";
import JobClient from "./JobClient";

// ===== بيانات الوظائف المحسنة (تم دمج التفاصيل القوية هنا) =====
const jobs = [
  { 
    id: "office-collector", 
    title: "محصل مكتبي", 
    // الوصف القصير للميتا تاج
    description: "فرصة عمل محصل مكتبي (Indoor) بالدقي. راتب ثابت + عمولات. لا يشترط الخبرة، تدريب مدفوع. وظيفة إدارية مناسبة للجنسين.",
    // الوصف الطويل لـ Google Jobs Schema
    fullDescription: `
    <p>مطلوب محصل مكتبي للعمل بمقر الشركة بالدقي.</p>
    <ul>
      <li>متابعة العملاء هاتفياً (بدون نزول).</li>
      <li>تقديم حلول للعملاء للانتظام في السداد.</li>
      <li>تسجيل الملاحظات على السيستم.</li>
      <li>تدريب كامل مدفوع الأجر.</li>
    </ul>
    <p><strong>المميزات:</strong> راتب ثابت، تأمينات، حوافز شهرية.</p>
    `,
    keywords: ["محصل مكتبي", "Indoor Sales", "خدمة عملاء", "وظائف الدقي", "وظائف بدون خبرة", "ECC"],
    salary: { min: 4000, max: 7000 }
  },
  { 
    id: "field-collector", 
    title: "محصل ميداني", 
    description: "مطلوب محصلين ميدانيين (Outdoor) بجميع المحافظات. دخل ممتاز (أساسي + عمولة). تأمينات اجتماعية وفرص للترقي.",
    fullDescription: `
    <p>تعلن الشركة المصرية للتحصيلات عن حاجتها لمحصليين ميدانيين.</p>
    <ul>
      <li>زيارة العملاء في النطاق الجغرافي المحدد.</li>
      <li>التفاوض والوصول لحلول جدولة المديونية.</li>
      <li>تحقيق التارجت المطلوب شهرياً.</li>
    </ul>
    <p><strong>المميزات:</strong> بدل انتقالات، خط تليفون، عمولات غير محدودة.</p>
    `,
    keywords: ["محصل ميداني", "Outdoor", "تحصيل ديون", "مندوب تحصيل", "وظائف المحافظات"],
    salary: { min: 5000, max: 10000 }
  },
  { 
    id: "field-investigator", 
    title: "مستعلم ميداني", 
    description: "وظيفة مستعلم ميداني (بنوك وشركات) في القاهرة والجيزة. يتطلب دقة الملاحظة والأمانة. رواتب مجزية وبدلات انتقال.",
    fullDescription: `
    <p>مطلوب مستعلم ميداني للتحقق من بيانات العملاء.</p>
    <ul>
      <li>إجراء زيارات ميدانية للتأكد من عناوين العمل والسكن.</li>
      <li>كتابة تقارير دقيقة عن الزيارة.</li>
      <li>العمل في مناطق محددة (القاهرة والجيزة).</li>
    </ul>
    <p><strong>الشروط:</strong> حسن المظهر، مؤهل متوسط أو عالي.</p>
    `,
    keywords: ["مستعلم ميداني", "استعلام بنكي", "وظائف استعلامات", "Field Investigator"],
    salary: { min: 4500, max: 8000 }
  },
  { 
    id: "data-entry", 
    title: "مدخل بيانات", 
    description: "مطلوب مدخلين بيانات (Data Entry) شباب. سرعة في الكتابة وإجادة Excel. العمل من مقر الشركة، مواعيد ثابتة.",
    fullDescription: `
    <p>فرصة للإنضمام لفريق إدخال البيانات بشركة ECC.</p>
    <ul>
      <li>إدخال وتحديث بيانات العملاء على قاعدة البيانات.</li>
      <li>مراجعة البيانات للتأكد من صحتها.</li>
      <li>سرعة الكتابة على الكيبورد (عربي/إنجليزي).</li>
    </ul>
    <p><strong>المميزات:</strong> بيئة عمل مكيفة، راحة اسبوعية الجمعة، عقود سنوية.</p>
    `,
    keywords: ["مدخل بيانات", "Data Entry", "وظائف كمبيوتر", "Excel", "Word", "Typist"],
    salary: { min: 3500, max: 6000 }
  }
];

type Props = { params: { id: string } };
const SITE_URL = "https://egyptcollections.com";
const OG_IMAGE = "/og-image.png";

// ===== 1. الميتا تاجز (محسنة) =====
export const generateMetadata = ({ params }: Props): Metadata => {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) return { title: "الوظيفة غير متاحة" };

  return {
    title: {
      absolute: `${job.title} | وظائف خالية في المصرية للتحصيلات`
    },
    description: job.description, // الوصف هنا بقى مختلف ومميز لكل وظيفة
    keywords: job.keywords,
    alternates: { 
      canonical: `/jobs/${job.id}` 
    },
    openGraph: {
      title: `مطلوب للتعيين: ${job.title}`,
      description: job.description,
      url: `/jobs/${job.id}`,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: job.title }]
    }
  };
};

// ===== 2. صفحة الوظيفة (Server Component) =====
export default function Page({ params }: Props) {
  const job = jobs.find((j) => j.id === params.id);
  if (!job) return null;

  const datePosted = new Date().toISOString().split('T')[0];
  const validThrough = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];

  // Schema محسنة جداً عشان جوجل يفهرس الصفحة كـ وظيفة حقيقية
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JobPosting",
        "title": job.title,
        "description": job.fullDescription, // هنا السر: بنبعت وصف HTML كامل
        "identifier": { 
          "@type": "PropertyValue", 
          "name": "ECC", 
          "value": job.id 
        },
        "datePosted": datePosted,
        "validThrough": validThrough,
        "employmentType": "FULL_TIME",
        "hiringOrganization": { 
          "@type": "Organization", 
          "name": "المصرية للتحصيلات ECC", 
          "sameAs": SITE_URL, 
          "logo": `${SITE_URL}/icon.png`
        },
        "jobLocation": { 
          "@type": "Place", 
          "address": { 
            "@type": "PostalAddress", 
            "streetAddress": "30 شارع هارون، ميدان المساحة", 
            "addressLocality": "الدقي", 
            "addressRegion": "الجيزة", 
            "addressCountry": "EG" 
          } 
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "EGP",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": job.salary.min,
            "maxValue": job.salary.max,
            "unitText": "MONTH"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "الوظائف", "item": `${SITE_URL}/jobs` },
          { "@type": "ListItem", "position": 3, "name": job.title, "item": `${SITE_URL}/jobs/${job.id}` }
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