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
    bgImage: '/hero/Slide1.avif',
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
  const autoSlideRef = useRef<number | null>(null);

  // 🔁 سلايد تلقائي
  useEffect(() => {
    autoSlideRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
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
    <div
      {...handlers}
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden"
    >
      {/* ✅ صورة الخلفية – بدون blur */}
      <Image
        key={slides[current].bgImage}
        src={slides[current].bgImage}
        alt={slides[current].title}
        fill
        className="object-cover"
        priority={current === 0}
        fetchPriority={current === 0 ? 'high' : 'auto'}
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 bg-black/30 p-6 md:p-8 rounded-xl max-w-[90%] md:max-w-xl backdrop-blur-sm"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              {slides[current].title}
            </h1>
            <p className="text-md md:text-lg text-white mb-4">
              {slides[current].description}
            </p>
            <Link
              href={slides[current].link}
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg"
            >
              {slides[current].linkText}
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="السابق"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-3 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="التالي"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-3 shadow-lg"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
    </div>
  );
}
