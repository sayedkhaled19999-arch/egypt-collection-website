import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

const SITE_URL = 'https://egyptcollections.com';

export const metadata: Metadata = {
  // ✅ العنوان والوصف للتبويب وللمشاركة
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
  
  // ✅ Canonical مهم حتى لو الصفحة مخفية (Best Practice)
  alternates: { 
    canonical: '/privacy'
  },

  // 👇👇 الجزء المهم جداً لإخفاء الصفحة من جوجل 👇👇
  robots: {
    index: false,  // (ممنوع) لا تضع الصفحة في نتائج البحث
    follow: false, // (ممنوع) لا تتبع الروابط الموجودة داخل الصفحة
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // 👆👆 كدة الرسالة في Search Console هتتحول لـ Excluded by noindex

  // ✅ بنسيب الـ OpenGraph عشان لو حد بعت اللينك واتساب يظهر شكله حلو
  openGraph: {
    title: 'التزامنا بحماية خصوصيتك | المصرية للتحصيلات ECC',
    description: 'نطبق أعلى معايير الأمان الرقمي والسرية البنكية لضمان سلامة بياناتك.',
    url: '/privacy',
    siteName: 'المصرية للتحصيلات ECC',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'سياسة الخصوصية - المصرية للتحصيلات',
      },
    ],
  },
};

export default function Page() {
  // تحديث تاريخ التعديل تلقائياً
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
        'dateModified': lastUpdated,
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
      // 3. بيانات الشركة
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