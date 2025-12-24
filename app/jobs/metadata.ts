// app/jobs/metadata.ts
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.collection.eg'),

  title: 'وظائف المصرية للتحصيلات | ECC Collections – قدم الآن',

  description:
    'قدّم الآن على وظائف المصرية للتحصيلات ECC Collections. محصلين ميداني ومكتبي، مدخل بيانات، فرص عمل حقيقية بدون أي رسوم، تدريب مدفوع الأجر، وتأمين اجتماعي بعد التثبيت.',

  keywords: [
    // نية البحث الأساسية
    'وظائف',
    'تقديم وظائف',
    'فرص عمل',
    'وظائف مصر',

    // مجال التحصيل
    'وظائف تحصيل',
    'شركات تحصيل',
    'تحصيل ديون',
    'وظائف شركات تحصيل',

    // المسميات
    'محصل',
    'محصل ميداني',
    'محصل مكتبي',
    'مدخل بيانات',
    'وظائف خدمة عملاء',

    // أماكن
    'وظائف الجيزة',
    'وظائف القاهرة',
    'وظائف الدقي',
    'وظائف جميع المحافظات',

    // الثقة
    'وظائف بدون رسوم',
    'تدريب مدفوع الأجر',
    'تأمين اجتماعي',

    // البراند
    'ECC Collections',
    'المصرية للتحصيلات'
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },

  alternates: {
    canonical: '/jobs'
  },

  openGraph: {
    title: 'وظائف المصرية للتحصيلات | ECC Collections',
    description:
      'فرص عمل حقيقية في المصرية للتحصيلات ECC Collections. بدون رسوم، تدريب مدفوع، وتأمين اجتماعي بعد التثبيت. قدّم الآن.',
    url: 'https://www.collection.eg/jobs',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-jobs.png',
        width: 1200,
        height: 630,
        alt: 'وظائف المصرية للتحصيلات ECC Collections'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    title: 'وظائف المصرية للتحصيلات | ECC Collections',
    description:
      'قدّم على وظائف ECC Collections: محصلين، مدخل بيانات، بدون رسوم + تدريب مدفوع + تأمين اجتماعي.',
    images: ['/og-jobs.png'],
    creator: '@ECCCollections'
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },

  category: 'jobs'
};
