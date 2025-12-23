'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

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

export default function BranchesSection() {
  return (
    <motion.section
      id="branches-section" // ← هذا السطر مهم
      className="py-16 md:py-20 bg-[#F4F4F4] dark:bg-[#1f1f1f]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white dark:bg-[#2c2c2c] rounded-3xl shadow-2xl p-10 md:p-14 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] dark:text-[#4f9cf9] mb-4 flex items-center justify-center gap-3">
            <MapPin className="w-8 h-8 text-blue-500" />
            فروعنا
          </h2>
          <p className="text-[#4B4B4B] dark:text-[#ccc] text-lg md:text-xl leading-relaxed mb-12">
            فروعنا متوفرة في جميع أنحاء الجمهورية. اضغط على أي كارت لمعرفة الموقع على خرائط جوجل.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {branches.map(({ name, address, mapsUrl }, i) => (
              <motion.a
                key={i}
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block p-6 rounded-2xl shadow-lg bg-white dark:bg-[#3a3a3a] cursor-pointer overflow-hidden group"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 15px 30px rgba(0, 123, 255, 0.3)',
                  transition: { type: 'spring', stiffness: 150 }
                }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Ripple effect عند الضغط */}
                <span className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-600 opacity-0 group-active:opacity-20 transition-opacity" />

                <div className="mt-0 text-center">
                  {/* العنوان مع gradient hover effect */}
                  <h3
                    className="text-xl font-bold text-[#353535] dark:text-[#eee] truncate transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-blue-600 inline-flex items-center justify-center gap-2"
                    title={name}
                  >
                    <MapPin className="w-5 h-5 text-blue-500" />
                    {name}
                  </h3>
                  <p
                    className="text-[#757575] dark:text-[#ccc] mt-1 truncate"
                    title={address}
                  >
                    {address}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
