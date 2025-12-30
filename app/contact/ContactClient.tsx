'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, User, MessageCircle, Map } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactClient() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // حالة لتخزين بيانات الفورم
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Info@egyptcollections.com');
    toast.success('تم نسخ الإيميل!');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading('جاري إرسال رسالتك...');

    try {
      // تجهيز البيانات
      const data = new FormData();
      data.append('type', 'contact'); // علامة مميزة عشان الـ API يعرف إن دي رسالة تواصل
      data.append('fullName', formData.name);
      data.append('phone', formData.phone);
      data.append('email', formData.email); // الإيميل الشخصي للمرسل
      data.append('address', formData.address);
      data.append('message', formData.message);
      
      // إرسال للـ API (نفس الـ API اللي عملناه للوظائف هنستخدمه هنا بذكاء)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        toast.success('شكرًا لتواصلك معنا! استلمنا رسالتك وهنرد عليك قريبًا.', { id: loadingToast, duration: 5000 });
        setFormData({ name: '', phone: '', email: '', address: '', message: '' }); // تصفير الفورم
      } else {
        toast.error('حصلت مشكلة في الإرسال، حاول تاني.', { id: loadingToast });
      }

    } catch (error) {
      console.error(error);
      toast.error('خطأ في الاتصال، تأكد من الإنترنت.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20" dir="rtl">
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
          <h2 className="font-extrabold text-xl mb-2">التليفون</h2>
          <p className="text-[#4B4B4B] font-bold">01110600280</p>
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
          <h2 className="font-extrabold text-xl mb-2">الإيميل</h2>
          <p className="text-[#4B4B4B] font-bold">Info@egyptcollections.com</p>
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
          <h2 className="font-extrabold text-xl mb-2">الموقع</h2>
          <p className="text-[#4B4B4B] font-bold">الدقي، الجيزة</p>
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
            املأ النموذج للتواصل معنا
          </h2>
          <p className="text-center text-[#4B4B4B] mb-6">
            إحنا هنا للرد عليك بسرعة
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
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="relative">
                <Phone className="absolute top-1/2 -translate-y-1/2 left-4 text-[#2563EB]" />
                <input
                  type="text"
                  placeholder="رقم الموبايل"
                  className="border border-gray-300 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute top-1/2 -translate-y-1/2 left-4 text-[#2563EB]" />
              <input
                type="email"
                placeholder="البريد الإلكتروني (اختياري)"
                className="border border-gray-300 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <Map className="absolute top-1/2 -translate-y-1/2 left-4 text-[#2563EB]" />
              <input
                type="text"
                placeholder="العنوان (اختياري)"
                className="border border-gray-300 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="relative">
              <MessageCircle className="absolute top-2 left-4 text-[#2563EB]" />
              <textarea
                placeholder="رسالتك"
                className="border border-gray-300 rounded-xl p-4 pl-12 w-full h-40 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#2563EB] text-white font-bold py-4 px-6 rounded-xl w-full hover:bg-[#1e4bb8] transition transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}