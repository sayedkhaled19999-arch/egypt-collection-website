import HeroCarousel from '@/components/home/HeroCarousel';
import AboutCard from '@/components/home/AboutCard';
import CallToAction from '@/components/home/CallToAction';
import ValuesSection from '@/components/home/ValuesSection';


export default function HomeContent() {
  return (
    <>
      <HeroCarousel />
      <AboutCard />
      <CallToAction />
      <ValuesSection />
    </>
  );
}
