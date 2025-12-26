import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

// 1. إعدادات الـ SEO المتينة (بديل Head)
export const metadata: Metadata = {
  // بنستخدم absolute عشان نلغي الـ Template ونحط عنوان مميز وطويل للصفحة الرئيسية بس
  title: {
    absolute: 'المصرية للتحصيلات – ECC Collections | خدمات التحصيل الميداني والتحقق من البيانات في مصر'
  },
  description: 'المصرية للتحصيلات – ECC Collections تقدم أفضل خدمات التحصيل الميداني والاستعلام والتحقق من البيانات للعملاء في مصر منذ 2002. خدمات احترافية، سريعة وموثوقة.',
  keywords: [
    'تحصيل ميداني', 'خدمات التحصيل', 'ECC Collections', 
    'استعلام ميداني', 'الشركة المصرية للتحصيلات', 
    'خدمات احترافية', 'تحصيل في مصر', 'بنوك مصر'
  ],
  alternates: {
    canonical: 'https://www.collection.eg',
  },
  openGraph: {
    title: 'المصرية للتحصيلات – ECC Collections',
    description: 'أفضل خدمات التحصيل الميداني والتحقق من البيانات للعملاء في مصر منذ 2002.',
    url: 'https://www.collection.eg',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // تأكد إن الصورة دي موجودة في public
        width: 1200,
        height: 630,
        alt: 'المصرية للتحصيلات – ECC Collections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المصرية للتحصيلات – ECC Collections',
    description: 'خدمات التحصيل الميداني والتحقق من البيانات في مصر.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  // 2. كود Schema.org (عشان جوجل يعرف إن دي شركة Business)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Egyptian Collections Co. - ECC',
    url: 'https://www.collection.eg',
    logo: 'https://www.collection.eg/logo.webp', // تأكد من مسار اللوجو بتاعك
    sameAs: [
      'https://www.facebook.com/ECCCollections', // لو عندك صفحة فيسبوك حط اللينك الصح
      'https://www.linkedin.com/company/ecc-collections' // لو عندك لينكد إن
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+201000000000', // حط رقم الشركة الحقيقي هنا
      contactType: 'customer service',
      areaServed: 'EG',
      availableLanguage: ['Arabic', 'English']
    }
  };

  return (
    <>
      {/* حقن كود الـ Schema في الصفحة */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* محتوى الصفحة */}
      <HomeContent />
    </>
  );
}