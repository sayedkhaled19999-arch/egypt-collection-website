'use client';

import dynamic from 'next/dynamic';
import HeroCarousel from '@/components/home/HeroCarousel';

// باقي الـ imports زي ما هي...
const PartnersSection = dynamic(() => import('@/components/home/PartnersSection'), { ssr: false });
const BranchesSection = dynamic(() => import('@/components/home/BranchesSection'), { ssr: false });
import AboutCard from '@/components/home/AboutCard';
import ValuesSection from '@/components/home/ValuesSection';
import CallToAction from '@/components/home/JoinUsSection';

export default function HomeContent() {
  return (
    <>
      {/* 
         🔥 حركة المعلمين:
         ده H1 جوجل بيشوفه ويعرف إن ده عنوان الموقع الرئيسي،
         بس المستخدم مش بيشوفه عشان التصميم ميبوظش.
         كلاس 'sr-only' ده موجود في Tailwind بيخفيه من الشاشة بس بيسيبه لمحركات البحث.
      */}
      <h1 className="sr-only">
        المصرية للتحصيلات – ECC Collections | خدمات التحصيل الميداني والاستعلام الائتماني
      </h1>

      <HeroCarousel />
      <AboutCard />
      <ValuesSection />
      <PartnersSection />
      <BranchesSection />
      <CallToAction />
    </>
  );
}