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
import { i18n, type Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

// السرعة القصوى (Static Generation)
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// الميتا داتا العامة (General Metadata)
export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const SITE_URL = 'https://egyptcollections.com';

  return {
    // 1. الأساس لكل الروابط النسبية (مهم جداً للـ SEO)
    metadataBase: new URL(SITE_URL),
    
    title: {
      default: dict.metadata.title,
      template: `%s | ${params.lang === 'ar' ? 'ECC' : 'ECC'}`
    },
    description: dict.metadata.description,
    
    // 2. إعدادات الروبوتات (مسموح للكل)
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

    // 3. التحقق من الملكية
    verification: {
      google: 'tJklZHtOnBjimH3tU5LBDLpUpivNENAaf7L2ov_6V_E',
      other: {
        'facebook-domain-verification': 'ogi44bce1rhr0o5kwfq84tcglr691a',
      },
    },

    // 4. أيقونات الموقع
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
        { url: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },

    // 5. السوشيال ميديا (OpenGraph)
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: `/${params.lang}`, // لاحظ: استخدمنا مسار نسبي عشان يشتغل لكل صفحة
      siteName: params.lang === 'ar' ? 'الشركة المصرية للتحصيلات ECC' : 'ECC',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ECC' }],
      locale: params.lang === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
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
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang} dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${tajawal.className} ${tajawal.variable} flex flex-col min-h-screen bg-gray-50`}>
        
        {/* Google Tag Manager (NoScript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ClientWrapper>
          <Navbar lang={params.lang} dict={dict.navbar} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer lang={params.lang} dict={dict.footer} />
        </ClientWrapper>

        {/* Analytics & Insights */}
        <Analytics />
        <SpeedInsights />

        {/* Scripts - Loaded carefully */}
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