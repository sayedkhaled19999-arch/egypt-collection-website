'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const banks = [
  { name: 'بنك الأهلي المصري', src: '/banks/ahly.svg' },
  { name: 'بنك مصر', src: '/banks/banquemisr.svg' },
  { name: 'بنك التعمير والاسكان', src: '/banks/housingbank.svg' },
  { name: 'بنك الامارات دبي الوطني', src: '/banks/NBDEmirate.svg' },
  { name: 'بنك القاهرة', src: '/banks/cairobank.svg' },
  { name: 'مصرف ابو ظبي الاسلامي', src: '/banks/Adib.svg' },
];

export default function PartnersPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollLeft = 0;
    const totalScrollWidth = scrollContainer.scrollWidth / 2; // لعمل loop

    const animate = () => {
      scrollLeft += 0.5; // سرعة السليدر (خفيفة وبطيئة)
      if (scrollLeft >= totalScrollWidth) scrollLeft = 0;
      scrollContainer.scrollTo({ left: scrollLeft, behavior: 'auto' });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="bg-[#F4F4F4] min-h-screen">

      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2563EB] mb-4">
          شركاؤنا المتميزون
        </h1>
        <p className="text-lg md:text-xl text-[#4B4B4B] max-w-3xl mx-auto mb-12">
          إحنا شغالين مع أفضل البنوك لضمان أعلى جودة في خدماتنا.
        </p>

        {/* Slider للبنوك */}
        <div 
          ref={scrollRef} 
          className="flex gap-8 overflow-hidden px-4 md:px-20 py-4"
        >
          {banks.concat(banks).map((bank, i) => (
            <div
              key={i}
              className="flex-none w-36 h-36 bg-white rounded-xl shadow-lg flex items-center justify-center cursor-pointer relative overflow-hidden group"
            >
              {/* Ripple effect عند الضغط */}
              <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-active:opacity-20 transition-opacity" />
              <Image 
                src={bank.src} 
                alt={bank.name} 
                width={80} 
                height={80} 
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Grid الكروت */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-8 text-center">
          البنوك اللي بنتعامل معاها
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {banks.map((bank, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="w-24 h-24 mb-4 relative">
                <Image 
                  src={bank.src} 
                  alt={bank.name} 
                  fill 
                  className="object-contain" 
                />
              </div>
              <h3 className="text-xl font-bold text-[#353535] transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-blue-600">
                {bank.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
