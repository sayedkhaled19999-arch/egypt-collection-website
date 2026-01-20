'use client';

import { useEffect } from 'react';
import { UserCheck, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion, Variants, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const textVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: 'easeOut' } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, type: 'spring', stiffness: 120 },
  }),
};

interface ValuesProps {
  lang: string;
  dict: any;
}

export default function ValuesSection({ lang, dict }: ValuesProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  const values = [
    {
      icon: <UserCheck className="w-10 h-10 text-[#2563EB]" />,
      title: dict.appearance,
      desc: dict.appearance_desc,
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-[#2563EB]" />,
      title: dict.commitment,
      desc: dict.commitment_desc,
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-[#2563EB]" />,
      title: dict.integrity,
      desc: dict.integrity_desc,
    },
  ];

  useEffect(() => {
    if (inView) controls.start('visible');
    else controls.start('hidden');
  }, [inView, controls]);

  return (
    <section ref={ref} className="py-16 flex justify-center bg-[#F4F4F4]">
      <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 max-w-6xl w-full">

        <motion.div initial="hidden" animate={controls} variants={textVariants}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-6 text-center">
            {dict.title}
          </h2>
          <p className="text-[#4B4B4B] text-lg md:text-xl mb-10 text-center">
            {dict.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(37,99,235,0.25)',
              }}
              whileTap={{ scale: 0.97 }}
              className="relative group flex flex-col items-center gap-4 p-6 bg-[#F4F4F4] shadow-md rounded-xl cursor-pointer overflow-hidden will-change-transform will-change-opacity"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
              <div className="relative z-10">{v.icon}</div>

              <h3 className="relative z-10 text-xl font-bold text-[#353535] transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-blue-600">
                {v.title}
              </h3>

              <p className="relative z-10 text-[#757575] text-sm text-center leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}