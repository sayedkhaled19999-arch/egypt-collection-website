'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { Phone, Mail, MapPin, User, MessageCircle, Map } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Info@collection.eg');
    toast.success('تم نسخ الإيميل!');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // هنا ممكن تضيف API لو عايز ترسل الرسالة فعلياً

    toast.success(
      'شكرًا لتواصلك معنا! إحنا استلمنا رسالتك وهنرد عليك في أقرب وقت.',
      { duration: 5000 }
    );

    // امسح الحقول بعد الإرسال لو حابب
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      {/* ================= Meta Tags ================= */}
      <Head>
        <title>المصرية للتحصيلات – تواصل معنا | ECC Collections</title>
        <meta
          name="description"
          content="تواصل مع المصرية للتحصيلات لأي استفسارات حول خدمات التحصيل والاستعلام الائتماني داخل مصر. املأ النموذج أو استخدم طرق التواصل المباشرة."
        />
        <meta name="keywords" content="تواصل, اتصل بنا, المصرية للتحصيلات, ECC Collections, استفسارات, تحصيل, استعلام, خدمات ميدانية" />
        <link rel="canonical" href="https://www.collection.eg/contact" />

        {/* Open Graph */}
        <meta property="og:title" content="المصرية للتحصيلات – تواصل معنا | ECC Collections" />
        <meta
          property="og:description"
          content="تواصل مع المصرية للتحصيلات لأي استفسارات حول خدمات التحصيل والاستعلام الائتماني داخل مصر."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.collection.eg/contact" />
        <meta property="og:image" content="https://www.collection.eg/hero/hero-banner.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="المصرية للتحصيلات – تواصل معنا | ECC Collections" />
        <meta
          name="twitter:description"
          content="تواصل مع المصرية للتحصيلات لأي استفسارات حول خدمات التحصيل والاستعلام الائتماني داخل مصر."
        />
        <meta name="twitter:image" content="https://www.collection.eg/hero/hero-banner.png" />
      </Head>

      <main className="bg-[#F4F4F4] min-h-screen pb-20">
        <Toaster position="top-center" reverseOrder={false} />

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

        {/* ===== Contact Info Cards ===== */}
        <section className="max-w-6xl mx-auto px-4 py-16 grid gap-8 md:grid-cols-3">
          <motion.a
            href="tel:01110600280"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-lg text-center hover:scale-105 transition cursor-pointer"
          >
            <Phone className="mx-auto text-[#2563EB] mb-4" size={32} />
            <h3 className="font-extrabold text-xl mb-2">التليفون</h3>
            <p className="text-[#4B4B4B]">01110600280</p>
          </motion.a>

          <motion.div
            onClick={handleCopyEmail}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg text-center hover:scale-105 transition cursor-pointer"
          >
            <Mail className="mx-auto text-[#2563EB] mb-4" size={32} />
            <h3 className="font-extrabold text-xl mb-2">الإيميل</h3>
            <p className="text-[#4B4B4B]">Info@collection.eg</p>
          </motion.div>

          <motion.a
            href="https://maps.app.goo.gl/CcmDDN7XqEvbE5Rj6"
            target="_blank"
            rel="noopener noreferrer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-lg text-center hover:scale-105 transition cursor-pointer"
          >
            <MapPin className="mx-auto text-[#2563EB] mb-4" size={32} />
            <h3 className="font-extrabold text-xl mb-2">الموقع</h3>
            <p className="text-[#4B4B4B]">الدقي، الجيزة</p>
          </motion.a>
        </section>

        {/* ===== Contact Form ===== */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-lg space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#2563EB] mb-6 text-center">
              تواصل معنا
            </h2>
            <p className="text-center text-[#4B4B4B] mb-6">
              املأ النموذج أو اكتب رسالتك مباشرة، إحنا هنا للرد عليك بسرعة
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative">
                  <User className="absolute top-1/2 -translate-y-1/2 left-4 text-[#2563EB]" />
                  <input
                    type="text"
                    placeholder="الاسم"
                    className="border border-gray-300 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute top-1/2 -translate-y-1/2 left-4 text-[#2563EB]" />
                  <input
                    type="text"
                    placeholder="رقم الموبايل"
                    className="border border-gray-300 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute top-1/2 -translate-y-1/2 left-4 text-[#2563EB]" />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني (اختياري)"
                  className="border border-gray-300 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div className="relative">
                <Map className="absolute top-1/2 -translate-y-1/2 left-4 text-[#2563EB]" />
                <input
                  type="text"
                  placeholder="العنوان (اختياري)"
                  className="border border-gray-300 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div className="relative">
                <MessageCircle className="absolute top-2 left-4 text-[#2563EB]" />
                <textarea
                  placeholder="رسالتك"
                  className="border border-gray-300 rounded-xl p-4 pl-12 w-full h-40 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#2563EB] text-white font-bold py-4 px-6 rounded-xl w-full hover:bg-[#1e4bb8] transition transform hover:scale-105"
              >
                إرسال الرسالة
              </button>
            </form>
          </motion.div>
        </section>
      </main>
    </>
  );
}
