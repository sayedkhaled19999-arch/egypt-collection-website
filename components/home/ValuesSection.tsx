'use client';

import { UserCheck, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ValuesSection() {
  const values = [
    {
      icon: <UserCheck className="w-8 h-8 text-[#2563EB]" />,
      title: 'حسن المظهر',
      desc: 'نهتم بمظهرنا لترك انطباع جيد',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-[#2563EB]" />,
      title: 'الالتزام',
      desc: 'نلتزم بأعلى معايير الجودة',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#2563EB]" />,
      title: 'الأمانة',
      desc: 'الأمانة في التعامل جزء من قيمنا',
    },
  ];

  return (
    <motion.section
      className="py-16 md:py-24 bg-[#F4F4F4]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-12 text-center">
          قيمنا
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="group flex flex-col items-center gap-4 p-6 bg-white shadow-xl rounded-2xl cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.06, y: -5, boxShadow: '0px 25px 40px rgba(0,0,0,0.25)' }}
            >
              <motion.div
                className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {v.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-[#353535]">{v.title}</h3>
              <p className="text-[#757575] text-center leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
