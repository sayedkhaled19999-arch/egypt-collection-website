'use client';

import { motion, Variants, useAnimation } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

// تعريف بيانات الفروع وتصديرها عشان AboutCard بيستخدمها
export const branches = [
  {
    nameAr: 'المقر الرئيسي',
    nameEn: 'Headquarters',
    addressAr: '30 شارع هارون - ميدان المساحه - الدقى - الدور السابع',
    addressEn: '30 Haroun St, El Mesaha Sq, Dokki, 7th Floor',
    mapsUrl: 'https://maps.app.goo.gl/CcmDDN7XqEvbE5Rj6'
  },
  {
    nameAr: 'فرع المنوفية',
    nameEn: 'Monufia Branch',
    addressAr: 'برج أحمد الدبور شارع الشهيد عبدالمنعم حمزة- الدور الخامس - أمام مصلحة الجوازات - شبين الكوم - المنوفية',
    addressEn: 'Ahmed El Dabour Tower, Abdel Moneim Hamza St, 5th Floor, opposite Passport Office, Shebin El Kom',
    mapsUrl: 'https://maps.app.goo.gl/dqg9eb1wJUgkLkL78'
  },
  {
    nameAr: 'فرع البحيرة',
    nameEn: 'Beheira Branch',
    addressAr: 'برج جراند زمزم - الدور السادس - بجوار محكمة إيتاي البارود - مركز إيتاي البارود - البحيرة',
    addressEn: 'Grand Zamzam Tower, 6th Floor, beside Itay El Baroud Court, Itay El Baroud',
    mapsUrl: 'https://maps.app.goo.gl/33a6cXxX7X8bxSZ3A'
  },
  {
    nameAr: 'فرع المنيا',
    nameEn: 'Minya Branch',
    addressAr: 'شارع أحمد ماهر تقاطع شارع الحسيني البحري الدور الثالث علوي - أمام كبابجي المحمدي - قسم المنيا - محافظة المنيا',
    addressEn: 'Ahmed Maher St & El Husseini El Bahary St intersection, 3rd Floor, opposite El Mohamady Kababji, Minya',
    mapsUrl: 'https://maps.app.goo.gl/o7DP2AMWaXiR17V29'
  },
  {
    nameAr: 'فرع الإسماعيلية',
    nameEn: 'Ismailia Branch',
    addressAr: '2 شارع بحريى تقاطع شارع رضا - عريشة مصر - امام استاد الاسماعلية واعلى سوبر ماركت بيم - الدور الثانى - برج الهادى',
    addressEn: '2 Bahary St & Reda St, Arishat Misr, opposite Ismailia Stadium, above BIM Market, 2nd Floor, El Hady Tower',
    mapsUrl: 'https://maps.app.goo.gl/9gCpoCBsBEi4nE4v5'
  },
  {
    nameAr: 'فرع قنا',
    nameEn: 'Qena Branch',
    addressAr: 'ميدان الساعة - شارع مصطفي كامل - بجوار كشك اخر ساعة - عمارة رقم 4 الدور الثالث علوي',
    addressEn: 'El Sa\'a Sq, Mostafa Kamel St, beside Akher Sa\'a Kiosk, Building 4, 3rd Floor',
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

interface BranchesProps {
  lang: string;
  dict: any;
}

export default function BranchesSection({ lang, dict }: BranchesProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
    else controls.start('hidden');
  }, [inView, controls]);

  return (
    <section ref={ref} id="branches-section" className="py-16 md:py-20 bg-[#F4F4F4]">
      <div className="max-w-6xl mx-auto px-4">

        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 mb-12 text-center">

          <motion.div initial="hidden" animate={controls} variants={textVariants}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4 flex items-center justify-center gap-3">
              <MapPin className="w-8 h-8 text-blue-500" />
              {dict.title}
            </h2>
            <p className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed mb-12">
              {dict.desc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {branches.map((branch, i) => (
              <motion.a
                key={i}
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block p-6 rounded-2xl shadow-md bg-[#F4F4F4] cursor-pointer overflow-hidden group"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={controls}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0,123,255,0.2)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 rounded-2xl bg-white opacity-0 group-active:opacity-20 transition-opacity" />

                <div className="mt-0 text-center">
                  <h3
                    className="text-xl font-bold text-[#353535] transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-blue-600 inline-flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-5 h-5 text-blue-500" />
                    {lang === 'ar' ? branch.nameAr : branch.nameEn}
                  </h3>
                  
                  <p className="text-[#666] mt-2 text-sm leading-relaxed" dir={lang === 'en' ? 'ltr' : 'rtl'}>
                    {lang === 'ar' ? branch.addressAr : branch.addressEn}
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