'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const banks = [
  { name: 'بنك الأهلي المصري', src: '/banks/ahly.svg' },
  { name: 'بنك مصر', src: '/banks/banquemisr.svg' },
  { name: 'بنك التعمير والإسكان', src: '/banks/housingbank.svg' },
  { name: 'بنك الإمارات دبي الوطني', src: '/banks/NBDEmirate.svg' },
  { name: 'بنك القاهرة', src: '/banks/cairobank.svg' },
  { name: 'مصرف أبو ظبي الإسلامي', src: '/banks/Adib.svg' },
  // 👇 زوّد براحتك
];

export default function PartnersPage() {
  return (
    <motion.main
      className="min-h-screen bg-[#F4F4F4] py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* الهيدر */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 mb-14 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#2563EB] mb-4">
            شركاؤنا
          </h1>
          <p className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            نفخر بتعاوننا مع نخبة من أكبر وأقوى البنوك والمؤسسات المالية،
            وده بيساعدنا نقدم خدماتنا بأعلى جودة واحترافية.
          </p>
        </div>

        {/* شبكة الشركاء */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {banks.map((bank, i) => (
            <motion.div
              key={i}
              className="
                group bg-white rounded-2xl shadow-md p-6
                flex flex-col items-center justify-center
                cursor-pointer transition-all
              "
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.07,
                boxShadow: '0 20px 40px rgba(37,99,235,0.25)',
              }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                type: 'spring',
                stiffness: 120,
              }}
            >
              {/* الشعار */}
              <div className="relative w-28 h-28 mb-4">
                <Image
                  src={bank.src}
                  alt={bank.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* الاسم */}
              <h3
                className="
                  text-[#353535] font-bold text-center text-sm md:text-base
                  transition-all duration-300
                  group-hover:bg-clip-text
                  group-hover:text-transparent
                  group-hover:bg-gradient-to-r
                  group-hover:from-blue-400
                  group-hover:to-blue-600
                "
              >
                {bank.name}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.main>
  );
}
