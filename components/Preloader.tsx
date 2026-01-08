'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

interface Slide {
  title: string;
  description: string;
  bgImage: string;
  link: string;
  linkText: string;
}

const slides: Slide[] = [
  { title: 'أهلاً بيك في المصرية للتحصيلات – ECC', description: 'خدمات مبتكرة وسريعة في كل ما يخص التحصيل والاستعلام.', bgImage: '/hero/Slide1.avif', link: '/about', linkText: 'اعرف أكثر عننا' },
  { title: 'شركائنا', description: 'نتعاون مع شركاء موثوقين لضمان أعلى جودة في خدماتنا.', bgImage: '/hero/Slide2.avif', link: '/Customers', linkText: 'اعرف أكثر عن شركائنا' },
  { title: 'الوظائف المتاحة', description: 'لو عايز تنضم لفريقنا، شوف الفرص المتاحة وابدأ مشوارك معانا.', bgImage: '/hero/Slide3.avif', link: '/jobs', linkText: 'شوف الوظائف المتاحة' },
  { title: 'تواصل معنا', description: 'لو عندك أي استفسار أو ملاحظات، احنا دايمًا في خدمتك.', bgImage: '/hero/Slide4.avif', link: '/contact', linkText: 'تواصل معنا' },
];

export default function PreloaderHeroOptimized() {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Animate Preloader
  useEffect(() => {
    // منع أي Scroll أثناء التحميل
    document.body.style.overflow = 'hidden';

    let start = Date.now();
    const duration = 1200;
    const animate = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(Math.floor(pct));
      if (pct < 100) requestAnimationFrame(animate);
      else {
        setFadeOut(true);
        setTimeout(() => {
          setShowCarousel(true);
          // السماح بالسكـرول بعد التحميل
          document.body.style.overflow = 'auto';
        }, 400);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  // Carousel auto slide
  useEffect(() => {
    if (!showCarousel) return;
    intervalRef.current = window.setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showCarousel]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const handlers = useSwipeable({ onSwipedLeft: nextSlide, onSwipedRight: prevSlide });

  return (
    <div className="relative w-full h-[400px] md:h-[520px] overflow-hidden">
      {/* Carousel جاهز في الخلفية */}
      {showCarousel && (
        <section {...handlers} className="absolute inset-0 w-full h-full">
          <Image
            src={slides[current].bgImage}
            alt={slides[current].title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={60}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent" />
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 flex items-center justify-center px-4">
              <motion.div initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -25, opacity: 0 }} transition={{ duration: 0.6 }} className="relative z-10 bg-black/30 p-6 md:p-8 rounded-xl max-w-xl text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">{slides[current].title}</h2>
                <p className="text-md md:text-lg text-white mb-4">{slides[current].description}</p>
                <Link href={slides[current].link} className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform">{slides[current].linkText}</Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <button onClick={prevSlide} aria-label="السابق" className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white rounded-full p-3 shadow-lg"><ChevronLeft className="w-6 h-6 text-black" /></button>
          <button onClick={nextSlide} aria-label="التالي" className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white rounded-full p-3 shadow-lg"><ChevronRight className="w-6 h-6 text-black" /></button>
        </section>
      )}

      {/* Preloader يغطي كل الصفحة بدون Navbar أو Scroll */}
      <AnimatePresence>
        {!showCarousel && (
          <motion.div initial={{ opacity: 1 }} animate={{ opacity: fadeOut ? 0 : 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
            <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8 animate-pulse">
              <Image src="/logo.webp" alt="الشركة المصرية للتحصيلات – ECC" fill className="object-contain" priority />
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="45" stroke="#2563EB" strokeWidth="10" fill="none" strokeDasharray={2 * Math.PI * 45} strokeDashoffset={(2 * Math.PI * 45 * (100 - progress)) / 100} strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-[#2563EB] mt-4 font-bold text-lg">{progress}%</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
