'use client';

import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

interface Props { lang: string; dict: any; }

export default function GoogleReviews({ lang, dict }: Props) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <FaGoogle className="w-12 h-12 text-[#2563EB] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4">{dict.title}</h2>
          <p className="text-[#4B4B4B] text-lg mb-8">{dict.desc}</p>

          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <p className="text-2xl font-bold text-[#333] mb-2">4.8 / 5.0</p>
          <p className="text-sm text-[#4B4B4B] mb-8">{dict.rating}</p>

          <a
            href="https://search.google.com/local/reviews?lid=123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1d4ed8] transition-all shadow-lg hover:scale-105"
          >
            <ExternalLink className="w-5 h-5" />
            {dict.view_all}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
