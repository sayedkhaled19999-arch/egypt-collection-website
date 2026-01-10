import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';      // لو مش بتستخدم Slick في حتة تانية ممكن تمسح السطر ده
import 'slick-carousel/slick/slick-theme.css'; // وده كمان
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
    default: 'الشركة المصرية للتحصيلات ECC',
    template: '%s | الشركة المصرية للتحصيلات ECC' 
  },
  
  description: 'الشركة المصرية للتحصيلات (ECC) هي دراعك اليمين في التحصيل الميداني والاستعلام. بنخدم البنوك والشركات في مصر من 2001. سيب ديونك علينا وركز في شغلك.',
  
  publisher: 'ECC - Egyptian Collections Co.', 
  creator: 'Sayed Khaled', 
  authors: [
    { name: 'ECC', url: 'https://egyptcollections.com' },
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
      google: 'tJklZHtOnBjimH3tU5LBDLpUpivNENAaf7L2ov_6V_E', // بتاع جوجل سيبه زي ما هو
      other: {
        'facebook-domain-verification': 'ogi44bce1rhr0o5kwfq84tcglr691a', 
    },
  },

  keywords: [
    'المصرية للتحصيلات', 'ECC', 'تحصيل ديون', 'شركة تحصيل', 
    'مناديب تحصيل', 'تحصيل ميداني', 'استعلام ائتماني', 'تحصيل محافظ بنكية',
    'شركات التعهيد في مصر', 'تحديث بيانات', 'استرداد مديونيات',
    'Debt Collection Egypt', 'Field Collection Services', 'Credit Investigation Egypt',
    'Debt Recovery Agency', 'Outsourcing Collection Services', 'Bad Debt Recovery',
    'Door to Door Collection', 'ECC Egypt'
  ],
  
  openGraph: {
    title: 'الشركة المصرية للتحصيلات ECC | ريادة وخبرة من 2001',
    description:
      'عايز شركة تخلصك من وجع الدماغ وتحصل فلوسك؟ الشركة المصرية للتحصيلات (ECC) بخبرة 20 سنة وتغطية لكل محافظات مصر هي الحل.',
    url: 'https://egyptcollections.com',
    siteName: 'الشركة المصرية للتحصيلات ECC',
    images: [
      {
        url: 'https://egyptcollections.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'الشركة المصرية للتحصيلات ECC'
      }
    ],
    locale: 'ar_EG',
    type: 'website'
  },

  twitter: {
    card: 'summary_large_image',
    title: 'الشركة المصرية للتحصيلات ECC',
    description: 'أقوى خدمات التحصيل الميداني والاستعلام في مصر.',
    images: ['/og-image.png'],
  },
  
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
      { url: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  category: 'Business Services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GTM_ID = 'GTM-WQLQH658';

  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} ${tajawal.variable} flex flex-col min-h-screen bg-gray-50`}>
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* 
          ✅ التعديل هنا: 
          حطينا النافبار والمحتوى والفوتر كلهم جوه ClientWrapper 
          عشان اللودر يغطي الصفحة بالكامل لحد ما تحمل
        */}
        <ClientWrapper>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ClientWrapper>
        
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics & Tag Manager Scripts */}
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