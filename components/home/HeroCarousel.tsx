'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

interface Slide {
  title: string;
  description: string;
  bgImage: string;
  link: string;
  linkText: string;
}

const slides: Slide[] = [
  {
    title: 'أهلاً بيك في المصرية للتحصيلات – ECC Collections',
    description: 'خدمات مبتكرة وسريعة في كل ما يخص التحصيل والاستعلام.',
    bgImage: '/hero/Slide1.avif', // ✅ LCP IMAGE
    link: '/about',
    linkText: 'اعرف أكثر عننا',
  },
  {
    title: 'شركائنا',
    description: 'نتعاون مع شركاء موثوقين لضمان أعلى جودة في خدماتنا.',
    bgImage: '/hero/Slide2.avif',
    link: '/partners',
    linkText: 'اعرف أكثر عن شركائنا',
  },
  {
    title: 'الوظائف المتاحة',
    description: 'لو عايز تنضم لفريقنا، شوف الفرص المتاحة وابدأ مشوارك معانا.',
    bgImage: '/hero/Slide3.avif',
    link: '/jobs',
    linkText: 'شوف الوظائف المتاحة',
  },
  {
    title: 'تواصل معنا',
    description: 'لو عندك أي استفسار أو ملاحظات، احنا دايمًا في خدمتك.',
    bgImage: '/hero/Slide4.avif',
    link: '/contact',
    linkText: 'تواصل معنا',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // 🔁 Auto slide
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  return (
    <section
      {...handlers}
      className="relative w-full h-[400px] md:h-[520px] overflow-hidden"
    >
      {/* ✅ LCP IMAGE أول سلايد */}
      <Image
        src={slides[0].bgImage}
        alt={slides[0].title}
        fill
        sizes="100vw"
        quality={70}
        priority
        fetchPriority="high"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent" />

      {/* نصوص أول سلايد ثابتة لتقليل LCP */}
      {current === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="relative z-10 bg-black/30 p-6 md:p-8 rounded-xl max-w-xl text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              {slides[0].title}
            </h1>
            <p className="text-md md:text-lg text-white mb-4">
              {slides[0].description}
            </p>
            <Link
              href={slides[0].link}
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow-lg"
            >
              {slides[0].linkText}
            </Link>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 bg-black/30 p-6 md:p-8 rounded-xl max-w-xl text-center"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                {slides[current].title}
              </h2>
              <p className="text-md md:text-lg text-white mb-4">
                {slides[current].description}
              </p>
              <Link
                href={slides[current].link}
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform"
              >
                {slides[current].linkText}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        aria-label="السابق"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white rounded-full p-3 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="التالي"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white rounded-full p-3 shadow-lg"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
    </section>
  );
}
