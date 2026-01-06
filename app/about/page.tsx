import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
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
    siteName: 'ECC Collections - المصرية للتحصيلات',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: 'https://egyptcollections.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ECC Collections - المصرية للتحصيلات',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'عن الشركة | ECC Collections',
    description: 'تعرف على تاريخ ECC Collections وخبرتها في التحصيل والاستعلام الميداني منذ 2001.',
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
      'max-snippet': -1
    }
  }
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'ECC Collections - المصرية للتحصيلات',
      'foundingDate': '2001',
      'description': 'ECC Collections هي الشركة الرائدة والمستقلة في تقديم حلول التحصيل الميداني والاستعلام للبنوك والشركات في مصر منذ 2001.',
      'url': 'https://egyptcollections.com/',
      'areaServed': 'Egypt',
      'founder': {
        '@type': 'Person',
        'name': 'Wael Swellam',
        'jobTitle': 'CEO & Founder',
        'description': 'المستشار القانوني وخبير التحصيل الائتماني بمصر.'
      },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutClient />
    </>
  );
}
