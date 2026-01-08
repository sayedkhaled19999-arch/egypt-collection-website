import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: {
    // الترتيب الموحد: اسم الصفحة | البراند
    absolute: 'سياسة الخصوصية | الشركة المصرية للتحصيلات ECC',
  },
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
  alternates: { 
    // تصحيح الرابط ليكون كاملاً
    canonical: 'https://egyptcollections.com/privacy' 
  },
  openGraph: {
    title: 'التزامنا بحماية خصوصيتك | الشركة المصرية للتحصيلات ECC',
    description: 'نطبق أعلى معايير الأمان الرقمي والسرية البنكية لضمان سلامة بياناتك.',
    url: 'https://egyptcollections.com/privacy',
    // الاسم الموحد
    siteName: 'المصرية للتحصيلات ECC',
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
  // تاريخ آخر تحديث (مهم جداً لصفحات السياسة)
  const lastUpdated = new Date().toISOString().split('T')[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. تعريف الصفحة (WebPage)
      {
        '@type': 'WebPage',
        '@id': 'https://egyptcollections.com/privacy/#webpage',
        'url': 'https://egyptcollections.com/privacy',
        'name': 'سياسة الخصوصية | الشركة المصرية للتحصيلات ECC',
        'description': 'سياسة حماية البيانات والخصوصية لشركة المصرية للتحصيلات',
        'datePublished': "2024-01-01",
        'dateModified': lastUpdated,
        'isPartOf': {
          '@id': 'https://egyptcollections.com/#website'
        },
        'publisher': {
          '@id': 'https://egyptcollections.com/#organization'
        },
        'breadcrumb': {
          '@id': 'https://egyptcollections.com/privacy/#breadcrumb'
        },
        'inLanguage': 'ar-EG'
      },
      // 2. فتات الخبز (Breadcrumbs)
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://egyptcollections.com/privacy/#breadcrumb',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'الرئيسية',
            'item': 'https://egyptcollections.com/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'سياسة الخصوصية',
            'item': 'https://egyptcollections.com/privacy'
          }
        ]
      },
      // 3. بيانات الشركة (عشان نضمن الثقة في الصفحة دي بالذات)
      {
        '@type': 'FinancialService',
        '@id': 'https://egyptcollections.com/#organization',
        'name': 'المصرية للتحصيلات ECC',
        'url': 'https://egyptcollections.com/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://egyptcollections.com/icon.png',
          'width': 512,
          'height': 512
        },
        'image': 'https://egyptcollections.com/og-image.png',
        'telephone': '+201110600280',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '30 شارع هارون، ميدان المساحة',
          'addressLocality': 'الدقي',
          'addressRegion': 'الجيزة',
          'postalCode': '12611',
          'addressCountry': 'EG'
        },
        'sameAs': [
          'https://www.facebook.com/EgyptCollectionsCo'
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PrivacyClient />
    </>
  );
}