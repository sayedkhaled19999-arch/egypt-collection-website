'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Briefcase, Phone, Mail, ArrowRight } from 'lucide-react';
import { BranchInfo } from '@/components/data/branches-data';
import { branchesInfo } from '@/components/data/branches-data';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

interface Props { lang: string; branch: BranchInfo; dict: any; }

// HQ (Dokki) shows all 4 jobs; other branches show field jobs only
const HQ_SLUG = 'dokki-headquarters';
const FIELD_JOBS = ['field-collector', 'field-investigator'];

export default function CareerBranchClient({ lang, branch, dict }: Props) {
  const isAr = lang === 'ar';
  const branchName = isAr ? branch.nameAr : branch.nameEn;
  const otherLocations = branchesInfo.filter(b => b.slug !== branch.slug);
  const isHQ = branch.slug === HQ_SLUG;

  const allJobs = Object.entries(dict.jobsData as any).map(([id, data]: [string, any]) => ({ id, ...data }));
  const jobs = isHQ ? allJobs : allJobs.filter((j) => FIELD_JOBS.includes(j.id));

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <section className="py-20 md:py-28 px-4 text-center bg-gradient-to-b from-white to-gray-50">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.9 }}>
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 text-[#2563EB] px-5 py-2 rounded-full text-sm font-bold mb-4">
            <MapPin className="w-4 h-4" />
            {branchName}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {dict.careersPage.title} {branchName}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {isAr ? branch.addressAr : branch.addressEn}
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm text-[#2563EB] font-medium hover:underline flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {isAr ? 'عرض على الخريطة' : 'View on Map'}
            </a>
          </div>
        </motion.div>
      </section>

      {jobs.length > 0 ? (
        <section className="max-w-5xl mx-auto px-4 pb-20 -mt-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-5">
            {jobs.map((job: any, i: number) => (
              <motion.div key={job.id} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Link href={`/${lang}/jobs/${job.id}`} className="block group">
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-[#2563EB]/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{job.type}</p>
                      </div>
                      <div className="p-2.5 bg-[#2563EB]/10 rounded-xl text-[#2563EB]">
                        <Briefcase className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-5 leading-relaxed">{job.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full">{job.salary}</span>
                      <span className="flex items-center gap-1 text-[#2563EB] text-sm font-medium">
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
      ) : (
        <section className="pb-20 text-center">
          <p className="text-gray-400">{isAr ? 'لا توجد وظائف متاحة حالياً في هذا الفرع' : 'No jobs currently available in this branch'}</p>
        </section>
      )}

      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{dict.careersPage.why_join}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-10">{dict.careersPage.why_join_desc}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:01110600280"
                className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full text-gray-700 font-medium hover:bg-[#2563EB] hover:text-white transition-all">
                <Phone className="w-5 h-5" /> 01110600280
              </a>
              <a href="mailto:Info@egyptcollections.com"
                className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full text-gray-700 font-medium hover:bg-[#2563EB] hover:text-white transition-all">
                <Mail className="w-5 h-5" /> Info@egyptcollections.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {isAr ? 'فروع أخرى' : 'Other Branches'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4">
            {otherLocations.map((loc) => (
              <Link key={loc.slug} href={`/${lang}/careers/${loc.slug}`}
                className="bg-white px-5 py-3 rounded-full shadow-sm border border-gray-200 text-gray-600 font-medium hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all text-sm">
                {isAr ? loc.nameAr : loc.nameEn}
              </Link>
            ))}
            <Link href={`/${lang}/jobs`}
              className="bg-[#2563EB] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1d4ed8] transition-all text-sm">
              {dict.careersPage.all_locations}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
