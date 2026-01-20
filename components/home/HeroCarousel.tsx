'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

interface HeroProps {
  lang: string;
  dict: any; // هنا بنستقبل ترجمة قسم الـ Hero بس
}

export default function HeroCarousel({ lang, dict }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // البيانات بقت تيجي من الـ props (dict) بدل الهوك
  const slides = [
    {
      title: dict.slide1_title,
      description: dict.slide1_desc,
      bgImage: '/hero/Slide1.avif',
      link: `/${lang}/about`, // تعديل الرابط ليشمل اللغة
      linkText: dict.slide1_btn,
    },
    {
      title: dict.slide2_title,
      description: dict.slide2_desc,
      bgImage: '/hero/Slide2.avif',
      link: `/${lang}/partners`,
      linkText: dict.slide2_btn,
    },
    {
      title: dict.slide3_title,
      description: dict.slide3_desc,
      bgImage: '/hero/Slide3.avif',
      link: `/${lang}/jobs`,
      linkText: dict.slide3_btn,
    },
    {
      title: dict.slide4_title,
      description: dict.slide4_desc,
      bgImage: '/hero/Slide4.avif',
      link: `/${lang}/contact`,
      linkText: dict.slide4_btn,
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const startSlideTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 8000);
  }, [nextSlide]);

  const stopSlideTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startSlideTimer();
    return () => stopSlideTimer();
  }, [startSlideTimer, stopSlideTimer]);

  const handlers = useSwipeable({
    // عكس الاتجاه حسب اللغة اللي جاية من الـ Props
    onSwipedLeft: lang === 'ar' ? nextSlide : prevSlide,
    onSwipedRight: lang === 'ar' ? prevSlide : nextSlide,
    onTouchStartOrOnMouseDown: stopSlideTimer,
    onTouchEndOrOnMouseUp: startSlideTimer,
  });

  const ArrowIconNext = lang === 'ar' ? ChevronLeft : ChevronRight;
  const ArrowIconPrev = lang === 'ar' ? ChevronRight : ChevronLeft;

  return (
    <section
      {...handlers}
      className="relative w-full h-[450px] md:h-[550px] overflow-hidden group"
      onMouseEnter={stopSlideTimer}
      onMouseLeave={startSlideTimer}
    >
      <Image
        src={slides[current].bgImage}
        alt={slides[current].title}
        fill
        sizes="100vw"
        priority={current === 0} 
        quality={85} 
        className="object-cover transition-opacity duration-700"
        fetchPriority={current === 0 ? "high" : "auto"}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center px-4"
        >
          <div className="relative z-10 text-center max-w-3xl">
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              {slides[current].title}
            </h2>

            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
              {slides[current].description}
            </p>

            <Link
              href={slides[current].link}
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
            >
              {slides[current].linkText}
              {lang === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={lang === 'ar' ? prevSlide : nextSlide}
        aria-label="Previous"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
      >
        <ArrowIconPrev className="w-8 h-8" />
      </button>

      <button
        onClick={lang === 'ar' ? nextSlide : prevSlide}
        aria-label="Next"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
      >
        <ArrowIconNext className="w-8 h-8" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              startSlideTimer();
            }}
            aria-label={`Slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current ? 'w-8 bg-[#2563EB]' : 'w-2 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}