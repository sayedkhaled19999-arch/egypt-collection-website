'use client';

import Link from 'next/link';
import Image from 'next/image';
import { UserCheck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutCard() {
  return (
    <motion.section
      className="py-16 flex justify-center bg-[#F4F4F4]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* النص والإحصائيات */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4">
            لمحة عن الشركة
          </h2>
          <p className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed mb-6">
            شركتنا دايمًا بتسعى للابتكار والتميز في تقديم أفضل خدمات التحصيل والاستعلام لعملائنا بطريقة بسيطة وواضحة.
          </p>

          <div className="flex gap-6 flex-wrap mt-6">
            {/* كارت شركائنا */}
            <Link
              href="/partners"
              className="flex flex-col items-center gap-2 p-5 bg-[#F4F4F4] shadow-md rounded-xl hover:scale-105 transition-transform duration-300 min-w-[150px]"
            >
              <UserCheck className="w-10 h-10 text-[#2563EB]" />
              <div className="text-2xl font-bold text-[#2563EB]">25</div>
              <div className="text-[#353535] text-sm">شركائنا</div>
            </Link>

            {/* كارت الفروع */}
            <Link
              href="/branches"
              className="flex flex-col items-center gap-2 p-5 bg-[#F4F4F4] shadow-md rounded-xl hover:scale-105 transition-transform duration-300 min-w-[150px]"
            >
              <CheckCircle className="w-10 h-10 text-[#2563EB]" />
              <div className="text-2xl font-bold text-[#2563EB]">5</div>
              <div className="text-[#353535] text-sm">فروعنا</div>
            </Link>
          </div>
        </div>

        {/* صورة رئيس الشركة */}
        <div className="flex flex-col items-center">
          <div className="relative w-[260px] h-[260px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
            <Image src="/ceo.png" alt="رئيس الشركة" fill className="object-cover" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-bold text-[#353535]">وائل سويلم</h3>
            <p className="text-[#757575] text-sm">رئيس الشركة</p>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
