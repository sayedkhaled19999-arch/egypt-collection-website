import HeroCarousel from '@/components/home/HeroCarousel';
import AboutCard from '@/components/home/AboutCard';
import CallToAction from '@/components/home/CallToAction';
import ValuesSection from '@/components/home/ValuesSection';
import PartnersSection from '@/components/home/PartnersSection';


export default function HomeContent() {
  return (
    <>
      <HeroCarousel />
      <AboutCard />
      <ValuesSection />
      <PartnersSection />
      <CallToAction />
    </>
  );
}
