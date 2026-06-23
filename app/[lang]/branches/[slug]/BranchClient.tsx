'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Briefcase, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BranchClient({ lang, dict, branch, jobs, mapEmbed }: any) {
  const isAr = lang === 'ar';
  const name = isAr ? branch.nameAr : branch.nameEn;
  const address = isAr ? branch.addressAr : branch.addressEn;

  return (
    <main className="min-h-screen pt-20">
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              href={`/${lang}`}
              className={`inline-flex items-center gap-2 text-[#2563EB] hover:underline mb-6 ${isAr ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft size={18} />
              {isAr ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{name}</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {dict.branchPage.hero_desc} {name}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: isAr ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {isAr ? 'معلومات الفرع' : 'Branch Information'}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-[#2563EB] shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">{isAr ? 'العنوان' : 'Address'}</p>
                      <p className="text-gray-800 font-medium">{address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-[#2563EB] shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">{isAr ? 'تليفون' : 'Phone'}</p>
                      <p className="text-gray-800 font-medium" dir="ltr">+20 111 060 0280</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-[#2563EB] shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800 font-medium">Info@egyptcollections.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {dict.branchPage.services_title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {dict.branchPage.services_desc.replace('{{branch}}', name)}
                </p>
                <ul className="space-y-3">
                  {dict.servicesPage.collection.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 mt-1">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isAr ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
                <iframe
                  src={mapEmbed}
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={name}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {dict.branchPage.jobs_title} {name}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(([key, job]: any) => (
                  <Link
                    key={key}
                    href={`/${lang}/jobs/${key}`}
                    className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-[#2563EB]/30"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Briefcase className="text-[#2563EB] shrink-0 mt-1" size={20} />
                      <h3 className="font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors">
                        {job.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{job.desc}</p>
                    <span className="text-sm text-[#2563EB] font-medium">
                      {isAr ? 'عرض التفاصيل' : 'View Details'} ←
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {dict.branchPage.faq_title} {name}
            </h2>
            <div className="space-y-4">
              {Object.entries(branch.tags ? { 0: '', 1: '', 2: '' } : {}).length > 0 &&
                [
                  { q: dict.branchPage.faq.q1.replace('{{branch}}', name), a: dict.branchPage.faq.a1.replace('{{branch}}', name) },
                  { q: dict.branchPage.faq.q2.replace('{{branch}}', name), a: dict.branchPage.faq.a2.replace('{{branch}}', name) },
                  { q: dict.branchPage.faq.q3.replace('{{branch}}', name), a: dict.branchPage.faq.a3.replace('{{branch}}', name) },
                ].map((item, i) => (
                  <details key={i} className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 open:shadow-md transition-all">
                    <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
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
