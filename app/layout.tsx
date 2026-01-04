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
  metadataBase: new URL('https://egyptcollections.com'), 

  title: {
    // تم تعديل العنوان الافتراضي ليكون متوافقاً مع الطول المطلوب
    default: 'المصرية للتحصيلات (ECC) | خدمات التحصيل والاستعلام الميداني',
    template: '%s | ECC Collections' 
  },
  
  description: 'المصرية للتحصيلات (ECC) رائدة خدمات التحصيل الميداني، الاستعلام الائتماني، والتحقق من البيانات للبنوك والشركات في مصر منذ 2001. تغطية شاملة لجميع المحافظات.',
  
  publisher: 'Egyptian Collections Co. (ECC)', 
  creator: 'Sayed Khaled', 
  authors: [
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
    // تم تعديل الرابط ليكون الرابط الكامل بدلاً من "/" لضمان أفضل توافق
    canonical: 'https://egyptcollections.com',
  },

  openGraph: {
    title: 'المصرية للتحصيلات – ECC Collections | ريادة في التحصيل الميداني',
    description: 'شريكك الموثوق في خدمات التحصيل الميداني والتحقق من البيانات. خبرة أكثر من 20 عاماً.',
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
  const GTM_ID = 'GTM-WQLQH658';

  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} ${tajawal.variable} flex flex-col min-h-screen bg-gray-50`}>
        
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Navbar />
        <ClientWrapper>
          <main className="flex-grow">{children}</main>
        </ClientWrapper>
        <Footer />
        
        <Analytics />
        <SpeedInsights />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NXPPCK0R5E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NXPPCK0R5E');
          `}
        </Script>

        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

      </body>
    </html>
  );
}