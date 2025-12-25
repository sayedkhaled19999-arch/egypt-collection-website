'use client';

import dynamic from 'next/dynamic';
import SEO from '@/components/SEO';

// Dynamic imports للـSections الثقيلة
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
      {/* ===== SEO ===== */}
      <SEO
        title="الرئيسية | المصرية للتحصيلات – ECC Collections"
        description="اكتشف خدمات المصرية للتحصيلات – ECC Collections في التحصيل الميداني والاستعلام والتحقق من البيانات في مصر بسرعة واحترافية."
        image="/hero/slide1.AVIF" // استخدم WebP مضغوطة
        url="https://ecc-collections.com"
      />

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
