import { motion } from 'framer-motion';

const branches = [
  { name: 'القاهرة', address: 'شارع التحرير 123', phone: '0123456789' },
  { name: 'الإسكندرية', address: 'شارع الملك 45', phone: '0123456789' },
  { name: 'الجيزة', address: 'مول 6 أكتوبر', phone: '0123456789' },
];

export default function BranchesPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] px-4 md:px-16 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#2563EB]">
        فروعنا
      </h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {branches.map((b, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold mb-2">{b.name}</h3>
            <p className="text-gray-700 mb-2">{b.address}</p>
            <p className="text-gray-700">{b.phone}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
