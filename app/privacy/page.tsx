import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية وحماية بيانات العملاء | ECC Collections',
  description: 'تعرف على سياسة الخصوصية في الشركة المصرية للتحصيلات. نلتزم تماماً بقوانين البنك المركزي المصري ومعايير السرية المصرفية لحماية بيانات عملائنا.',
  keywords: [
    'سياسة الخصوصية', 
    'حماية البيانات الشخصية', 
    'سرية المعلومات البنكية', 
    'ECC Collections', 
    'حقوق العميل',
    'قانون حماية البيانات المصري',
    'المصرية للتحصيلات', 
    'شروط الاستخدام',
    'التوظيف والسرية'
  ],
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'التزامنا بحماية خصوصيتك - ECC Collections',
    description: 'نطبق أعلى معايير الأمان الرقمي والسرية البنكية لضمان سلامة بياناتك.',
    url: 'https://egyptcollections.com/privacy',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: 'https://egyptcollections.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'سياسة الخصوصية - المصرية للتحصيلات',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  const lastUpdated = "2025-12-31";

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سياسة الخصوصية',
    description: 'سياسة حماية البيانات والخصوصية لشركة المصرية للتحصيلات',
    datePublished: "2024-01-01",
    dateModified: lastUpdated,
    publisher: {
      '@type': 'Organization',
      name: 'Egyptian Collections Co. (ECC)',
      logo: {
        '@type': 'ImageObject',
        url: 'https://egyptcollections.com/og-image.png'
      }
    },
    inLanguage: 'ar-EG',
    specialty: 'Data Protection & Banking Secrecy'
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
