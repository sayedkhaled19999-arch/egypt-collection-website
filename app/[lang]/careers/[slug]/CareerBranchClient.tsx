'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Briefcase, ChevronRight, ChevronLeft, Phone, Mail, ArrowRight } from 'lucide-react';
import { BranchInfo } from '@/components/data/branches-data';
import { branchesInfo } from '@/components/data/branches-data';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

interface Props { lang: string; branch: BranchInfo; dict: any; }

export default function CareerBranchClient({ lang, branch, dict }: Props) {
  const isAr = lang === 'ar';
  const branchName = isAr ? branch.nameAr : branch.nameEn;
  const otherLocations = branchesInfo.filter(b => b.slug !== branch.slug);

  const jobs = Object.entries(dict.jobsData as any).map(([id, data]: [string, any]) => ({ id, ...data }));

  return (
    <main className="bg-[#F4F4F4] min-h-screen">
      <section className="py-24 px-4 text-center bg-gradient-to-br from-white to-blue-50">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.9 }}>
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 text-[#2563EB] px-4 py-2 rounded-full text-sm font-bold mb-4">
            <MapPin className="w-4 h-4" />
            {branchName}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2563EB] mb-6">
            {dict.careersPage.title} {branchName}
          </h1>
          <p className="text-lg md:text-xl text-[#4B4B4B] max-w-3xl mx-auto mb-8 leading-relaxed">
            {isAr
              ? `فرص عمل متاحة في ${branchName} - انضم لأكبر شركة تحصيل واستعلام في مصر.`
              : `Job opportunities available in ${branchName} - Join the largest collection and investigation company in Egypt.`}
          </p>
          <p className="text-[#4B4B4B] max-w-2xl mx-auto">
            {isAr ? branch.addressAr : branch.addressEn}
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#2563EB] font-bold hover:underline">
              <MapPin className="w-4 h-4" />
              {isAr ? 'عرض على الخريطة' : 'View on Map'}
            </a>
          </div>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2563EB] mb-8">
            {dict.careersPage.jobs_available} {isAr ? `في ${branchName}` : `in ${branchName}`}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job: any, i: number) => (
            <motion.div key={job.id} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.1 }}>
              <Link href={`/${lang}/jobs/${job.id}`} className="block group">
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#333] group-hover:text-[#2563EB] transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{job.type}</p>
                    </div>
                    <div className="bg-[#2563EB]/10 p-2 rounded-xl text-[#2563EB]">
                      <Briefcase className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-sm text-[#4B4B4B] line-clamp-2 mb-4">{job.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{job.salary}</span>
                    <span className="flex items-center gap-1 text-[#2563EB] text-sm font-bold">
                      {dict.careersPage.view_job}
                      <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4">
              {dict.careersPage.why_join}
            </h2>
            <p className="text-lg text-[#4B4B4B] max-w-3xl mx-auto">{dict.careersPage.why_join_desc}</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:01110600280`}
              className="flex items-center gap-2 bg-[#F4F4F4] px-6 py-3 rounded-full text-[#333] font-bold hover:bg-[#2563EB] hover:text-white transition-all">
              <Phone className="w-5 h-5" /> 01110600280
            </a>
            <a href="mailto:Info@egyptcollections.com"
              className="flex items-center gap-2 bg-[#F4F4F4] px-6 py-3 rounded-full text-[#333] font-bold hover:bg-[#2563EB] hover:text-white transition-all">
              <Mail className="w-5 h-5" /> Info@egyptcollections.com
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2563EB] mb-8">
            {isAr ? 'فروع أخرى' : 'Other Branches'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4">
            {otherLocations.map((loc) => (
              <Link key={loc.slug} href={`/${lang}/careers/${loc.slug}`}
                className="bg-white px-5 py-3 rounded-full shadow-sm border border-gray-200 text-[#4B4B4B] font-medium hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all text-sm">
                {isAr ? loc.nameAr : loc.nameEn}
              </Link>
            ))}
            <Link href={`/${lang}/jobs`}
              className="bg-[#2563EB] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1d4ed8] transition-all text-sm">
              {dict.careersPage.all_locations}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
