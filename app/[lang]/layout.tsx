// --- START OF FILE app/[lang]/layout.tsx ---

import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Tajawal } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientWrapper from '@/components/ClientWrapper';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// استيراد أدوات اللغة الجديدة
import { i18n, type Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

// إعداد الخط العربي
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

// دالة سحرية لإنشاء المسارات الثابتة (Static Generation) لسرعة خرافية
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// الميتا داتا الديناميكية (تتغير حسب اللغة)
export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const SITE_URL = 'https://egyptcollections.com';

  return {
    metadataBase: new URL(SITE_URL),
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },
    themeColor: '#2563EB',
    
    // العنوان والوصف بييجوا من ملف الترجمة JSON
    title: {
      default: dict.metadata.title,
      template: `%s | ${params.lang === 'ar' ? 'الشركة المصرية للتحصيلات ECC' : 'ECC'}`
    },
    description: dict.metadata.description,
    
    applicationName: 'ECC App',
    authors: [{ name: 'ECC Team', url: SITE_URL }, { name: 'Sayed Khaled' }],
    generator: 'Next.js',

    // الكلمات المفتاحية (ممكن تخصصها لكل لغة لو حابب)
    keywords: [
      'ECC', 'Egyptian Collections Company', 'Debt Collection Egypt', 
      'المصرية للتحصيلات', 'تحصيل ديون', 'استعلام ائتماني', 
      'Credit Investigation', 'Field Collection'
    ],

    // إعدادات اللغات (SEO القاتل) - ده اللي بيعرف جوجل إن في نسخ مختلفة
    alternates: {
      canonical: `${SITE_URL}/${params.lang}`,
      languages: {
        'ar-EG': `${SITE_URL}/ar`,
        'en-US': `${SITE_URL}/en`,
      },
    },

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
      other: {
        'facebook-domain-verification': 'ogi44bce1rhr0o5kwfq84tcglr691a',
      },
    },

    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: `${SITE_URL}/${params.lang}`,
      siteName: params.lang === 'ar' ? 'الشركة المصرية للتحصيلات ECC' : 'ECC',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ECC' }],
      locale: params.lang === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ['/og-image.png'],
      creator: '@ECC_Egypt',
    },

    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
        { url: '/icon.png', type: 'image/png', sizes: '192x192' },
        { url: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const GTM_ID = 'GTM-WQLQH658';
  
  // جلب الترجمة على السيرفر
  const dict = await getDictionary(params.lang);

  return (
    // تحديد اتجاه الصفحة ولغتها ديناميكياً
    <html lang={params.lang} dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${tajawal.className} ${tajawal.variable} flex flex-col min-h-screen bg-gray-50`}>
        
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ClientWrapper>
          {/* تمرير اللغة والترجمة للنافبار عشان يعرض النصوص صح */}
          <Navbar lang={params.lang} dict={dict.navbar} />
          
          <main className="flex-grow">
            {children}
          </main>
          
          {/* تمرير الترجمة للفوتر لو محتاج */}
          <Footer lang={params.lang} dict={dict.footer} />
        </ClientWrapper>

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