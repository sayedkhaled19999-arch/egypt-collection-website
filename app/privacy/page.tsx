import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

const SITE_URL = 'https://egyptcollections.com';

export const metadata: Metadata = {
  // ✅ التعديل هنا: "سياسة الخصوصية" بس
  // النتيجة هتظهر: "سياسة الخصوصية | الشركة المصرية للتحصيلات ECC"
  title: 'سياسة الخصوصية',
  
  description: 'تعرف على سياسة الخصوصية في الشركة المصرية للتحصيلات. نلتزم تماماً بقوانين البنك المركزي المصري ومعايير السرية المصرفية لحماية بيانات عملائنا.',
  
  keywords: [
    'سياسة الخصوصية', 
    'حماية البيانات الشخصية', 
    'سرية المعلومات البنكية', 
    'ECC', 
    'حقوق العميل',
    'قانون حماية البيانات المصري',
    'المصرية للتحصيلات', 
    'شروط الاستخدام',
    'التوظيف والسرية'
  ],
  
  alternates: { 
    canonical: '/privacy' // ✅ اختصار
  },
  
  openGraph: {
    title: 'التزامنا بحماية خصوصيتك | المصرية للتحصيلات ECC',
    description: 'نطبق أعلى معايير الأمان الرقمي والسرية البنكية لضمان سلامة بياناتك.',
    url: '/privacy', // ✅ اختصار
    siteName: 'المصرية للتحصيلات ECC',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // ✅ اختصار
        width: 1200,
        height: 630,
        alt: 'سياسة الخصوصية - المصرية للتحصيلات',
      },
    ],
  },
  
  // ❌ تم حذف robots (موجودة في layout.tsx)
};

export default function Page() {
  // كود ذكي جداً منك لتحديث التاريخ تلقائياً
  const lastUpdated = new Date().toISOString().split('T')[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. تعريف الصفحة
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/privacy/#webpage`,
        'url': `${SITE_URL}/privacy`,
        'name': 'سياسة الخصوصية | الشركة المصرية للتحصيلات ECC',
        'description': 'سياسة حماية البيانات والخصوصية لشركة المصرية للتحصيلات',
        'datePublished': "2024-01-01",
        'dateModified': lastUpdated, // ممتاز
        'isPartOf': {
          '@id': `${SITE_URL}/#website`
        },
        'publisher': {
          '@id': `${SITE_URL}/#organization`
        },
        'breadcrumb': {
          '@id': `${SITE_URL}/privacy/#breadcrumb`
        },
        'inLanguage': 'ar-EG'
      },
      // 2. فتات الخبز
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/privacy/#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'الرئيسية',
            'item': `${SITE_URL}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'سياسة الخصوصية',
            'item': `${SITE_URL}/privacy`
          }
        ]
      },
      // 3. بيانات الشركة (مختصرة ومفيدة لصفحة السياسة)
      {
        '@type': 'FinancialService',
        '@id': `${SITE_URL}/#organization`,
        'name': 'الشركة المصرية للتحصيلات ECC',
        'url': `${SITE_URL}/`,
        'logo': {
          '@type': 'ImageObject',
          'url': `${SITE_URL}/icon.png`,
          'width': 512,
          'height': 512
        },
        'image': `${SITE_URL}/og-image.png`,
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