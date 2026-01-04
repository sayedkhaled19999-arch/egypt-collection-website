import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientWrapper from '@/components/ClientWrapper';
import Script from 'next/script';

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
  // شيلنا www من هنا عشان يبقى الرابط الأساسي نظيف
  metadataBase: new URL('https://egyptcollections.com'), 

  title: {
    default: 'المصرية للتحصيلات – ECC Collections | خدمات التحصيل الميداني والاستعلام',
    template: '%s | ECC Collections - المصرية للتحصيلات' 
  },
  
  description: 'المصرية للتحصيلات (ECC) رائدة خدمات التحصيل الميداني، الاستعلام الائتماني، والتحقق من البيانات للبنوك والشركات في مصر منذ 2001. تغطية شاملة لجميع المحافظات.',
  
  // بيانات الناشر والمؤلف
  publisher: 'Egyptian Collections Co. (ECC)', // ده صاحب الشركة
  creator: 'Sayed Khaled', // ده الباشمهندس (أنت)
  authors: [
    // شيلنا www من هنا كمان
    { name: 'Egyptian Collections Co.', url: 'https://egyptcollections.com' },
    { name: 'Sayed Khaled' } 
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
    // شيلنا www من هنا عشان السوشيال ميديا
    url: 'https://egyptcollections.com', 
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
    creator: '@ECC_Collections'
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
        
        {/* إضافات Vercel */}
        <Analytics />
        <SpeedInsights />

        {/* كود جوجل أناليتكس اللي ضفناه سوا */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-20VCCYNW0K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-20VCCYNW0K');
          `}
        </Script>

      </body>
    </html>
  );
}