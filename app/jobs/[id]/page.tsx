import { Metadata } from "next";
import JobClient from "./JobClient"; // استدعينا الملف التفاعلي

// لازم نعرف البيانات هنا تاني عشان السيرفر يعرف يقرأ الـ Title لكل صفحة
interface Job {
  id: string;
  title: string;
  description: string;
}

const jobs: Job[] = [
  { id: "office-collector", title: "محصل مكتبي", description: "هتتابع العملاء على التليفون وتساعدهم يخرجوا منتظمين." },
  { id: "field-collector", title: "محصل ميداني", description: "هتزور العملاء اللي متأخرين في السداد وتساعدهم يسددوا المديونية." },
  { id: "field-investigator", title: "مستعلم ميداني", description: "هتزور مواقع العملاء وتجمع بيانات دقيقة وتقدم تقارير." },
  { id: "data-entry", title: "مدخل بيانات", description: "هتدخل بيانات العملاء والمعاملات بدقة وسرعة باستخدام برامج الاوفيس." }
];

// دالة توليد الميتا داتا الديناميكية
export const generateMetadata = ({ params }: { params: { id: string } }): Metadata => {
  const job = jobs.find((j) => j.id === params.id);
  
  if (!job) return { title: "وظيفة غير موجودة | المصرية للتحصيلات" };

  return {
    // 👇 الرابط الأساسي (مؤقت لفيرسل)
    metadataBase: new URL('https://www.egyptcollections.com'),
    
    title: `${job.title} | المصرية للتحصيلات – ECC Collections`,
    description: job.description,
    keywords: [
      "وظائف", "محصل", job.title, "ECC Collections", "المصرية للتحصيلات"
    ],
    openGraph: {
      title: job.title,
      description: job.description,
      // 👇 تعديل الرابط هنا كمان عشان يفتح صح
      url: `https://www.egyptcollections.com/jobs/${job.id}`,
      siteName: "ECC Collections",
      locale: "ar_EG",
      type: "website",
      images: [
        { 
            // 👇 هنا وحدنا الصورة لنفس صورة اللوجو
            url: '/og-image.png', 
            width: 1200, 
            height: 630, 
            alt: job.title 
        }
      ]
    },
    alternates: { canonical: `/jobs/${job.id}` },
  };
};

// مكون الصفحة الرئيسي (سيرفر)
export default function Page({ params }: { params: { id: string } }) {
  // بنمرر الـ id للمكون التفاعلي
  return <JobClient id={params.id} />;
}