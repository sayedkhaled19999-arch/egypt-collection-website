'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  UserCheck,
  CheckCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

/* ================= Types ================= */
interface Slide {
  title: string;
  description: string;
  bgImage: string;
  link: string;
  linkText: string;
}

/* ================= Data ================= */
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

/* ================= Component ================= */
export default function HomeContent() {
  const [current, setCurrent] = useState(0);
  const [autoPlayKey, setAutoPlayKey] = useState(0);

  /* Auto Play */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlayKey]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setAutoPlayKey((k) => k + 1);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlayKey((k) => k + 1);
  };

  return (
    <div className="bg-[#F4F4F4] text-[#353535]" dir="rtl">

      {/* ===== Hero Carousel ===== */}
      <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden">
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
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 bg-black/30 p-4 md:p-6 rounded-lg max-w-[90%] md:max-w-xl"
            >
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {slides[current].title}
              </h1>
              <p className="text-md md:text-lg text-white mb-4">
                {slides[current].description}
              </p>
              <Link
                href={slides[current].link}
                className="inline-block bg-[#2563EB] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#1e4db7] transition-colors"
              >
                {slides[current].linkText}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <button
          onClick={prevSlide}
          aria-label="السابق"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 shadow"
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="التالي"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 shadow"
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* ===== لمحة عن الشركة ===== */}
      <motion.section
        className="py-16 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
          
          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4">
              لمحة عن الشركة
            </h2>
            <p className="text-[#4B4B4B] text-lg leading-relaxed mb-6">
              شركتنا دايمًا بتسعى للابتكار والتميز في تقديم أفضل خدمات التحصيل
              والاستعلام لعملائنا بطريقة بسيطة وواضحة.
            </p>

            <div className="flex gap-6 flex-wrap mt-6">
              <Link
                href="/partners"
                className="flex flex-col items-center gap-2 p-6 bg-[#F4F4F4] shadow-md rounded-xl hover:scale-105 transition min-w-[170px]"
              >
                <UserCheck className="w-10 h-10 text-[#2563EB]" />
                <div className="text-2xl font-bold text-[#2563EB]">25</div>
                <div className="text-sm">شركائنا</div>
              </Link>

              <Link
                href="/branches"
                className="flex flex-col items-center gap-2 p-6 bg-[#F4F4F4] shadow-md rounded-xl hover:scale-105 transition min-w-[170px]"
              >
                <CheckCircle className="w-10 h-10 text-[#2563EB]" />
                <div className="text-2xl font-bold text-[#2563EB]">5</div>
                <div className="text-sm">فروعنا</div>
              </Link>
            </div>
          </div>

          {/* CEO */}
          <div className="flex flex-col items-center">
            <div className="relative w-[260px] h-[260px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/ceo.png"
                alt="رئيس الشركة"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold">وائل سويلم</h3>
            <p className="text-sm text-gray-500">رئيس الشركة</p>
          </div>
        </div>
      </motion.section>

      {/* ===== دعوة للعمل ===== */}
      <motion.section
        className="py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4">جاهز تنضم لينا؟</h2>
        <p className="text-xl text-gray-500 mb-6 max-w-2xl mx-auto">
          دايمًا بندور على مواهب جديدة. شوف الفرص الوظيفية وابدأ رحلتك معانا.
        </p>
        <Link
          href="/jobs"
          className="inline-block bg-[#2563EB] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1e4db7]"
        >
          قدم على وظيفة
        </Link>
      </motion.section>

      {/* ===== القيم ===== */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-10">قيمنا</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <div className="text-center p-6">
            <UserCheck className="w-10 h-10 mx-auto text-[#2563EB] mb-4" />
            <h3 className="text-xl font-bold mb-2">حسن المظهر</h3>
            <p className="text-gray-500">
              دايمًا نهتم بمظهرنا عشان نسيب انطباع كويس
            </p>
          </div>

          <div className="text-center p-6">
            <CheckCircle className="w-10 h-10 mx-auto text-[#2563EB] mb-4" />
            <h3 className="text-xl font-bold mb-2">الالتزام</h3>
            <p className="text-gray-500">
              نلتزم بوعدنا ونطبق أعلى معايير الجودة
            </p>
          </div>

          <div className="text-center p-6">
            <ShieldCheck className="w-10 h-10 mx-auto text-[#2563EB] mb-4" />
            <h3 className="text-xl font-bold mb-2">الأمانة</h3>
            <p className="text-gray-500">
              الأمانة أساس تعاملنا مع العملاء والزملاء
            </p>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
