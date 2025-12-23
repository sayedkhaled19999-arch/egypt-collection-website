'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <motion.section
      className="py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white text-center rounded-3xl mx-4 md:mx-16 shadow-xl"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
        جاهز تبدأ معانا؟
      </h2>
      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
        انضم لفريقنا المتميز أو تعرف على خدماتنا بأعلى جودة وسرعة. كل شيء يبدأ بخطوة!
      </p>
      <Link
        href="/jobs"
        className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
      >
        قدم الآن
      </Link>
    </motion.section>
  );
}
