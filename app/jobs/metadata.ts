// app/jobs/metadata.ts (Server Component)
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'الوظائف المتاحة - المصرية للتحصيلات | ECC Collections',
  description: 'استعرض جميع الفرص الوظيفية لدينا في المصرية للتحصيلات وانضم لفريقنا المتميز.',
  keywords: [
    'وظائف مصر', 'فرص عمل', 'محصل ميداني', 'مدخل بيانات', 'ECC Collections', 'المصرية للتحصيلات'
  ],
  openGraph: {
    title: 'الوظائف المتاحة - المصرية للتحصيلات',
    description: 'انضم لفريقنا المتنامي في المصرية للتحصيلات. اكتشف فرص العمل المتاحة الآن!',
    url: 'https://www.collection.eg/jobs',
    siteName: 'ECC Collections',
    images: [
      { url: '/og-jobs.png', width: 1200, height: 630, alt: 'وظائف المصرية للتحصيلات' }
    ],
    locale: 'ar_EG',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الوظائف المتاحة - المصرية للتحصيلات',
    description: 'انضم لفريقنا المتميز في المصرية للتحصيلات. اكتشف الفرص المتاحة!',
    images: ['/og-jobs.png'],
    creator: '@ECCCollections'
  },
  icons: { icon: '/favicon.ico' }
};
