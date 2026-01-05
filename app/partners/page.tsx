import { Metadata } from 'next';
import PartnersClient from './PartnersClient';

export const metadata: Metadata = {
  // تم وضع البراند أولاً للفصل عن المنافسين وتأكيد الهوية
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
  
  // الرابط الأصلي (بدون www) - ثابت كما هو للتأكيد على جوجل
  alternates: {
    canonical: 'https://egyptcollections.com/partners',
  },
  
  openGraph: {
    title: 'شركاء وعملاء ECC Collections - سابقة أعمال نفخر بها',
    description: 'قائمة شركاء النجاح من أكبر البنوك والمؤسسات المالية التي تثق في خدماتنا الميدانية منذ 2001.',
    url: 'https://egyptcollections.com/partners',
    siteName: 'ECC Collections - المصرية للتحصيلات', // موحد مع الصفحة الرئيسية
    locale: 'ar_EG',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'شركاء النجاح | ECC Collections - المصرية للتحصيلات',
    description: 'تعرف على البنوك والمؤسسات التي تثق في خدماتنا الميدانية في مصر.',
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
  return <PartnersClient />;
}