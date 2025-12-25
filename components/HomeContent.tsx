import HeroCarousel from '@/components/home/HeroCarousel';
import AboutCard from '@/components/home/AboutCard';
import CallToAction from '@/components/home/JoinUsSection';
import ValuesSection from '@/components/home/ValuesSection';
import PartnersSection from '@/components/home/PartnersSection';
import BranchesSection from '@/components/home/BranchesSection';
import SEO from '@/components/SEO';

export default function HomeContent() {
  return (
    <>
      <SEO
        title="الرئيسية | المصرية للتحصيلات – ECC Collections"
        description="اكتشف خدمات المصرية للتحصيلات – ECC Collections في التحصيل الميداني والاستعلام والتحقق من البيانات في مصر."
      />
      <HeroCarousel />
      <AboutCard />
      <ValuesSection />
      <PartnersSection />
      <BranchesSection />
      <CallToAction />
    </>
  );
}