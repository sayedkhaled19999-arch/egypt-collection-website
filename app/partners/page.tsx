import { Metadata } from 'next';
import PartnersClient from './PartnersClient';

export const metadata: Metadata = {
  title: 'شركاء النجاح وعملاء ECC Collections | المصرية للتحصيلات',
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
    'Debt Collection Partners Egypt'
  ],
  alternates: { canonical: '/partners' },
  openGraph: {
    title: 'شركاء وعملاء ECC Collections - سابقة أعمال نفخر بها',
    description: 'قائمة شركاء النجاح من أكبر البنوك والمؤسسات المالية التي تثق في خدماتنا الميدانية منذ 2001.',
    url: 'https://egyptcollections.com/partners',
    siteName: 'ECC Collections - المصرية للتحصيلات',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: 'https://egyptcollections.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'شركاء النجاح - ECC Collections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شركاء النجاح | ECC Collections - المصرية للتحصيلات',
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
    '@type': 'Organization',
    name: 'ECC Collections - المصرية للتحصيلات',
    url: 'https://egyptcollections.com',
    logo: 'https://egyptcollections.com/og-image.png',
    foundingDate: '2001',
    sameAs: [
      'https://www.facebook.com/EgyptCollectionsCo',
      'https://www.linkedin.com/company/ecc-collections'
    ],
    member: [
      {
        '@type': 'Organization',
        name: 'البنك الأهلي المصري',
        url: 'https://www.alahlyeg.com'
      },
      {
        '@type': 'Organization',
        name: 'بنك مصر',
        url: 'https://www.banquemisr.com'
      },
      {
        '@type': 'Organization',
        name: 'بنك القاهرة',
        url: 'https://www.bankofcairo.com'
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PartnersClient />
    </>
  );
}
