'use client';

import dynamic from 'next/dynamic';
import HeroCarousel from '@/components/home/HeroCarousel';

// المكونات التي يتم تحميلها بشكل ديناميكي لتحسين السرعة
const PartnersSection = dynamic(() => import('@/components/home/PartnersSection'), { ssr: false });
const BranchesSection = dynamic(() => import('@/components/home/BranchesSection'), { ssr: false });
import AboutCard from '@/components/home/AboutCard';
import ValuesSection from '@/components/home/ValuesSection';
import CallToAction from '@/components/home/JoinUsSection';

export default function HomeContent() {
  return (
    <>
      {/* 
         ✅ تم تحديث هذا الجزء:
         بما أن المكون <HeroCarousel /> يحتوي بالداخل على وسم <h1> للعنوان الرئيسي،
         قمنا بإلغاء الـ <h1> المخفي هنا لمنع تكرار الوسم، 
         وهذا هو الحل لمشكلة (More than one h1 tag) في Bing و Google.
      */}

      <HeroCarousel />
      <AboutCard />
      <ValuesSection />
      <PartnersSection />
      <BranchesSection />
      <CallToAction />
    </>
  );
}