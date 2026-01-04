import { Metadata } from 'next';
import AboutClient from './AboutClient';

// 1. تحسين الميتاداتا لزيادة الثقة (Authority)
export const metadata: Metadata = {
  title: 'عن الشركة | المصرية للتحصيلات (ECC) - خبرة وتاريخ منذ 2001',
  description: 'تعرف على المصرية للتحصيلات ECC، الشريك الاستراتيجي لكبرى البنوك في مصر. فريق عمل محترف بقيادة المستشار وائل سويلم، وتغطية شاملة لجميع المحافظات.',
  keywords: [
    // كلمات تعريفية
    'من نحن', 'تاريخ المصرية للتحصيلات', 'ECC Collections Profile',
    'سابقة أعمال', 'شركاء النجاح',
    // أسماء وشخصيات
    'المستشار وائل سويلم', 'فريق عمل ECC',
    // مصطلحات احترافية
    'إدارة مخاطر الائتمان', 'خدمات التعهيد البنكي', 'السرية والمصداقية',
    'تغطية جغرافية شاملة'
  ],
  alternates: {
    canonical: 'https://egyptcollections.com/about',
  },
  openGraph: {
    title: 'تاريخ من الخبرة | المصرية للتحصيلات - ECC',
    description: 'أكثر من 20 عاماً من التميز في مجال التحصيل والاستعلام الميداني في السوق المصري.',
    url: 'https://egyptcollections.com/about',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'فريق عمل المصرية للتحصيلات',
      },
    ],
  },
};

export default function Page() {
  // 2. تطوير الـ Schema لربط الشركة بمجالها (Knowledge Graph)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'ECC Collections - المصرية للتحصيلات',
      foundingDate: '2001',
      description: 'شركة رائدة في تقديم حلول التحصيل الميداني والاستعلام للبنوك والشركات.',
      areaServed: 'Egypt',
      // إضافة المؤسس بشكل مفصل
      founder: {
        '@type': 'Person',
        name: 'Wael Swelim',
        jobTitle: 'CEO',
        description: 'المستشار القانوني وخبير التحصيل الائتماني'
      },
      // أهم حتة: جوجل بيفهم منها تخصص الشركة إيه بالظبط
      knowsAbout: [
        'Debt Collection',
        'Credit Investigation',
        'Field Verification',
        'Risk Management'
      ]
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