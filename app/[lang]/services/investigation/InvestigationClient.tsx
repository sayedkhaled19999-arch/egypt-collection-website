'use client';

import { motion } from 'framer-motion';
import { SearchCheck, ShieldCheck, FileText, Target, MapPin, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } };

interface Props { lang: string; dict: any; }

export default function InvestigationClient({ lang, dict }: Props) {
  const s = dict.servicesPage.investigation;

  return (
    <main className="bg-[#F4F4F4] overflow-hidden">
      <section className="py-28 px-4 text-center bg-gradient-to-br from-white to-blue-50">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold text-[#2563EB] mb-6">
          {s.title}
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2, duration: 0.9 }}
          className="max-w-4xl mx-auto text-lg md:text-xl text-[#4B4B4B] mb-8 leading-relaxed">
          {dict.servicesPage.desc}
        </motion.p>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3, duration: 0.9 }}
          className="max-w-4xl mx-auto text-lg md:text-xl text-[#4B4B4B] leading-relaxed">
          {s.desc}
        </motion.p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4 text-center">
          {lang === 'ar' ? 'أنواع الاستعلام' : 'Investigation Types'}
        </motion.h2>
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center text-[#4B4B4B] mb-14 text-lg">
          {s.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard icon={<SearchCheck />} title={lang === 'ar' ? 'استعلام ميداني' : 'Field Investigation'}
            desc={lang === 'ar' ? 'زيارات ميدانية للتحقق من عناوين وبيانات العملاء بدقة عالية وسرعة في التنفيذ.'
              : 'Field visits to verify client addresses and data with high accuracy and fast execution.'} />
          <ServiceCard icon={<ShieldCheck />} title={lang === 'ar' ? 'استعلام ائتماني' : 'Credit Investigation'}
            desc={lang === 'ar' ? 'تقييم الجدارة الائتمانية للعملاء من خلال جمع وتحليل البيانات المالية والميدانية.'
              : 'Assessing client creditworthiness through collection and analysis of financial and field data.'} />
          <ServiceCard icon={<FileText />} title={lang === 'ar' ? 'تقارير معتمدة' : 'Certified Reports'}
            desc={lang === 'ar' ? 'تقارير مفصلة ومعتمدة عن حالة العملاء تشمل جميع البيانات المطلوبة بدقة وأمان.'
              : 'Detailed certified reports on client status including all required data accurately and securely.'} />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-12 text-center">
            {lang === 'ar' ? 'مميزات خدمات الاستعلام' : 'Investigation Service Features'}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {s.features.map((f: string, i: number) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-[#F4F4F4] p-5 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="bg-[#2563EB]/10 p-3 rounded-full text-[#2563EB] shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-[#4B4B4B] font-medium text-lg">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#2563EB]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <TrendingUp className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <p className="text-white text-2xl md:text-3xl font-bold leading-relaxed">
              {s.benefits}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-6">
            {lang === 'ar' ? 'نقدم خدماتنا لكبرى البنوك' : 'We Serve Major Banks'}
          </h2>
          <p className="text-[#4B4B4B] text-lg mb-10 max-w-2xl mx-auto">
            {lang === 'ar' ? 'أكثر من 13 بنكاً يثقون في خدمات الاستعلام الخاصة بنا.'
              : 'Over 13 banks trust our investigation services.'}
          </p>
          <Link href={`/${lang}/partners`}
            className="inline-block bg-[#2563EB] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-[#1d4ed8] hover:scale-105 transition-all">
            {lang === 'ar' ? 'شوف شركائنا' : 'View Our Partners'}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 text-center border border-gray-100">
      <div className="text-[#2563EB] mb-5 flex justify-center">
        <div className="p-4 bg-[#2563EB]/10 rounded-2xl">{icon}</div>
      </div>
      <h3 className="text-xl font-extrabold mb-3 text-[#333]">{title}</h3>
      <p className="text-[#4B4B4B] leading-relaxed">{desc}</p>
    </motion.div>
  );
}
