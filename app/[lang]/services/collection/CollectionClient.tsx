'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, FileCheck, Scale, MapPin, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } };

interface Props { lang: string; dict: any; }

export default function CollectionClient({ lang, dict }: Props) {
  const s = dict.servicesPage.collection;

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
          {lang === 'ar' ? 'أنواع التحصيل' : 'Collection Types'}
        </motion.h2>
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center text-[#4B4B4B] mb-14 text-lg">
          {s.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard icon={<MapPin />} title={lang === 'ar' ? 'تحصيل ميداني' : 'Field Collection'}
            desc={lang === 'ar' ? 'فريق ميداني مدرب يزور العملاء في جميع محافظات مصر للتحصيل والتفاوض على تسوية المديونيات.'
              : 'Trained field team visits customers across all Egypt governorates for collection and debt settlement negotiation.'} />
          <ServiceCard icon={<Users />} title={lang === 'ar' ? 'تحصيل مكتبي' : 'Office Collection'}
            desc={lang === 'ar' ? 'متابعة هاتفية احترافية مع العملاء لتذكيرهم بالسداد وتقديم حلول عملية تناسب ظروفهم.'
              : 'Professional phone follow-up with customers to remind them of payment and provide practical solutions.'} />
          <ServiceCard icon={<Scale />} title={lang === 'ar' ? 'تحصيل قانوني' : 'Legal Collection'}
            desc={lang === 'ar' ? 'فريق قانوني متخصص لمتابعة الحالات التي تتطلب إجراءات قانونية مع الالتزام الكامل بالقوانين.'
              : 'Specialized legal team to follow up on cases requiring legal action with full compliance with laws.'} />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-12 text-center">
            {lang === 'ar' ? 'مميزات خدماتنا' : 'Our Service Features'}
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
            {lang === 'ar' ? 'نقدم خدماتنا لجميع المحافظات' : 'We Serve All Governorates'}
          </h2>
          <p className="text-[#4B4B4B] text-lg mb-10 max-w-2xl mx-auto">
            {lang === 'ar' ? 'فروعنا منتشرة في 6 محافظات لتغطية جميع أنحاء الجمهورية.'
              : 'Our branches are spread across 6 governorates covering all of Egypt.'}
          </p>
          <Link href={`/${lang}/partners`}
            className="inline-block bg-[#2563EB] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-[#1d4ed8] hover:scale-105 transition-all">
            {lang === 'ar' ? 'شوف شركائنا' : 'View Our Partners'}
          </Link>
        </motion.div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
              {lang === 'ar' ? 'أسئلة شائعة عن التحصيل' : 'Frequently Asked Questions'}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {dict.servicesFaq.collection.map((item: any, i: number) => (
                <details key={i} className="group bg-gray-50 rounded-xl p-5 border border-gray-200 open:shadow-md transition-all cursor-pointer">
                  <summary className="font-semibold text-gray-900 list-none flex items-center justify-between">
                    {item.q}
                    <span className="text-[#2563EB] group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </motion.div>
        </div>
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
