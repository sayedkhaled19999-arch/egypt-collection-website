'use client';

import { motion, Variants, useAnimation } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export const branches = [
  {
    name: 'المقر الرئيسي',
    address: '30شارع هارون - ميدان المساحه - الدقى - الدور السابع',
    mapsUrl: 'https://maps.app.goo.gl/CcmDDN7XqEvbE5Rj6'
  },
  {
    name: 'فرع المنوفية',
    address: 'برج أحمد الدبور شارع الشهيد عبدالمنعم حمزة- الدور الخامس - أمام مصلحة الجوازات - شبين الكوم - المنوفية',
    mapsUrl: 'https://maps.app.goo.gl/dqg9eb1wJUgkLkL78'
  },
  {
    name: 'فرع البحيرة',
    address: 'برج جراند زمزم - الدور السادس - بجوار محكمة إيتاي البارود - مركز إيتاي البارود - البحيرة',
    mapsUrl: 'https://maps.app.goo.gl/33a6cXxX7X8bxSZ3A'
  },
  {
    name: 'فرع المنيا',
    address: 'شارع أحمد ماهر تقاطع شارع الحسيني البحري الدور الثالث علوي - أمام كبابجي المحمدي - قسم المنيا - محافظة المنيا',
    mapsUrl: 'https://maps.app.goo.gl/o7DP2AMWaXiR17V29'
  },
  {
    name: 'فرع الإسماعيلية',
    address: '2شارع بحريى تقاطع شارع رضا - عريشة مصر - امام استاد الاسماعلية واعلى سوبر ماركت بيم - الدور الثانى - برج الهادى',
    mapsUrl: 'https://maps.app.goo.gl/9gCpoCBsBEi4nE4v5'
  },
  {
    name: 'فرع قنا',
    address: 'ميدان الساعة - شارع مصطفي كامل - بجوار كشك اخر ساعة - عمارة رقم 4 الدور الثالث علوي',
    mapsUrl: 'https://maps.app.goo.gl/4tEakTRTCuUeDNuw5'
  }
];

const textVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: 'easeOut' } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, type: 'spring', stiffness: 120 }
  })
};

export default function BranchesSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
    else controls.start('hidden');
  }, [inView, controls]);

  return (
    <section ref={ref} id="branches-section" className="py-16 md:py-20 bg-[#F4F4F4] dark:bg-[#1f1f1f]">
      <div className="max-w-6xl mx-auto px-4">

        {/* الكارت الأبيض ثابت */}
        <div className="bg-white dark:bg-[#2c2c2c] rounded-3xl shadow-2xl p-10 md:p-14 mb-12 text-center">

          {/* العنوان والجملة */}
          <motion.div initial="hidden" animate={controls} variants={textVariants}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] dark:text-[#4f9cf9] mb-4 flex items-center justify-center gap-3">
              <MapPin className="w-8 h-8 text-blue-500" />
              فروعنا
            </h2>
            <p className="text-[#4B4B4B] dark:text-[#ccc] text-lg md:text-xl leading-relaxed mb-12">
              فروعنا متوفرة في جميع أنحاء الجمهورية. اضغط على أي كارت لمعرفة الموقع على خرائط جوجل.
            </p>
          </motion.div>

          {/* كروت الفروع */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {branches.map((branch, i) => (
              <motion.a
                key={i}
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block p-6 rounded-2xl shadow-lg bg-white dark:bg-[#3a3a3a] cursor-pointer overflow-hidden group"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={controls}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0,123,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-600 opacity-0 group-active:opacity-20 transition-opacity" />

                <div className="mt-0 text-center">
                  <h3
                    className="text-xl font-bold text-[#353535] dark:text-[#eee] truncate transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-blue-600 inline-flex items-center justify-center gap-2"
                    title={branch.name}
                  >
                    <MapPin className="w-5 h-5 text-blue-500" />
                    {branch.name}
                  </h3>
                  <p className="text-[#757575] dark:text-[#ccc] mt-1 truncate" title={branch.address}>
                    {branch.address}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
