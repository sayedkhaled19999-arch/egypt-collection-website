import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

// 1. إعدادات الـ SEO الخاصة بالصفحة الرئيسية (الأقوى)
export const metadata: Metadata = {
  title: {
    absolute: 'المصرية للتحصيلات (ECC) | خدمات التحصيل الميداني والاستعلام الائتماني في مصر'
  },
  description: 'المصرية للتحصيلات – ECC Collections الخيار الأول للبنوك والشركات في مصر لخدمات التحصيل الميداني، الاستعلام الائتماني، وتحديث البيانات. دقة، سرعة، والتزام بالقانون.',
  keywords: [
    // كلمات أساسية
    'تحصيل ميداني', 'شركة تحصيل ديون', 'ECC Collections', 
    'الشركة المصرية للتحصيلات', 'استعلام بنكي', 'استعلام ميداني',
    // كلمات باللهجة المصرية وسوق العمل
    'استرداد مديونيات', 'تحصيل محافظ بنكية', 'مناديب تحصيل', 
    'تحديث بيانات العملاء', 'شركات الاوت سورس في مصر',
    // أماكن الخدمة
    'تحصيل في القاهرة', 'خدمات بنكية مصر', 'الجيزة', 'الاسكندرية'
  ],
  alternates: {
    canonical: 'https://www.egyptcollections.com',
  },
  openGraph: {
    title: 'المصرية للتحصيلات – ECC Collections | حلول التحصيل المتكاملة',
    description: 'شريكك الاستراتيجي في التحصيل الميداني والاستعلام. نغطي كافة محافظات مصر بخبرة تتجاوز 20 عاماً.',
    url: 'https://www.egyptcollections.com',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // الصورة هتلقط الدومين من layout.tsx
        width: 1200,
        height: 630,
        alt: 'المصرية للتحصيلات – ECC Collections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المصرية للتحصيلات – ECC Collections',
    description: 'خدمات التحصيل الميداني والتحقق من البيانات بأعلى معايير الجودة في مصر.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  // 2. كود Schema.org المطور (LocalBusiness + ProfessionalService)
  // ده بيخلي جوجل يعرف مكانك وخدماتك بالتفصيل
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService', // أدق من Organization للخدمات
    name: 'الشركة المصرية للتحصيلات - ECC Collections',
    url: 'https://www.egyptcollections.com',
    logo: 'https://www.egyptcollections.com/logo.webp', // تأكد إن الصورة دي موجودة
    image: 'https://www.egyptcollections.com/og-image.png',
    description: 'شركة رائدة في مجال التحصيل الميداني والاستعلام الائتماني في جمهورية مصر العربية.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Giza', // عدل المحافظة لو مختلف
      addressCountry: 'EG',
      streetAddress: '6 October City' // يفضل تكتب العنوان بالتفصيل هنا
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '30.0444', // دي إحداثيات عامة للقاهرة/الجيزة، يفضل تحط إحداثيات مكتبك بدقة
      longitude: '31.2357'
    },
    telephone: '+201110600280',
    priceRange: '$$', // مؤشر للسعر (متوسط)
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday'
        ],
        opens: '09:00',
        closes: '17:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/EgyptCollectionsCo',
      'https://www.linkedin.com/company/ecc-collections'
    ],
    // تعريف الخدمات بشكل صريح لجوجل
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات التحصيل والاستعلام',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'التحصيل الميداني (Field Collection)'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'الاستعلام الائتماني (Credit Investigation)'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'التحقق من البيانات (Data Verification)'
          }
        }
      ]
    }
  };

  return (
    <>
      {/* حقن كود الـ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* محتوى الصفحة الرئيسي */}
      <HomeContent />
    </>
  );
}