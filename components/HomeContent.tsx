// --- START OF FILE components/HomeContent.tsx ---

'use client';

import dynamic from 'next/dynamic';
import HeroCarousel from '@/components/home/HeroCarousel';
import AboutCard from '@/components/home/AboutCard';
import ValuesSection from '@/components/home/ValuesSection';
import CallToAction from '@/components/home/JoinUsSection';
// استيراد PartnersSection بشكل مباشر عشان نمررله الـ Props بسهولة
import PartnersSection from '@/components/home/PartnersSection';

// التحميل الديناميكي لباقي الأقسام
const BranchesSection = dynamic(() => import('@/components/home/BranchesSection'), { 
  loading: () => <div className="h-60 bg-gray-50 animate-pulse rounded-lg my-8" />
});

interface HomeContentProps {
  lang: string;
  dict: any; // القاموس الكامل
}

export default function HomeContent({ lang, dict }: HomeContentProps) {
  return (
    <>
      {/* تمرير الترجمة الخاصة بكل سكشن فقط */}
      
      {/* 1. السلايدر */}
      <HeroCarousel lang={lang} dict={dict.hero} />
      
      {/* 2. كارت من نحن */}
      <AboutCard lang={lang} dict={dict.aboutCard} />
      
      {/* 3. القيم */}
      <ValuesSection lang={lang} dict={dict.values} />
      
      {/* 4. الشركاء */}
      <PartnersSection lang={lang} dict={dict.partners} />
      
      {/* 5. الفروع */}
      <BranchesSection lang={lang} dict={dict.branches} />
      
      {/* 6. التوظيف */}
      <CallToAction lang={lang} dict={dict.joinUs} />
    </>
  );
}