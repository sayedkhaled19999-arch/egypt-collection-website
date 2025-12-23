'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    bgImage: '/hero/slide1.jpg',
    link: '/about',
    linkText: 'اعرف أكثر عننا',
  },
  {
    title: 'شركائنا',
    description: 'نتعاون مع شركاء موثوقين لضمان أعلى جودة في خدماتنا.',
    bgImage: '/hero/slide2.jpg',
    link: '/partners',
    linkText: 'اعرف أكثر عن شركائنا',
  },
  {
    title: 'الوظائف المتاحة',
    description: 'لو عايز تنضم لفريقنا، شوف الفرص المتاحة وابدأ مشوارك معانا.',
    bgImage: '/hero/slide3.jpg',
    link: '/jobs',
    linkText: 'شوف الوظائف المتاحة',
  },
  {
    title: 'تواصل معنا',
    description: 'لو عندك أي استفسار أو ملاحظات، احنا دايمًا في خدمتك.',
    bgImage: '/hero/slide4.jpg',
    link: '/contact',
    linkText: 'تواصل معنا',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center text-center px-4"
          style={{
            backgroundImage: `url(${slides[current].bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 bg-black/30 p-4 md:p-6 rounded-lg max-w-[90%] md:max-w-xl"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 whitespace-normal">
              {slides[current].title}
            </h1>
            <p className="text-md md:text-lg text-white mb-4">{slides[current].description}</p>
            <Link
              href={slides[current].link}
              className="inline-block bg-[#2563EB] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#1e4db7] transition-colors"
            >
              {slides[current].linkText}
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        aria-label="السابق"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-3 shadow"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="التالي"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-3 shadow"
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </button>
    </div>
  );
}
