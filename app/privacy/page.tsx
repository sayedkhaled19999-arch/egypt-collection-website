import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | المصرية للتحصيلات – ECC Collections',
  description: 'تعرف على سياسة الخصوصية وحماية البيانات في ECC Collections. نحن نلتزم بأعلى معايير السرية البنكية وحماية بيانات العملاء والمتقدمين للوظائف.',
  keywords: [
    'سياسة الخصوصية', 'حماية البيانات', 'سرية المعلومات', 
    'ECC Collections', 'المصرية للتحصيلات', 'بيانات العملاء',
    'السرية البنكية', 'شروط الاستخدام', 'التوظيف'
  ],
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'سياسة الخصوصية - المصرية للتحصيلات ECC',
    description: 'التزامنا نحو حماية بياناتك وسرية التعاملات البنكية.',
    url: 'https://egyptcollections.com/privacy',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // نفس الصورة الموحدة للموقع
        width: 1200,
        height: 630,
        alt: 'المصرية للتحصيلات – سياسة الخصوصية',
      },
    ],
  },
};

export default function Page() {
  // Schema خاصة بصفحات الخصوصية لتوثيق المصداقية عند جوجل
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سياسة الخصوصية',
    description: 'سياسة حماية البيانات والخصوصية لشركة المصرية للتحصيلات',
    publisher: {
      '@type': 'Organization',
      name: 'ECC Collections',
      logo: {
        '@type': 'ImageObject',
        url: 'https://egyptcollections.com/logo.png' // لو عندك رابط للوجو
      }
    },
    inLanguage: 'ar-EG'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PrivacyClient />
    </>
  );
}