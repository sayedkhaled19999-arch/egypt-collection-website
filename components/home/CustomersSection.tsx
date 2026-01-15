'use client';

import Link from 'next/link';
// 1. ضيفنا استيراد Image هنا
import Image from 'next/image'; 
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const banks = [
  { name: 'بنك الأهلي المصري', src: '/banks/ahly.svg' },
  { name: 'بنك مصر', src: '/banks/banquemisr.svg' },
  { name: 'بنك القاهرة', src: '/banks/cairobank.svg' },
  { name: 'بنك التعمير والاسكان', src: '/banks/housingbank.svg' },
  { name: 'بنك الامارات دبي الوطني', src: '/banks/NBDEmirate.svg' },
  { name: 'مصرف ابو ظبي الاسلامي', src: '/banks/Adib.svg' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: 'easeOut' } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, type: 'spring', stiffness: 120 }
  })
};

export default function CustomersSection() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section ref={ref} id="customers-section" className="py-16 md:py-20 bg-[#F4F4F4]">
      <div className="max-w-6xl mx-auto px-4">

        {/* الكارت الأبيض ثابت */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-14 mb-12 text-center">

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* العنوان والجملة */}
            <motion.h2 variants={textVariants} className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4">
              شركائنا
            </motion.h2>
            <motion.p variants={textVariants} className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed mb-8">
              نتعاون مع أفضل البنوك لضمان أعلى جودة في خدماتنا.
            </motion.p>

            {/* شبكة البنوك */}
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 md:gap-8" variants={containerVariants}>
              {banks.map(({ name, src }, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(37,99,235,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center justify-center h-48 bg-[#F4F4F4] rounded-2xl shadow-md cursor-pointer overflow-hidden relative group"
                >
                  {/* shine overlay */}
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
                  <motion.div
                    className="w-28 h-28 mb-2 flex items-center justify-center relative"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {/* 2. هنا التعديل: استبدال img بـ Image */}
                    <Image 
                      src={src} 
                      alt={name} 
                      width={112} // 112px عشان يتناسب مع w-28
                      height={112} // 112px عشان يتناسب مع h-28
                      className="object-contain"
                    />
                  </motion.div>
                  <span className="text-[#353535] font-semibold text-center text-sm md:text-base">
                    {name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* زر الانتقال */}
            <motion.div variants={textVariants} className="mt-8 text-center">
              <Link
                href="/customers"
                className="inline-block bg-[#2563EB] text-white font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:bg-[#1e4db7] hover:scale-105 hover:shadow-blue-500/30 hover:-translate-y-1"
              >
                اعرف أكثر عن شركائنا
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}