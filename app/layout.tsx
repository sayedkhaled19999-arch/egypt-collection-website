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

// Moved viewport to a separate export as per Next.js 14+ standards
export const viewport = {
  themeColor: '#2563EB',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://egyptcollections.com'), 

  title: {
    // الترتيب الجديد: العربي الأول عشان يظهر كعنوان رئيسي قوي
    default: 'ECC Collections - المصرية للتحصيلات',
    template: '%s | ECC Collections - المصرية للتحصيلات' 
  },
  
  // وصف مصري قوي وشامل
  description: 'المصرية للتحصيلات (ECC) هي دراعك اليمين في التحصيل الميداني والاستعلام. بنخدم البنوك والشركات في مصر من 2001. سيب ديونك علينا وركز في شغلك.',
  
  publisher: 'ECC Collections - Egyptian Collections Co.', 
  creator: 'Sayed Khaled', 
  authors: [
    { name: 'ECC Collections', url: 'https://egyptcollections.com' },
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

  // هنا حطيتلك الإنجليزي والعربي عشان تمسك البحث من الناحيتين
  // الكلمات دي مش بتظهر للي فاتح الموقع، دي لجوجل بس
  keywords: [
    // عربي
    'المصرية للتحصيلات', 'ECC Collections', 'تحصيل ديون', 'شركة تحصيل', 
    'مناديب تحصيل', 'تحصيل ميداني', 'استعلام ائتماني', 'تحصيل محافظ بنكية',
    'شركات التعهيد في مصر', 'تحديث بيانات', 'استرداد مديونيات',
    // English (Hidden for SEO)
    'Debt Collection Egypt', 'Field Collection Services', 'Credit Investigation Egypt',
    'Debt Recovery Agency', 'Outsourcing Collection Services', 'Bad Debt Recovery',
    'Door to Door Collection', 'ECC Collections Egypt'
  ],
  
  openGraph: {
    title: 'ECC Collections - المصرية للتحصيلات | ريادة وخبرة من 2001',
    description: 'عايز شركة تخلصك من وجع الدماغ وتحصل فلوسك؟ المصرية للتحصيلات (ECC) بخبرة 20 سنة وتغطية لكل محافظات مصر هي الحل.',
    url: 'https://egyptcollections.com', 
    siteName: 'ECC Collections - المصرية للتحصيلات', // ده مهم جداً عشان الاسم يظهر صح في جوجل
    images: [
      {
        url: 'https://egyptcollections.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ECC Collections - المصرية للتحصيلات'
      }
    ],
    locale: 'ar_EG',
    type: 'website'
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'ECC Collections - المصرية للتحصيلات',
    description: 'أقوى خدمات التحصيل الميداني والاستعلام في مصر.',
    images: ['/og-image.png'],
    creator: '@ECC_Collections'
  },
  
  // الجزء ده هو المسئول عن ظهور اللوجو الصغير جنب نتيجة البحث
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' }, // جوجل بيحب المقاسات الكبيرة عشان يعرضها
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