'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
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
    title: 'الشركة المصرية للتحصيلات (ECC) - لخدمات التحصيل والاستعلام',
    description: 'أكبر شركة في مصر متخصصة في التحصيل الميداني والاستعلام الائتماني.. شغلنا كله أمان ودقة في المواعيد.',
    bgImage: '/hero/Slide1.avif',
    link: '/about',
    linkText: 'اعرف أكتر عننا',
  },
  {
    title: 'شركاء الشركة المصرية للتحصيلات (ECC)',
    description: 'بنتعاون مع أكبر البنوك والشركات في مصر عشان نضمن لك أعلى مستوى من الجودة في تنفيذ كل الخدمات الميدانية.',
    bgImage: '/hero/Slide2.avif',
    link: '/partners', // ✅ تعديل الرابط لحروف صغيرة
    linkText: 'شوف شركاء النجاح',
  },
  {
    title: 'انضم لفريق عمل الشركة المصرية للتحصيلات (ECC)',
    description: 'لو بتدور على فرصة حقيقية، شوف الوظائف المتاحة عندنا وابدأ مشوارك مع فريقنا دلوقتي.. بنكبر بيك.',
    bgImage: '/hero/Slide3.avif',
    link: '/jobs',
    linkText: 'شوف الوظائف المتاحة',
  },
  {
    title: 'تواصل مع الشركة المصرية للتحصيلات (ECC)',
    description: 'لو عندك أي سؤال أو محتاج استشارة، إحنا موجودين طول الوقت عشان نرد عليك ونساعدك بكل اللي تحتاجه.',
    bgImage: '/hero/Slide4.avif',
    link: '/contact',
    linkText: 'تواصل معانا',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // 1. تشغيل وإيقاف العداد بذكاء
  const startSlideTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 8000); // 8 ثواني وقت مناسب
  }, [nextSlide]);

  const stopSlideTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startSlideTimer();
    return () => stopSlideTimer();
  }, [startSlideTimer, stopSlideTimer]);

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    onTouchStartOrOnMouseDown: stopSlideTimer, // وقف عند اللمس
    onTouchEndOrOnMouseUp: startSlideTimer,    // شغل لما يسيب
  });

  return (
    <section
      {...handlers}
      className="relative w-full h-[450px] md:h-[550px] overflow-hidden group"
      onMouseEnter={stopSlideTimer} // وقف عند وقوف الماوس
      onMouseLeave={startSlideTimer} // شغل لما الماوس يمشي
      dir="rtl"
    >
      {/* الخلفية */}
      <Image
        src={slides[current].bgImage}
        alt={slides[current].title}
        fill
        sizes="100vw"
        priority={current === 0} 
        quality={85} 
        className="object-cover transition-opacity duration-700" // نعومة في تغيير الصور
        fetchPriority={current === 0 ? "high" : "auto"}
      />
      
      {/* طبقة التظليل */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* المحتوى النصي */}
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
            {/* 
               ✅ الحل السحري للـ SEO والـ Animation:
               بنحدد نوع التاج ديناميكياً.
               لو الشريحة الأولى: h1
               أي شريحة تانية: h2
               والاتنين بياخدوا نفس الستايل ونفس الأنيميشن.
            */}
            {current === 0 ? (
              <h1 className="text-2xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {slides[current].title}
              </h1>
            ) : (
              <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {slides[current].title}
              </h2>
            )}

            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
              {slides[current].description}
            </p>

            <Link
              href={slides[current].link}
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
            >
              {slides[current].linkText}
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* الأسهم (تظهر عند الهوفر فقط في الشاشات الكبيرة) */}
      <button
        onClick={prevSlide}
        aria-label="السابق"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="التالي"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* المؤشرات (Dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              startSlideTimer(); // إعادة تشغيل التايمر عند الضغط
            }}
            aria-label={`الشريحة ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current ? 'w-8 bg-[#2563EB]' : 'w-2 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}