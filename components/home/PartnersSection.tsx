'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const banks = [
  { name: 'بنك الأهلي المصري', src: '/banks/ahly.svg' },
  { name: 'بنك مصر', src: '/banks/banquemisr.svg' },
  { name: 'بنك التعمير والاسكان', src: '/banks/housingbank.svg' },
  { name: 'بنك الامارات دبي الوطني', src: '/banks/NBDEmirate.svg' },
  { name: 'بنك القاهرة', src: '/banks/cairobank.svg' },
  { name: 'مصرف ابو ظبي الاسلامي', src: '/banks/Adib.svg' },
];

export default function PartnersSection() {
  return (
    <motion.section
      className="py-16 md:py-20 bg-[#F4F4F4]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* كارت لمحة عن شركائنا */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-14 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4">
            شركائنا
          </h2>
          <p className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed mb-8">
            نتعاون مع أفضل البنوك لضمان أعلى جودة في خدماتنا.
          </p>

          {/* شبكة البنوك داخل الكارت */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 md:gap-8">
            {banks.map(({ name, src }, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center justify-center h-48 bg-[#F4F4F4] rounded-2xl shadow-md transition-transform duration-500 cursor-default"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 120,
                }}
              >
                {/* شعار البنك مع Hover effect */}
                <motion.div
                  className="w-28 h-28 mb-2 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <img
                    src={src}
                    alt={name}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <span className="text-[#353535] font-semibold text-center text-sm md:text-base">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* زر الانتقال لصفحة شركائنا */}
          <div className="mt-8 text-center">
            <Link
              href="/partners"
              className="inline-block bg-[#2563EB] text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-bold text-sm md:text-lg hover:bg-[#1e4db7] transition-colors shadow-lg"
            >
              اعرف أكثر عن شركائنا
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
