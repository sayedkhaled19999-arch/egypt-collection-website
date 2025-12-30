import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { Metadata } from 'next'; 
import { Tajawal } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientWrapper from '@/components/ClientWrapper';

// إضافات Vercel
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
});

export const viewport = {
  themeColor: '#2563EB',
}

export const metadata: Metadata = {
  // الرابط الأساسي (ظبطه لما الدومين يشتغل 100%)
  metadataBase: new URL('https://egyptcollections.com'), 

  title: {
    default: 'المصرية للتحصيلات – ECC Collections | خدمات التحصيل الميداني',
    template: '%s | المصرية للتحصيلات – ECC Collections' 
  },
  
  description: 'المصرية للتحصيلات – ECC Collections تقدم أفضل خدمات التحصيل الميداني والاستعلام والتحقق من البيانات للعملاء في مصر منذ 2001. خدمات احترافية، سريعة وموثوقة.',
  
  // 👇👇👇 هنا ضفنا كود التفعيل لجوجل 👇👇👇
  verification: {
    google: 'tJklZHtOnBjimH3tU5LBDLpUpivNENAaf7L2ov_6V_E',
  },
  // 👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆

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
    { name: 'Sayed Khaled', url: 'https://www.egyptcollections.com' }
  ],

  alternates: {
    canonical: './',
  },

  openGraph: {
    title: 'المصرية للتحصيلات – ECC Collections',
    description: 'أفضل خدمات التحصيل الميداني والتحقق من البيانات للعملاء في مصر منذ 2001. خدمات احترافية، موثوقة وسريعة.',
    url: 'https://egyptcollections.com', 
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
    description: 'أفضل خدمات التحصيل الميداني والتحقق من البيانات للعملاء في مصر منذ 2001.',
    images: ['/og-image.png'],
    creator: '@ECC_Collections'
  },
  
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} flex flex-col min-h-screen`}>
        <Navbar />
        <ClientWrapper>
          <main className="flex-grow">{children}</main>
        </ClientWrapper>
        <Footer />
        
        <Analytics />
        <SpeedInsights />
        
      </body>
    </html>
  );
}