'use client';

import HomeContent from '@/components/HomeContent';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>المصرية للتحصيلات – ECC Collections | خدمات التحصيل الميداني والتحقق من البيانات في مصر</title>
        <meta
          name="description"
          content="المصرية للتحصيلات – ECC Collections تقدم أفضل خدمات التحصيل الميداني والاستعلام والتحقق من البيانات للعملاء في مصر منذ 2002. خدمات احترافية، سريعة وموثوقة."
        />
        <meta name="keywords" content="تحصيل ميداني,خدمات التحصيل,ECC Collections,استعلام ميداني,الشركة المصرية للتحصيلات,خدمات احترافية,تحصيل في مصر" />
        <link rel="canonical" href="https://www.collection.eg" />

        {/* Open Graph */}
        <meta property="og:title" content="المصرية للتحصيلات – ECC Collections" />
        <meta
          property="og:description"
          content="أفضل خدمات التحصيل الميداني والتحقق من البيانات للعملاء في مصر منذ 2002. خدمات احترافية، موثوقة وسريعة."
        />
        <meta property="og:url" content="https://www.collection.eg" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="المصرية للتحصيلات – ECC Collections" />
        <meta
          name="twitter:description"
          content="أفضل خدمات التحصيل الميداني والتحقق من البيانات للعملاء في مصر منذ 2002. خدمات احترافية، موثوقة وسريعة."
        />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>

      <HomeContent />
    </>
  );
}
