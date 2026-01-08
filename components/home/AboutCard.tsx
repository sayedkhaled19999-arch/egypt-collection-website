'use client';

import Image from 'next/image';
import Link from 'next/link';
import { UserCheck, CheckCircle, Info } from 'lucide-react';
import { branches } from './BranchesSection';
import { banks } from '../data/banks';
import CountUp from 'react-countup';
// 1. استيراد Variants هنا 👇
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function AboutCard() {
  const cards = [
    {
      icon: <UserCheck className="w-10 h-10 text-[#2563EB]" />,
      number: banks.length,
      label: 'شركاء النجاح',
      href: '#customers-section',
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-[#2563EB]" />,
      number: branches.length || 0,
      label: 'فروعنا',
      href: '#branches-section',
    },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  // 2. تحديد النوع هنا بـ : Variants 👇
  // ده بيعرف TypeScript إن 'easeOut' قيمة مسموح بيها
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: 'easeOut' } 
    },
  };

  // وهنا كمان 👇
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="relative bg-[#F4F4F4] w-full">
      <section ref={ref} className="py-12 md:py-16 flex justify-center px-4">
        
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center overflow-hidden">
          
          {/* النص والكروت */}
          <motion.div 
            initial="hidden" 
            animate={controls} 
            variants={containerVariants} 
            className="flex flex-col items-start w-full"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-3">
              <Info className="w-6 h-6 text-[#2563EB]" />
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#2563EB]">
                لمحة عن الشركة
              </h2>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-[#4B4B4B] text-lg leading-relaxed mb-8">
              شركتنا بتسعى دايمًا للابتكار وتقديم خدمات التحصيل والاستعلام بأفضل طريقة ممكنة وبشكل واضح للجميع.
              نحن نجمع بين الخبرة الطويلة والتكنولوجيا الحديثة.
            </motion.p>

            {/* شبكة الكروت */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              {cards.map((c, i) => (
                <Link 
                  key={i} 
                  href={c.href}
                  className="block w-full"
                >
                  <motion.div
                    className="group relative flex flex-col items-center justify-center gap-3 p-6 bg-[#F8F9FA] border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-lg rounded-2xl cursor-pointer transition-all duration-300 h-full"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                      {c.icon}
                    </div>

                    <div className="text-3xl font-bold text-[#353535] group-hover:text-[#2563EB] transition-colors">
                      {inView ? <CountUp end={c.number} duration={2.5} /> : 0}
                    </div>

                    <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                      {c.label}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </motion.div>

          {/* صورة رئيس الشركة */}
          <motion.div 
            initial="hidden" // عدلناها لتستخدم Variants
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } }
            }}
            className="flex flex-col items-center justify-center mt-8 md:mt-0"
          >
            <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full border-8 border-[#F4F4F4] shadow-2xl overflow-hidden group">
              <Image 
                src="/ceo.png" 
                alt="المستشار وائل سويلم - رئيس مجلس الإدارة" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 280px, 320px"
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold text-[#353535]">المستشار/ وائل سويلم</h3>
              <p className="text-[#2563EB] font-medium mt-1">رئيس مجلس الإدارة</p>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}