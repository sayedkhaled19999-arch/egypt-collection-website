import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientWrapper from '@/components/ClientWrapper';

// إضافات Vercel
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
});

export const viewport = {
  themeColor: '#2563EB',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  // الرابط الأساسي عشان الصور تشتغل صح
  metadataBase: new URL('https://www.egyptcollections.com'), 

  title: {
    default: 'المصرية للتحصيلات – ECC Collections | خدمات التحصيل الميداني والاستعلام',
    template: '%s | ECC Collections - المصرية للتحصيلات' 
  },
  
  description: 'المصرية للتحصيلات (ECC) رائدة خدمات التحصيل الميداني، الاستعلام الائتماني، والتحقق من البيانات للبنوك والشركات في مصر منذ 2001. تغطية شاملة لجميع المحافظات.',
  
  // 👇 التظبيطة الصح هنا
  publisher: 'Egyptian Collections Co. (ECC)', // ده صاحب الحقوق (الشركة)
  creator: 'Sayed Khaled', // ده المبدع (أنت)
  authors: [
    { name: 'Egyptian Collections Co.', url: 'https://www.egyptcollections.com' },
    { name: 'Sayed Khaled' } // اسمك هنا برضه عشان تحفظ حقك
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'tJklZHtOnBjimH3tU5LBDLpUpivNENAaf7L2ov_6V_E',
  },

  keywords: [
    'تحصيل ميداني', 'شركة تحصيل', 'ECC Collections', 'المصرية للتحصيلات',
    'استعلام ميداني', 'التحقق من بيانات العملاء', 'Field Investigation', 'Debt Collection Egypt',
    'شركات تحصيل ديون في مصر', 'خدمات التعهيد', 'Outsourcing Collection', 
    'تحصيل محافظ بنكية', 'الاستعلام الائتماني', 'التحقق من محل الإقامة والعمل',
    'تحصيل في القاهرة', 'خدمات تحصيل في الجيزة', 'تحصيل ديون الإسكندرية', 'تغطية جميع محافظات مصر'
  ],
  
  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'المصرية للتحصيلات – ECC Collections | ريادة في التحصيل الميداني',
    description: 'شريكك الموثوق في خدمات التحصيل الميداني والتحقق من البيانات. خبرة أكثر من 20 عاماً.',
    url: 'https://www.egyptcollections.com', 
    siteName: 'ECC Collections',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'المصرية للتحصيلات – ECC Collections - خدمات التحصيل'
      }
    ],
    locale: 'ar_EG',
    type: 'website'
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'المصرية للتحصيلات – ECC Collections',
    description: 'خدمات تحصيل ميداني واستعلام ائتماني احترافية تغطي كافة أنحاء مصر.',
    images: ['/og-image.png'],
    creator: '@ECC_Collections' // لو الشركة ليها حساب تويتر، لو ملهاش شيل السطر ده
  },
  
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },

  category: 'Business Services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} ${tajawal.variable} flex flex-col min-h-screen bg-gray-50`}>
        <Navbar />
        <ClientWrapper>
          <main className="flex-grow">{children}</main>
        </ClientWrapper>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}