import { Metadata } from 'next';
import AboutClient from './AboutClient';

// 1. تحسين الميتاداتا لزيادة الثقة والتميز (Authority & Branding)
export const metadata: Metadata = {
  // تم وضع البراند أولاً لضمان ظهور "ECC Collections" في نتائج البحث وفصلها عن المنافسين
  title: 'عن الشركة | ECC Collections - المصرية للتحصيلات - خبرة وتاريخ منذ 2001',
  description: 'تعرف على ECC Collections (المصرية للتحصيلات)، الشريك الأول لكبرى البنوك في مصر منذ 2001. فريق عمل محترف بقيادة المستشار وائل سويلم وتغطية شاملة لجميع المحافظات.',
  keywords: [
    'ECC Collections', 'المصرية للتحصيلات', 'من نحن', 'تاريخ المصرية للتحصيلات', 
    'ECC Collections Profile', 'سابقة أعمال', 'شركاء النجاح', 'المستشار وائل سويلم', 
    'فريق عمل ECC', 'إدارة مخاطر الائتمان', 'خدمات التعهيد البنكي', 'السرية والمصداقية',
    'تغطية جغرافية شاملة'
  ],
  alternates: {
    canonical: 'https://egyptcollections.com/about',
  },
  openGraph: {
    title: 'تاريخ من الخبرة منذ 2001 | ECC Collections - المصرية للتحصيلات',
    description: 'أكثر من 20 عاماً من التميز في مجال التحصيل والاستعلام الميداني في السوق المصري.',
    url: 'https://egyptcollections.com/about',
    siteName: 'ECC Collections - المصرية للتحصيلات', // موحد مع الصفحة الرئيسية
    locale: 'ar_EG',
    type: 'website',
  },
};

export default function Page() {
  // 2. تطوير الـ Schema لربط الشركة بمجالها وتثبيت أقدمية الشركة (2001)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'ECC Collections - المصرية للتحصيلات',
      'foundingDate': '2001', // التاريخ الذي يثبت أفضليتك على المنافسين
      'description': 'ECC Collections هي الشركة الرائدة والمستقلة في تقديم حلول التحصيل الميداني والاستعلام للبنوك والشركات في مصر منذ 2001.',
      'url': 'https://egyptcollections.com',
      'areaServed': 'Egypt',
      // إضافة المؤسس بشكل مفصل
      'founder': {
        '@type': 'Person',
        'name': 'Wael Swellam',
        'jobTitle': 'CEO & Founder',
        'description': 'المستشار القانوني وخبير التحصيل الائتماني بمصر.'
      },
      // أهم حتة: جوجل بيفهم منها تخصص الشركة إيه بالظبط وبيربطك بالكلمات المفتاحية
      'knowsAbout': [
        'Debt Collection',
        'Credit Investigation',
        'Field Verification',
        'Risk Management'
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}