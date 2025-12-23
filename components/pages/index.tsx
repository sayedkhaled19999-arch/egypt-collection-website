'use client';

import HeroCarousel from '@/components/home/HeroCarousel';
import AboutCard from '@/components/home/AboutCard';
import CallToAction from '@/components/home/CallToAction';
import ValuesSection from '@/components/home/ValuesSection';
import PartnersSection from '@/components/home/PartnersSection';
import SEO from '@/components/SEO';

export default function Home() {
  return (
    <>
      {/* ===== SEO ===== */}
      <SEO
        title="المصرية للتحصيلات – ECC Collections"
        description="أفضل خدمات التحصيل والاستعلام في مصر بسرعة واحترافية."
        image="/hero/slide1.jpg"
        url="https://ecc-collections.com"
      />

      {/* ===== Hero Carousel ===== */}
      <HeroCarousel />

      {/* ===== About / لمحة عن الشركة ===== */}
      <AboutCard />

      {/* ===== القيم / Values Section ===== */}
      <ValuesSection />

            {/* ===== القيم / PartnersSection ===== */}
      <PartnersSection />

      {/* ===== Call To Action ===== */}
      <CallToAction />

    </>
  );
}
