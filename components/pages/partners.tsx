import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const partners = [
  { name: 'شركة أ', logo: '/partners/logo1.png' },
  { name: 'شركة ب', logo: '/partners/logo2.png' },
  { name: 'شركة ج', logo: '/partners/logo3.png' },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] px-4 md:px-16 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#2563EB]">
        شركائنا
      </h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {partners.map((p, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-32 h-32 mb-4">
              <Image src={p.logo} alt={p.name} fill className="object-contain" />
            </div>
            <h3 className="text-xl font-bold">{p.name}</h3>
            <Link
              href="#"
              className="mt-2 text-blue-600 font-semibold hover:underline"
            >
              معرفة أكثر
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
