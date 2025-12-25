'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  return (
    <main className="bg-[#F4F4F4] min-h-screen">
      {/* ===== Hero ===== */}
      <section className="py-24 px-4 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold text-[#2563EB] mb-4"
        >
          تواصل معنا
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="text-lg md:text-xl text-[#4B4B4B] max-w-3xl mx-auto"
        >
          إحنا دايمًا موجودين للإجابة على أي استفساراتك. املأ النموذج أو استخدم طرق التواصل المباشرة أدناه.
        </motion.p>
      </section>

      {/* ===== Contact Info ===== */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-3">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-lg text-center"
        >
          <Phone className="mx-auto text-[#2563EB] mb-4" size={32} />
          <h3 className="font-extrabold text-xl mb-2">التليفون</h3>
          <p className="text-[#4B4B4B]">0123 456 789</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-lg text-center"
        >
          <Mail className="mx-auto text-[#2563EB] mb-4" size={32} />
          <h3 className="font-extrabold text-xl mb-2">الإيميل</h3>
          <p className="text-[#4B4B4B]">Info@collection.eg</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl p-8 shadow-lg text-center"
        >
          <MapPin className="mx-auto text-[#2563EB] mb-4" size={32} />
          <h3 className="font-extrabold text-xl mb-2">الموقع</h3>
          <p className="text-[#4B4B4B]">الدقي، الجيزة</p>
        </motion.div>
      </section>

      {/* ===== Contact Form ===== */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-lg space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              placeholder="الاسم"
              className="border border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="border border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
          </div>
          <textarea
            placeholder="رسالتك"
            className="border border-gray-300 rounded-xl p-4 w-full h-40 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#2563EB] text-white font-bold py-4 px-6 rounded-xl w-full hover:bg-[#1e4bb8] transition"
          >
            إرسال الرسالة
          </button>
        </motion.form>
      </section>
    </main>
  );
}
