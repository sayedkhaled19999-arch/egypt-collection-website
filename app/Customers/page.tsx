import { Metadata } from 'next';
import CustomersClient from './CustomersClient';

export const metadata: Metadata = {
  // 1. العنوان: استخدمنا absolute وعكسنا الترتيب (عربي الأول)
  title: {
    absolute: 'شركاء النجاح | المصرية للتحصيلات - ECC Collections'
  },
  description: 'تفتخر ECC Collections بسابقة أعمال قوية مع كبرى البنوك في مصر منذ 2001. نحن الوكيل المعتمد للبنك الأهلي، بنك مصر، وبنك القاهرة. ثقة تبنيها سنوات من الاحترافية.',
  keywords: [
    'ECC Collections', 
    'شركاء النجاح', 
    'عملاء المصرية للتحصيلات', 
    'بنوك مصر', 
    'البنك الأهلي المصري', 
    'بنك مصر', 
    'بنك القاهرة',
    'شركات تحصيل ديون معتمدة',
    'سابقة أعمال ECC',
    'Debt Collection Customers Egypt'
  ],
  // 2. الكانونيكال: صلحنا الرابط خليناه كامل
  alternates: { 
    canonical: 'https://egyptcollections.com/Customers' 
  },
  openGraph: {
    title: 'شركاء وعملاء ECC Collections - سابقة أعمال نفخر بها',
    description: 'قائمة شركاء النجاح من أكبر البنوك والمؤسسات المالية التي تثق في خدماتنا الميدانية منذ 2001.',
    url: 'https://egyptcollections.com/Customers',
    // 3. اسم الموقع الموحد
    siteName: 'المصرية للتحصيلات - ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: 'https://egyptcollections.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'شركاء النجاح - المصرية للتحصيلات',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شركاء النجاح | المصرية للتحصيلات - ECC Collections',
    description: 'تعرف على البنوك والمؤسسات التي تثق في خدماتنا الميدانية في مصر.',
    images: ['https://egyptcollections.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. تعريف الصفحة (WebPage)
      {
        '@type': 'WebPage',
        '@id': 'https://egyptcollections.com/Customers/#webpage',
        'url': 'https://egyptcollections.com/Customers',
        'name': 'شركاء النجاح | المصرية للتحصيلات - ECC Collections',
        'isPartOf': {
          '@id': 'https://egyptcollections.com/#website'
        },
        'about': {
          '@id': 'https://egyptcollections.com/#organization'
        },
        'breadcrumb': {
          '@id': 'https://egyptcollections.com/Customers/#breadcrumb'
        }
      },
      // 2. فتات الخبز (Breadcrumbs)
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://egyptcollections.com/Customers/#breadcrumb',
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
            'name': 'شركاء النجاح',
            'item': 'https://egyptcollections.com/Customers'
          }
        ]
      },
      // 3. بيانات الشركة الكاملة (FinancialService)
      // دي اللي هتجيب العلامة الخضراء بتاعة Local Business
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
        'description': 'الشركة المصرية للتحصيلات (ECC) هي الرائدة في خدمات التحصيل الميداني والاستعلام الائتماني في مصر منذ عام 2001.',
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
          'latitude': '30.0385',
          'longitude': '31.2185'
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
      <CustomersClient />
    </>
  );
}