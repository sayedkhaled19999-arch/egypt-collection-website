import { Metadata } from "next";
import JobsClient from "./JobsClient";

export const metadata: Metadata = {
  title: 'وظائف خالية | انضم لفريق المصرية للتحصيلات (ECC) - مرتبات وعمولات',
  description: 'عايز شغل بجد ومستقبل مضمون؟ المصرية للتحصيلات ECC تفتح باب التعيين. مطلوب محصلين (ميداني/مكتبي) ومدخلين بيانات. مرتبات مجزية + عمولات يومية + تأمينات. بدون أي رسوم للتقديم.',
  keywords: [
    'وظائف خالية', 'شغل في الجيزة', 'فرص عمل للشباب', 'وظائف مصر',
    'مطلوب محصلين', 'مندوب تحصيل ميداني', 'شغل كول سنتر', 'مدخل بيانات',
    'وظائف بدون رسوم', 'شغل بمرتب ثابت', 'عمولات مجزية',
    'ECC Collections', 'المصرية للتحصيلات', 'التوظيف'
  ],
  alternates: { canonical: '/jobs' },
  openGraph: {
    title: 'فرصة شغل في المصرية للتحصيلات | ECC Collections',
    description: 'مطلوب رجالة تسد في الشغل! مرتبات ثابتة وعمولات وتأمين اجتماعي. التعيين فوري وبدون أي مصاريف إدارية. قدم دلوقتي.',
    url: 'https://egyptcollections.com/jobs',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    images: [{
      url: 'https://egyptcollections.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'وظائف المصرية للتحصيلات - انضم لفريقنا'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'وظائف المصرية للتحصيلات | انضم لفريق المحترفين',
    description: 'فرص عمل حقيقية: محصلين، مدخل بيانات. بدون رسوم + تدريب مدفوع الأجر.',
    images: ['https://egyptcollections.com/og-image.png'],
    creator: '@ECCCollections'
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'وظائف شركة ECC للتحصيلات',
    description: 'قائمة الوظائف المتاحة في الشركة المصرية للتحصيلات. نوفر بيئة عمل احترافية، تدريب، وتدرج وظيفي.',
    url: 'https://egyptcollections.com/jobs',
    provider: {
      '@type': 'Organization',
      name: 'ECC Collections',
      logo: 'https://egyptcollections.com/og-image.png',
      sameAs: [
        "https://www.facebook.com/EgyptCollectionsCo",
        "https://www.linkedin.com/company/ecc-collections"
      ]
    },
    about: {
      '@type': 'Thing',
      name: 'مميزات العمل',
      description: 'رواتب مجزية، عمولات شهرية، تأمينات اجتماعية، تدريب مدفوع الأجر، فرص ترقية.'
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <JobsClient />
    </>
  );
}
