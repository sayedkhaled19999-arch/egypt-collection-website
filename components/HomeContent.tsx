import HeroCarousel from '@/components/home/HeroCarousel';
import AboutCard from '@/components/home/AboutCard';
import CallToAction from '@/components/home/JoinUsSection';
import ValuesSection from '@/components/home/ValuesSection';
import PartnersSection from '@/components/home/PartnersSection';
import BranchesSection from '@/components/home/BranchesSection';


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
