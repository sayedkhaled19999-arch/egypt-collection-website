import { Metadata } from "next";
import JobClient from "./JobClient";

// بيانات الوظائف (مختصرة هنا لأغراض الـ SEO والشير)
const jobs = [
  { 
    id: "office-collector", 
    title: "محصل مكتبي", 
    description: "فرصة عمل كمحصل مكتبي بمرتب ثابت وعمولات. مقر الشركة في الدقي. سجل بياناتك دلوقتي.",
    keywords: ["كول سنتر", "تلي سيلز", "خدمة عملاء", "تحصيل هاتفي", "وظائف مكتبية"],
    salary: "مرتب ثابت + عمولة"
  },
  { 
    id: "field-collector", 
    title: "محصل ميداني", 
    description: "مطلوب محصلين ميدانيين بجميع المحافظات. بدلات انتقال وعمولات مجزية جداً.",
    keywords: ["تحصيل خارجي", "مندوب بنك", "تحصيل ديون", "عمل ميداني", "رخصة قيادة"],
    salary: "أساسي + بدل انتقالات + عمولات"
  },
  { 
    id: "field-investigator", 
    title: "مستعلم ميداني", 
    description: "وظيفة مستعلم ميداني للشباب. انزل تحقق من البيانات وحقق دخل ممتاز.",
    keywords: ["استعلام بنكي", "تحقق ميداني", "Investigator", "زيارات ميدانية"],
    salary: "راتب مجزي + بدلات"
  },
  { 
    id: "data-entry", 
    title: "مدخل بيانات (Data Entry)", 
    description: "مطلوب مدخلي بيانات سرعة ودقة. مواعيد عمل منتظمة ومقر إداري مريح.",
    keywords: ["تايبست", "Excel", "Word", "سكرتارية", "أعمال إدارية"],
    salary: "راتب ثابت"
  }
];

type Props = {
  params: { id: string }
}

// 1. تظبيط شكل الرابط (فيسبوك - واتساب - جوجل)
export const generateMetadata = ({ params }: Props): Metadata => {
  const job = jobs.find((j) => j.id === params.id);
  
  // لو الوظيفة مش موجودة
  if (!job) return { title: "الوظيفة غير متاحة | المصرية للتحصيلات" };

  const fullUrl = `https://egyptcollections.com/jobs/${job.id}`;
  
  // 👇 هنا التحكم الكامل في شكل الرابط 👇
  return {
    title: `مطلوب للتعيين: ${job.title} | ECC Collections`, // عنوان جذاب
    description: job.description, // الوصف المختصر اللي حددناه فوق
    keywords: ["وظائف خالية", "ECC Collections", ...job.keywords],
    
    // إعدادات الشير (Open Graph)
    openGraph: {
      title: `فرصة عمل: ${job.title}`, // العنوان اللي هيظهر في كارت الفيسبوك
      description: job.description,   // الوصف اللي تحته
      url: fullUrl,
      siteName: "ECC Collections",
      locale: "ar_EG",
      type: "website",
      images: [
        { 
            // تأكد إن الصورة دي موجودة في فولدر public
            url: 'https://egyptcollections.com/og-image.png', 
            width: 1200, 
            height: 630, 
            alt: job.title 
        }
      ]
    },
    // الرابط الأصلي لجوجل
    alternates: { 
      canonical: fullUrl 
    },
  };
};

// 2. مكون الصفحة الرئيسي
export default function Page({ params }: Props) {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) return null; 

  // تواريخ Schema
  const datePosted = "2026-01-01";
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1); 
  const validThrough = nextYear.toISOString().split('T')[0];

  // كود جوجل للوظائف (Structured Data)
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
        "unitText": "MONTH"
      }
    }
  };

  return (
    <>
      {/* حقن البيانات لجوجل فقط */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* استدعاء التصميم */}
      <JobClient id={params.id} />
    </>
  );
}