'use client';

import Image from 'next/image';
import { UserCheck, CheckCircle, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { branches } from './BranchesSection';
import { banks } from '../data/banks';
import CountUp from 'react-countup';
import { motion, Variants, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function AboutCard() {
  const router = useRouter();
  const cardMaxHeight = '130px';
  const cardMinHeight = '130px';

  const cards = [
    {
      icon: <UserCheck className="w-10 h-10 text-[#2563EB]" />,
      number: banks.length, // هنا العدد يتحدث تلقائيًا
      label: 'شركائنا',
      href: '/partners',
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-[#2563EB]" />,
      number: branches.length || 0,
      label: 'فروعنا',
      href: '#branches-section',
    },
  ];

  const handleCardClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(href);
    }
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
    else controls.start('hidden');
  }, [inView, controls]);

  const innerVariants: Variants = {
    hidden: {
      opacity: 0,
      x: typeof window !== 'undefined' && window.innerWidth > 768 ? 100 : 0,
      y: typeof window !== 'undefined' && window.innerWidth <= 768 ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative bg-[#F4F4F4]">
      <section ref={ref} className="py-16 mt-20 mb-20 flex justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
          
          {/* النص والكروت مع animation */}
          <motion.div initial="hidden" animate={controls} variants={innerVariants} className="flex flex-col items-start w-full">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-6 h-6 text-[#2563EB]" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB]">
                لمحة عن الشركة
              </h2>
            </div>

            <p className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed mb-6">
              شركتنا بتسعى دايمًا للابتكار وتقديم خدمات التحصيل والاستعلام بأفضل طريقة ممكنة وبشكل واضح للجميع.
            </p>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 w-full" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}>
              {cards.map((c, i) => (
                <motion.div
                  key={i}
                  className="relative group flex flex-col items-center gap-2 p-4 bg-[#F4F4F4] shadow-md rounded-xl cursor-pointer overflow-hidden will-change-transform will-change-opacity"
                  style={{ minHeight: cardMinHeight, maxHeight: cardMaxHeight }}
                  onClick={() => handleCardClick(c.href)}
                  variants={innerVariants}
                  whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(37,99,235,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-xl" />
                  <div className="relative z-10">{c.icon}</div>
                  <div className="text-2xl font-bold relative z-10 gradient-text transition-all duration-300">
                    {inView ? <CountUp end={c.number} duration={2.5} redraw={true} /> : 0}
                  </div>
                  <div className="text-sm font-bold relative z-10 gradient-text transition-all duration-300">
                    {c.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* صورة رئيس الشركة مع animation */}
          <motion.div initial="hidden" animate={controls} variants={innerVariants} transition={{ delay: 0.5 }} className="flex flex-col items-center mt-10 md:mt-0">
            <div className="relative w-[260px] h-[260px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <Image src="/ceo.png" alt="رئيس الشركة" fill className="object-cover" />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-[#353535]">وائل سويلم</h3>
              <p className="text-[#757575] text-sm">رئيس الشركة</p>
            </div>
          </motion.div>

        </div>
      </section>

      <style jsx>{`
        .gradient-text {
          background: none;
          -webkit-background-clip: text;
          -webkit-text-fill-color: #353535;
        }
        .group:hover .gradient-text {
          background: linear-gradient(to right, #3b82f6, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
