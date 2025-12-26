import { Metadata } from 'next';
import PartnersClient from './PartnersClient';

export const metadata: Metadata = {
  title: 'شركائنا | المصرية للتحصيلات – ECC Collections',
  description: 'نفخر بشراكتنا مع كبرى البنوك والمؤسسات المالية في مصر: البنك الأهلي، بنك مصر، CIB، والمزيد. اكتشف قائمة عملاء ECC Collections.',
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
    url: 'https://www.collection.eg/partners',
    siteName: 'ECC Collections',
    locale: 'ar_EG',
    type: 'website',
  },
};

export default function Page() {
  return <PartnersClient />;
}