import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'من نحن | المصرية للتحصيلات – ECC Collections',
  description: 'المصرية للتحصيلات ECC رائدة في مجال التحصيل والاستعلام الميداني في مصر. تعرف على تاريخنا، رؤيتنا، وفريق العمل بقيادة المستشار وائل سويلم.',
  keywords: [
    'من نحن', 'تاريخ الشركة', 'ECC Collections', 
    'وائل سويلم', 'خدمات البنوك', 'استعلام ائتماني', 
    'شركة تحصيل', 'رؤية ورسالة'
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'من نحن - المصرية للتحصيلات ECC',
    description: 'شركاء نجاح كبرى البنوك المصرية. تعرف على فريق عمل ECC.',
    // 👇 عدلنا الرابط هنا لفيرسل مؤقتاً
    url: 'https://egyptcollections.com/about',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        // 👇 هنا وحدنا الصورة لنفس صورة اللوجو اللي في public
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'المصرية للتحصيلات – من نحن',
      },
    ],
  },
};

export default function Page() {
  // كود Schema ممتاز جداً، سيبه زي ما هو
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'ECC Collections',
      founder: {
        '@type': 'Person',
        name: 'Wael Swelim',
        jobTitle: 'CEO'
      },
      foundingDate: '2001',
      areaServed: 'Egypt'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}