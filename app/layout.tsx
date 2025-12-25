
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientWrapper from '@/components/ClientWrapper';
import Head from 'next/head';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.collection.eg'),
  title: 'المصرية للتحصيلات – ECC Collections | خدمات التحصيل الميداني والتحقق من البيانات في مصر',
  description: 'المصرية للتحصيلات – ECC Collections تقدم أفضل خدمات التحصيل الميداني والاستعلام والتحقق من البيانات للعملاء في مصر منذ 2002. خدمات احترافية، سريعة وموثوقة.',
  keywords: [
    'تحصيل ميداني',
    'خدمات التحصيل',
    'ECC Collections',
    'استعلام ميداني',
    'الشركة المصرية للتحصيلات',
    'خدمات احترافية',
    'تحصيل في مصر'
  ],
  authors: [
    { name: 'Sayed Khaled', url: 'https://www.collection.eg' }
  ],
  openGraph: {
    title: 'المصرية للتحصيلات – ECC Collections',
    description: 'أفضل خدمات التحصيل الميداني والتحقق من البيانات للعملاء في مصر منذ 2002. خدمات احترافية، موثوقة وسريعة.',
    url: 'https://www.collection.eg',
    siteName: 'ECC Collections',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'المصرية للتحصيلات – ECC Collections'
      }
    ],
    locale: 'ar_EG',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المصرية للتحصيلات – ECC Collections',
    description: 'أفضل خدمات التحصيل الميداني والتحقق من البيانات للعملاء في مصر منذ 2002. خدمات احترافية، موثوقة وسريعة.',
    images: ['/og-image.png'],
    creator: '@ECC_Collections' // عدلت الـTwitter handle
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} flex flex-col min-h-screen`}>
        {/* ===== Canonical + Theme Color ===== */}
        <Head>
          <link rel="canonical" href="https://www.collection.eg" />
          <meta name="theme-color" content="#2563EB" />
        </Head>

        <Navbar />
        <ClientWrapper>
          <main className="flex-grow">{children}</main>
        </ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
