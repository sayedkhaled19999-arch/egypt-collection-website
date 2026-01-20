'use client';

import Link from 'next/link';
import Image from 'next/image'; 
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

interface PartnersProps {
  lang: string;
  dict: any;
}

export default function PartnersSection({ lang, dict }: PartnersProps) {
  const [ref, inView] = useInView({ threshold: 0.05 });

  const banks = [
    { 
      name: lang === 'ar' ? 'بنك الأهلي المصري' : 'National Bank of Egypt', 
      src: '/banks/ahly.svg' 
    },
    { 
      name: lang === 'ar' ? 'بنك مصر' : 'Banque Misr', 
      src: '/banks/banquemisr.svg' 
    },
    { 
      name: lang === 'ar' ? 'بنك القاهرة' : 'Banque du Caire', 
      src: '/banks/cairobank.svg' 
    },
    { 
      name: lang === 'ar' ? 'بنك التعمير والاسكان' : 'Housing & Development Bank', 
      src: '/banks/housingbank.svg' 
    },
    { 
      name: lang === 'ar' ? 'بنك الامارات دبي الوطني' : 'Emirates NBD', 
      src: '/banks/NBDEmirate.svg' 
    },
    { 
      name: lang === 'ar' ? 'مصرف ابو ظبي الاسلامي' : 'Abu Dhabi Islamic Bank', 
      src: '/banks/Adib.svg' 
    },
  ];

  return (
    <section ref={ref} id="partners-section" className="py-16 md:py-20 bg-[#F4F4F4]">
      <div className="max-w-6xl mx-auto px-4">

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-14 mb-12 text-center">

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h2 variants={textVariants} className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4">
              {dict.title}
            </motion.h2>
            <motion.p variants={textVariants} className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed mb-8">
              {dict.desc}
            </motion.p>

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
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
                  
                  {/* التعديل هنا: استخدام fill بدلاً من width/height */}
                  <motion.div
                    className="w-28 h-28 mb-2 flex items-center justify-center relative"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Image 
                      src={src} 
                      alt={name} 
                      fill // يملأ الحاوية (w-28 h-28)
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // تحسين للأداء
                      className="object-contain p-1" // يحافظ على الأبعاد
                    />
                  </motion.div>
                  
                  <span className="text-[#353535] font-semibold text-center text-sm md:text-base px-2">
                    {name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={textVariants} className="mt-8 text-center">
              <Link
                href={`/${lang}/partners`}
                className="inline-block bg-[#2563EB] text-white font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:bg-[#1e4db7] hover:scale-105 hover:shadow-blue-500/30 hover:-translate-y-1"
              >
                {dict.btn}
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}