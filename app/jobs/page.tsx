import { Metadata } from "next";
import JobsClient from "./JobsClient";

export const metadata: Metadata = {
  title: {
    // الترتيب الموحد: اسم الصفحة | البراند
    absolute: 'وظائف خالية | الشركة المصرية للتحصيلات ECC',
  },
  description: 'عايز شغل بجد ومستقبل مضمون؟ المصرية للتحصيلات ECC تفتح باب التعيين. مطلوب محصلين (ميداني/مكتبي) ومدخلين بيانات. مرتبات مجزية + عمولات يومية + تأمينات. بدون أي رسوم للتقديم.',
  keywords: [
    'وظائف خالية', 'شغل في الجيزة', 'فرص عمل للشباب', 'وظائف مصر',
    'مطلوب محصلين', 'مندوب تحصيل ميداني', 'شغل كول سنتر', 'مدخل بيانات',
    'وظائف بدون رسوم', 'شغل بمرتب ثابت', 'عمولات مجزية',
    'ECC Collections', 'المصرية للتحصيلات', 'التوظيف'
  ],
  alternates: { 
    // تصحيح الرابط ليكون كاملاً
    canonical: 'https://egyptcollections.com/jobs' 
  },
  openGraph: {
    title: 'فرصة شغل في المصرية للتحصيلات | ECC Collections',
    description: 'مطلوب رجالة تسد في الشغل! مرتبات ثابتة وعمولات وتأمين اجتماعي. التعيين فوري وبدون أي مصاريف إدارية. قدم دلوقتي.',
    url: 'https://egyptcollections.com/jobs',
    // الاسم الموحد بالعربي الأول
    siteName: 'المصرية للتحصيلات ECC',
    locale: 'ar_EG',
    type: 'website',
    images: [{
      url: 'https://egyptcollections.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'وظائف المصرية للتحصيلات - انضم لفريقنا'
    }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. تعريف الصفحة (CollectionPage - عشان دي قائمة وظائف)
      {
        '@type': 'CollectionPage',
        '@id': 'https://egyptcollections.com/jobs/#webpage',
        'url': 'https://egyptcollections.com/jobs',
        'name': 'وظائف خالية | الشركة المصرية للتحصيلات ECC',
        'description': 'فرص عمل متاحة في مجال التحصيل والاستعلام. انضم لفريق ECC.',
        'isPartOf': {
          '@id': 'https://egyptcollections.com/#website'
        },
        'about': {
          '@id': 'https://egyptcollections.com/#organization'
        },
        'breadcrumb': {
          '@id': 'https://egyptcollections.com/jobs/#breadcrumb'
        }
      },
      // 2. فتات الخبز (Breadcrumbs)
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://egyptcollections.com/jobs/#breadcrumb',
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
            'name': 'وظائف خالية',
            'item': 'https://egyptcollections.com/jobs'
          }
        ]
      },
      // 3. بيانات الشركة الموحدة (FinancialService)
      // عشان الباحث عن عمل يعرف مكان الشركة وتليفونها من البحث مباشرة
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
        'foundingDate': '2001',
        'priceRange': '$$',
        'telephone': '+201110600280',
        'description': 'الشركة الشركة المصرية للتحصيلات (ECC) هي الرائدة في خدمات التحصيل الميداني وتوفر فرص عمل متميزة للشباب.',
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
              "Saturday",
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday"
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
          'latitude': 30.0385,
          'longitude': 31.2185
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
      <JobsClient />
    </>
  );
}