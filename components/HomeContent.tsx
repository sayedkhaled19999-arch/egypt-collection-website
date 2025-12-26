'use client';

import dynamic from 'next/dynamic';

// 1️⃣ استيراد عادي (Static Import) للهيرو عشان يحمل فوري
import HeroCarousel from '@/components/home/HeroCarousel';

// 2️⃣ باقي السكاشن Dynamic (زي ما هي) عشان نخفف الصفحة
const PartnersSection = dynamic(() => import('@/components/home/PartnersSection'), { ssr: false });
const BranchesSection = dynamic(() => import('@/components/home/BranchesSection'), { ssr: false });

// 3️⃣ السكاشن الخفيفة ممكن تسيبها استيراد عادي
import AboutCard from '@/components/home/AboutCard';
import ValuesSection from '@/components/home/ValuesSection';
import CallToAction from '@/components/home/JoinUsSection';

export default function HomeContent() {
  return (
    <>
      <HeroCarousel />
      <AboutCard />
      <ValuesSection />
      <PartnersSection />
      <BranchesSection />
      <CallToAction />
    </>
  );
}