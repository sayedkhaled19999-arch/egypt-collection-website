'use client';

import Link from 'next/link';
import Image from 'next/image';
import { UserCheck, CheckCircle, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Slide {
  title: string;
  description: string;
  bgImage: string;
  link: string;
  linkText: string;
}

const slides: Slide[] = [
  {
    title: 'أهلاً بيك في المصرية للتحصيلات    ECC Collections',
    description: 'خدمات مبتكرة وسريعة في كل ما يخص التحصيل والاستعلام.',
    bgImage: '/hero/slide1.jpg',
    link: '/about',
    linkText: 'اعرف أكثر عننا',
  },
  {
    title: 'شركاؤنا',
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
    description: 'لو عندك أي استفسار أو ملاحظات، احنا هنا لمساعدتك.',
    bgImage: '/hero/slide4.jpg',
    link: '/contact',
    linkText: 'تواصل معنا',
  },
];

export default function HomeContent() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="bg-[#F4F4F4] text-[#353535]" dir="rtl">
      {/* ===== Hero Carousel ===== */}
      <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) =>
            index === current ? (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full flex flex-col justify-center items-center text-center px-4"
                style={{
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent"></div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                 className="relative z-10 bg-black/30 p-4 rounded-md max-w-[90%] md:max-w-xl">
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 break-words">{slide.title}</h1>
                  <p className="text-md md:text-lg text-white mb-4">{slide.description}</p>
                  <Link
                    href={slide.link}
                    className="inline-block bg-[#2563EB] text-white px-4 py-2 rounded-lg font-bold text-md hover:bg-[#1e4db7] transition-colors"
                  >
                    {slide.linkText}
                  </Link>
                </motion.div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 md:p-3 shadow"
          aria-label="السابق"
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 md:p-3 shadow"
          aria-label="التالي"
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </button>
      </div>

{/* ===== كارت لمحة عن الشركة محسّن مع أيقونات فوق النص وروابط ===== */}
<motion.section
  className="py-16 flex justify-center bg-[#F4F4F4]"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
    
    {/* النص والإحصائيات */}
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4">
        لمحة عن الشركة
      </h2>
      <p className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed mb-6">
        شركتنا دايمًا بتسعى للابتكار والتميز في تقديم أفضل خدمات التحصيل والاستعلام لعملائنا بطريقة بسيطة وواضحة.
      </p>

      <div className="flex gap-6 flex-wrap mt-6">
        {/* كارت شركائنا */}
        <Link
          href="/partners"
          className="flex flex-col items-center gap-2 p-5 bg-[#F4F4F4] shadow-md rounded-xl hover:scale-105 transition-transform duration-300 min-w-[150px]"
        >
          <UserCheck className="w-10 h-10 text-[#2563EB]" />
          <div className="text-2xl font-bold text-[#2563EB]">25</div>
          <div className="text-[#353535] text-sm">شركاؤنا</div>
        </Link>

        {/* كارت الفروع */}
        <Link
          href="/branches"
          className="flex flex-col items-center gap-2 p-5 bg-[#F4F4F4] shadow-md rounded-xl hover:scale-105 transition-transform duration-300 min-w-[150px]"
        >
          <CheckCircle className="w-10 h-10 text-[#2563EB]" />
          <div className="text-2xl font-bold text-[#2563EB]">5</div>
          <div className="text-[#353535] text-sm">فروعنا</div>
        </Link>
      </div>
    </div>

    {/* صورة رئيس الشركة */}
    <div className="flex flex-col items-center">
      <div className="relative w-[260px] h-[260px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
        <Image src="/ceo.png" alt="رئيس الشركة" fill className="object-cover" />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-[#353535]">وائل سويلم</h3>
        <p className="text-[#757575] text-sm">رئيس الشركة</p>
      </div>
    </div>

  </div>
</motion.section>

      {/* ===== دعوة للعمل ===== */}
      <motion.section
        className="py-16 md:py-20 bg-[#F4F4F4] text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#353535] mb-4">جاهز تنضم لينا؟</h2>
          <p className="text-xl text-[#757575] mb-6 max-w-2xl mx-auto leading-relaxed">
            دايمًا بندور على مواهب جديدة. شوف الفرص الوظيفية وابدأ رحلتك معانا.
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-[#2563EB] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#1e4db7] transition-colors shadow-lg"
          >
            قدم على وظيفة
          </Link>
        </div>
      </motion.section>

      {/* ===== القيم ===== */}
      <motion.section
        className="py-16 md:py-20 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#353535] mb-10 text-center">قيمنا</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-bold text-[#353535] mb-2">حسن المظهر</h3>
              <p className="text-[#757575] leading-relaxed">
                دايمًا نهتم بمظهرنا عشان نسيب انطباع كويس عند العميل
              </p>
            </div>

            <div className="text-center p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-bold text-[#353535] mb-2">الالتزام</h3>
              <p className="text-[#757575] leading-relaxed">
                نلتزم بوعدنا ونطبق أعلى معايير الجودة
              </p>
            </div>

            <div className="text-center p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-bold text-[#353535] mb-2">الأمانة</h3>
              <p className="text-[#757575] leading-relaxed">
                الأمانة في التعامل مع العملاء والزملاء جزء من قيمنا الأساسية
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
