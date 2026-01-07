import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: {
    absolute: 'ECC Collections - المصرية للتحصيلات'
  },
  description: 'المصرية للتحصيلات (ECC) اختيارك الأول من 2001. بنغطي مصر كلها بفريق محترف في التحصيل الميداني والاستعلام البنكي. رجع فلوسك وأنت مطمن.',
  alternates: {
    canonical: 'https://egyptcollections.com/'
  },
  keywords: [
    'المصرية للتحصيلات', 'ECC Collections', 'تحصيل الديون في مصر', 
    'Debt Collection Agency Egypt', 'Credit Reporting', 'Data Verification Egypt'
  ]
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://egyptcollections.com/#website',
        'url': 'https://egyptcollections.com/',
        'name': 'ECC Collections - المصرية للتحصيلات',
        'language': 'ar-EG' // إضافة مهمة
      },
      {
        // التغيير الجوهري هنا: حولناها من Organization لـ FinancialService
        // ده هيخليك تظهر في نتايج الموبايل والخرائط بقوة
        '@type': 'FinancialService', 
        '@id': 'https://egyptcollections.com/#organization',
        'name': 'ECC Collections - المصرية للتحصيلات',
        'url': 'https://egyptcollections.com/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://egyptcollections.com/icon.png',
          'width': 512,
          'height': 512
        },
        'image': 'https://egyptcollections.com/og-image.png',
        'priceRange': '$$', // مهمة جداً عشان جوجل يعرف إنك خدمة تجارية
        'description': 'إحنا في المصرية للتحصيلات (ECC) بنقدم حلول متكاملة للبنوك والشركات لاسترداد المديونيات والاستعلام الميداني بخبرة أكثر من 20 سنة.',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '30 شارع هارون، ميدان المساحة',
          'addressLocality': 'الدقي',
          'addressRegion': 'الجيزة',
          'postalCode': '12611',
          'addressCountry': 'EG'
        },
        // إضافة مواعيد العمل (جوجل موبايل بيعشق دي عشان يكتب "Open Now")
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
          'latitude': '30.0385',
          'longitude': '31.2185'
        },
        'sameAs': [
          'https://www.facebook.com/EgyptCollectionsCo',
          // اتأكد إن اللينكات دي شغالة وشيل أي لينك مش موجود عشان جوجل ميعاقبش الصفحة
        ],
        'areaServed': {
            '@type': 'Country',
            'name': 'Egypt'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}