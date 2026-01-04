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
    // العنوان الرئيسي H1 - موحد وبسيط
    title: 'المصرية للتحصيلات (ECC) - لخدمات التحصيل والاستعلام',
    description: 'أكبر شركة في مصر متخصصة في التحصيل الميداني والاستعلام الائتماني.. شغلنا كله أمان ودقة في المواعيد.',
    bgImage: '/hero/Slide1.avif',
    link: '/about',
    linkText: 'اعرف أكتر عننا',
  },
  {
    title: 'شركاء النجاح مع المصرية للتحصيلات (ECC)',
    description: 'بنتعاون مع أكبر البنوك والشركات في مصر عشان نضمن لك أعلى مستوى من الجودة في تنفيذ كل الخدمات الميدانية.',
    bgImage: '/hero/Slide2.avif',
    link: '/partners',
    linkText: 'شوف شركاء النجاح',
  },
  {
    title: 'انضم لفريق المصرية للتحصيلات (ECC)',
    description: 'لو بتدور على فرصة حقيقية، شوف الوظائف المتاحة عندنا وابدأ مشوارك مع فريقنا دلوقتي.. بنكبر بيك.',
    bgImage: '/hero/Slide3.avif',
    link: '/jobs',
    linkText: 'شوف الوظائف المتاحة',
  },
  {
    title: 'تواصل مع المصرية للتحصيلات (ECC)',
    description: 'لو عندك أي سؤال أو محتاج استشارة، إحنا موجودين طول الوقت عشان نرد عليك ونساعدك بكل اللي تحتاجه.',
    bgImage: '/hero/Slide4.avif',
    link: '/contact',
    linkText: 'تواصل معانا',
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
      {/* ✅ LCP IMAGE OPTIMIZATION */}
      <Image
        src={slides[current].bgImage}
        alt={slides[current].title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        priority={current === 0} 
        quality={80} 
        className="object-cover"
        // إجبار المتصفح على تحميل أول صورة بأولوية قصوى
        fetchPriority={current === 0 ? "high" : "auto"}
      />
      
      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent" />

      {/* 🟢 Content Logic */}
      {/* 
          هنا الـ SEO الحقيقي: 
          أول سلايد بيظهر H1 في الـ Source Code فوراً عشان جوجل يشفشف الموقع صح.
      */}
      {current === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="relative z-10 bg-black/30 p-6 md:p-8 rounded-xl max-w-xl text-center">
            {/* 👑 الـ H1 الوحيد في الصفحة موجود هنا الآن */}
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
              {slides[0].title}
            </h1>
            <p className="text-md md:text-lg text-white mb-4">
              {slides[0].description}
            </p>
            <Link
              href={slides[0].link}
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform"
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
              {/* السلايدات التالية تستخدم h2 لعدم تكرار الـ H1 */}
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
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

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="السابق"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white rounded-full p-3 shadow-lg transition-colors z-20"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="التالي"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white rounded-full p-3 shadow-lg transition-colors z-20"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
    </section>
  );
}