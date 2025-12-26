import { Metadata } from "next";
import JobsClient from "./JobsClient"; // استدعينا الملف اللي عملناه فوق

export const metadata: Metadata = {
  metadataBase: new URL('https://www.collection.eg'),
  title: 'وظائف المصرية للتحصيلات | ECC Collections – قدم الآن',
  description: 'قدّم الآن على وظائف المصرية للتحصيلات ECC Collections. محصلين ميداني ومكتبي، مدخل بيانات، فرص عمل حقيقية بدون أي رسوم، تدريب مدفوع الأجر.',
  keywords: [
    'وظائف', 'تقديم وظائف', 'فرص عمل', 'وظائف مصر',
    'وظائف تحصيل', 'شركات تحصيل', 'تحصيل ديون', 
    'محصل', 'محصل ميداني', 'محصل مكتبي', 'مدخل بيانات',
    'وظائف الجيزة', 'ECC Collections', 'المصرية للتحصيلات'
  ],
  alternates: {
    canonical: '/jobs'
  },
  openGraph: {
    title: 'وظائف المصرية للتحصيلات | ECC Collections',
    description: 'فرص عمل حقيقية في المصرية للتحصيلات ECC Collections. بدون رسوم، تدريب مدفوع، وتأمين اجتماعي بعد التثبيت.',
    url: 'https://www.collection.eg/jobs',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [{
        url: '/og-jobs.png',
        width: 1200,
        height: 630,
        alt: 'وظائف المصرية للتحصيلات ECC Collections'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'وظائف المصرية للتحصيلات | ECC Collections',
    description: 'قدّم على وظائف ECC Collections: محصلين، مدخل بيانات، بدون رسوم + تدريب مدفوع.',
    images: ['/og-jobs.png'],
    creator: '@ECCCollections'
  },
};

export default function Page() {
  return <JobsClient />;
}