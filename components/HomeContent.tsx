'use client';

import dynamic from 'next/dynamic';
// شلنا import SEO من هنا خلاص

// Dynamic imports للـSections الثقيلة (ممتاز للسرعة)
const HeroCarousel = dynamic(() => import('@/components/home/HeroCarousel'), { ssr: false });
const PartnersSection = dynamic(() => import('@/components/home/PartnersSection'), { ssr: false });
const BranchesSection = dynamic(() => import('@/components/home/BranchesSection'), { ssr: false });

// Sections خفيفة يمكن استيرادها مباشرة
import AboutCard from '@/components/home/AboutCard';
import ValuesSection from '@/components/home/ValuesSection';
import CallToAction from '@/components/home/JoinUsSection';

export default function HomeContent() {
  return (
    <>
      {/* شلنا مكون SEO من هنا لأن الصفحة الرئيسية مسكته خلاص */}

      {/* ===== Hero Carousel ===== */}
      <HeroCarousel />

      {/* ===== About / لمحة عن الشركة ===== */}
      <AboutCard />

      {/* ===== القيم الأساسية ===== */}
      <ValuesSection />

      {/* ===== الشركاء / PartnersSection ===== */}
      <PartnersSection />

      {/* ===== الفروع / BranchesSection ===== */}
      <BranchesSection />

      {/* ===== Call To Action ===== */}
      <CallToAction />
    </>
  );
}