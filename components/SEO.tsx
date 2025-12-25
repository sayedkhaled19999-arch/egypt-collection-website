'use client';

import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export default function SEO({ title, description, image, url }: SEOProps) {
  const defaultTitle = title ? `${title} | المصرية للتحصيلات – ECC Collections` : 'المصرية للتحصيلات – ECC Collections';
  const defaultImage = image || '/hero/hero.jpg';
  const defaultUrl = url || 'https://ecc-collections.com';

  return (
    <Head>
      <title>{defaultTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="المصرية للتحصيلات, ECC Collections, بنوك, تحصيل, استعلام, وظائف, شركاء" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:url" content={defaultUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ar_EG" />
      <meta property="og:site_name" content="المصرية للتحصيلات – ECC Collections" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultImage} />
    </Head>
  );
}
