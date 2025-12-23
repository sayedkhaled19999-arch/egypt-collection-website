'use client';

import { UserCheck, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  {
    icon: <UserCheck className="w-10 h-10 text-[#2563EB]" />,
    title: 'حسن المظهر',
    desc: 'نهتم بالمظهر العام لأنه بيعكس احترافيتنا قدام العملاء.',
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-[#2563EB]" />,
    title: 'الالتزام',
    desc: 'الالتزام في المواعيد وجودة الشغل أساس نجاحنا.',
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-[#2563EB]" />,
    title: 'الأمانة',
    desc: 'الأمانة والشفافية في التعامل جزء لا يتجزأ من قيمنا.',
  },
];

export default function ValuesSection() {
  return (
    <motion.section
      className="py-16 flex justify-center bg-[#F4F4F4]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 max-w-6xl w-full">

        {/* العنوان */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-6 text-center">
          قيمنا
        </h2>

        <p className="text-[#4B4B4B] text-lg md:text-xl mb-10 text-center">
          القيم دي هي الأساس اللي بنبني عليه كل تعاملاتنا وشغلنا.
        </p>

        {/* الكروت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="relative group flex flex-col items-center gap-4 p-6 bg-[#F4F4F4] shadow-md rounded-xl cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(37,99,235,0.25)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                type: 'spring',
                stiffness: 120,
              }}
            >
              {/* Ripple / shine effect */}
              <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-300 rounded-xl" />

              {/* الايقونة */}
              <div className="relative z-10">
                {v.icon}
              </div>

              {/* العنوان بلمعة */}
              <h3
                className="
                  relative z-10 text-xl font-bold text-[#353535]
                  transition-all duration-300
                  group-hover:bg-clip-text
                  group-hover:text-transparent
                  group-hover:bg-gradient-to-r
                  group-hover:from-blue-400
                  group-hover:to-blue-600
                "
              >
                {v.title}
              </h3>

              {/* الوصف */}
              <p className="relative z-10 text-[#757575] text-sm text-center leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
