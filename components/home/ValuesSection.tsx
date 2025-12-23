'use client';

import { UserCheck, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ValuesSection() {
  const values = [
    { icon: <UserCheck className="w-8 h-8 text-[#2563EB]" />, title: 'حسن المظهر', desc: 'نهتم بمظهرنا لترك انطباع جيد' },
    { icon: <CheckCircle className="w-8 h-8 text-[#2563EB]" />, title: 'الالتزام', desc: 'نلتزم بأعلى معايير الجودة' },
    { icon: <ShieldCheck className="w-8 h-8 text-[#2563EB]" />, title: 'الأمانة', desc: 'الأمانة في التعامل جزء من قيمنا' },
  ];

  return (
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
          {values.map((v, i) => (
            <div key={i} className="text-center p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center mx-auto mb-4">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-[#353535] mb-2">{v.title}</h3>
              <p className="text-[#757575] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
