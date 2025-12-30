import { Metadata } from 'next';
import PartnersClient from './PartnersClient';

export const metadata: Metadata = {
  title: 'شركائنا | المصرية للتحصيلات – ECC Collections',
  description: 'نفخر بشراكتنا مع كبرى البنوك والمؤسسات المالية في مصر: البنك الأهلي، بنك مصر، بنك القاهرة، والمزيد من البنوك . اكتشف قائمة عملاء ECC Collections.',
  keywords: [
    'شركاء النجاح', 'عملاء ECC', 'بنوك مصر', 'البنك الأهلي المصري', 
    'بنك مصر', 'شركات تحصيل', 'سابقة أعمال'
  ],
  alternates: {
    canonical: '/partners',
  },
  openGraph: {
    title: 'شركائنا - ECC Collections',
    description: 'قائمة شركاء النجاح من البنوك والمؤسسات المالية.',
    // 👇 الرابط المؤقت (Vercel) عشان يشتغل معاك دلوقتي
    url: 'https://www.egyptcollections.com/partners',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
    // 👇 إضافة الصورة الموحدة
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'شركاء النجاح - المصرية للتحصيلات',
      },
    ],
  },
};

export default function Page() {
  return <PartnersClient />;
}