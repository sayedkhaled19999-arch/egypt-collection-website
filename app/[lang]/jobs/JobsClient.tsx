'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import JobAlert from '@/components/JobAlert';
import GoogleReviews from '@/components/GoogleReviews';
import { branchesInfo } from '@/components/data/branches-data';

interface JobsClientProps {
  lang: string;
  dict: any;
}

export default function JobsClient({ lang, dict }: JobsClientProps) {
  const isAr = lang === 'ar';
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const jobsList = Object.entries(dict.jobsData).map(([id, data]: [string, any]) => ({
    id,
    ...data
  }));

  const categories = [
    { key: 'all', label: isAr ? 'الكل' : 'All' },
    { key: 'field', label: isAr ? 'ميداني' : 'Field' },
    { key: 'office', label: isAr ? 'مكتبي' : 'Office' },
  ];

  const filtered = activeFilter === 'all'
    ? jobsList
    : jobsList.filter(j =>
        activeFilter === 'field'
          ? j.id.includes('field')
          : !j.id.includes('field')
      );

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <section className="py-24 md:py-32 text-center bg-gradient-to-b from-white to-gray-50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {dict.jobsPage.hero_title}
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            {dict.jobsPage.hero_subtitle}
          </p>
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-500 px-5 py-2 rounded-full text-sm shadow-sm">
              <Briefcase className="w-4 h-4" />
              {dict.jobsPage.available_count.replace('{{count}}', jobsList.length.toString())}
            </span>
          </div>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16 -mt-12 relative z-10">
        <div className="flex justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat.key
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-[#2563EB]/20 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{job.desc}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                    {job.salary}
                  </span>
                  <Link
                    href={`/${lang}/jobs/${job.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#2563EB] hover:underline"
                  >
                    {dict.jobsPage.btn_details}
                    <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {isAr ? 'تصفح حسب الفرع' : 'Browse by Branch'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {branchesInfo.map((branch) => (
              <Link
                key={branch.slug}
                href={`/${lang}/careers/${branch.slug}`}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-5 py-3 rounded-full font-medium shadow-sm hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all text-sm"
              >
                <MapPin className="w-4 h-4" />
                {isAr ? branch.nameAr : branch.nameEn}
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      <JobAlert lang={lang} dict={dict} />
      <GoogleReviews lang={lang} dict={dict.googleReviews} />
    </div>
  );
}
