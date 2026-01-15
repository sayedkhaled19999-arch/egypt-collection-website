import { Metadata } from "next";
import JobsClient from "./JobsClient";

const SITE_URL = 'https://egyptcollections.com';

export const metadata: Metadata = {
  // ✅ التعديل هنا: "وظائف خالية" بس
  // النتيجة هتظهر: "وظائف خالية | الشركة المصرية للتحصيلات ECC"
  title: 'وظائف خالية',
  
  description: 'عايز شغل بجد ومستقبل مضمون؟ المصرية للتحصيلات ECC تفتح باب التعيين. مطلوب محصلين (ميداني/مكتبي) ومدخلين بيانات. مرتبات مجزية + عمولات يومية + تأمينات. بدون أي رسوم للتقديم.',
  
  keywords: [
    'وظائف خالية', 'شغل في الجيزة', 'فرص عمل للشباب', 'وظائف مصر',
    'مطلوب محصلين', 'مندوب تحصيل ميداني', 'شغل كول سنتر', 'مدخل بيانات',
    'وظائف بدون رسوم', 'شغل بمرتب ثابت', 'عمولات مجزية',
    'ECC', 'المصرية للتحصيلات', 'التوظيف'
  ],
  
  alternates: { 
    canonical: '/jobs' // ✅ اختصار
  },
  
  openGraph: {
    title: 'فرصة شغل في المصرية للتحصيلات | ECC',
    description: 'مطلوب رجالة تسد في الشغل! مرتبات ثابتة وعمولات وتأمين اجتماعي. التعيين فوري وبدون أي مصاريف إدارية.',
    url: '/jobs', // ✅ اختصار
    siteName: 'المصرية للتحصيلات ECC',
    locale: 'ar_EG',
    type: 'website',
    images: [{
      url: '/og-image.png', // ✅ اختصار
      width: 1200,
      height: 630,
      alt: 'وظائف المصرية للتحصيلات - انضم لفريقنا'
    }]
  },
  
  // ❌ تم حذف robots لأنها موجودة في layout.tsx
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. تعريف الصفحة (CollectionPage مناسبة جداً لصفحة فيها كذا وظيفة)
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/jobs/#webpage`,
        'url': `${SITE_URL}/jobs`,
        'name': 'وظائف خالية | الشركة المصرية للتحصيلات ECC',
        'description': 'فرص عمل متاحة في مجال التحصيل والاستعلام. انضم لفريق ECC.',
        'isPartOf': {
          '@id': `${SITE_URL}/#website`
        },
        'about': {
          '@id': `${SITE_URL}/#organization`
        },
        'breadcrumb': {
          '@id': `${SITE_URL}/jobs/#breadcrumb`
        }
      },
      // 2. فتات الخبز
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/jobs/#breadcrumb`,
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
            'name': 'وظائف خالية',
            'item': `${SITE_URL}/jobs`
          }
        ]
      },
      // 3. بيانات الشركة (عشان الباحث عن عمل يوصلكم بسرعة)
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
        'foundingDate': '2001',
        'priceRange': '$$',
        'telephone': '+201110600280',
        
        // ✅ تم إصلاح الخطأ المطبعي (الشركة الشركة)
        'description': 'الشركة المصرية للتحصيلات (ECC) هي الرائدة في خدمات التحصيل الميداني وتوفر فرص عمل متميزة للشباب.',
        
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '30 شارع هارون، ميدان المساحة',
          'addressLocality': 'الدقي',
          'addressRegion': 'الجيزة',
          'postalCode': '12611',
          'addressCountry': 'EG'
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
              "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"
            ],
            'opens': '08:30',
            'closes': '18:30'
          }
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+201110600280',
          'contactType': 'customer service',
          'areaServed': 'EG',
          'availableLanguage': ['Arabic', 'English']
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '30.0385',
          'longitude': '31.2185'
        },
        'sameAs': [
          'https://www.facebook.com/egyptcollectionsco'
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <JobsClient />
    </>
  );
}