'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Briefcase, MapPin, Laptop, ArrowRight, Clock, DollarSign, Home, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import JobAlert from '@/components/JobAlert';
import GoogleReviews from '@/components/GoogleReviews';
import { branchesInfo } from '@/components/data/branches-data';

interface JobsClientProps {
  lang: string;
  dict: any;
}

export default function JobsClient({ lang, dict }: JobsClientProps) {
  const [current, setCurrent] = useState(0);
  const autoSlideRef = useRef<number | null>(null);

  const jobsList = Object.entries(dict.jobsData).map(([id, data]: [string, any]) => ({
    id,
    ...data
  }));

  useEffect(() => {
    autoSlideRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % jobsList.length);
    }, 10000);
    return () => { if (autoSlideRef.current) clearInterval(autoSlideRef.current); };
  }, [jobsList.length]);

  const handlers = useSwipeable({
    onSwipedLeft: lang === 'ar' ? () => setCurrent((prev) => (prev + 1) % jobsList.length) : () => setCurrent((prev) => (prev - 1 + jobsList.length) % jobsList.length),
    onSwipedRight: lang === 'ar' ? () => setCurrent((prev) => (prev - 1 + jobsList.length) % jobsList.length) : () => setCurrent((prev) => (prev + 1) % jobsList.length),
    trackMouse: true,
  });

  const prevSlide = () => setCurrent((prev) => (prev - 1 + jobsList.length) % jobsList.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % jobsList.length);

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      
      {/* Hero Section with Gradient */}
      <div {...handlers} className="relative w-full h-[350px] md:h-[420px] overflow-hidden bg-gradient-to-br from-[#2563EB] via-[#1d4ed8] to-[#1e40af]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center text-center px-4"
          >
            <div className="absolute inset-0 bg-black/10" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-3xl mx-auto space-y-4"
            >
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                {dict.jobsPage.hero_title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
                {dict.jobsPage.hero_subtitle}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {jobsList.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Jobs Grid Section */}
      <section id="jobs-grid" className="container mx-auto px-4 py-16 -mt-16 relative z-20">
        
        {/* Count Badge */}
        <div className="flex justify-center mb-10">
           <div className="bg-white text-[#2563EB] px-6 py-2 rounded-full shadow-lg font-bold text-sm border border-gray-100 flex items-center gap-2">
             <Briefcase className="w-4 h-4" />
             {dict.jobsPage.available_count.replace('{{count}}', jobsList.length.toString())}
           </div>
        </div>

        {/* Job Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {jobsList.map((job, i) => (
            <motion.div
              key={job.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <JobCard 
                job={job} 
                btnText={dict.jobsPage.btn_details} 
                isRtl={lang === 'ar'} 
                lang={lang} 
                dict={dict}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Browse by Location */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4">
            {lang === 'ar' ? 'تصفح حسب الفرع' : 'Browse by Location'}
          </h2>
          <p className="text-[#4B4B4B] text-lg max-w-2xl mx-auto">
            {lang === 'ar' ? 'اختر أقرب فروعنا للانضمام إلى فريق العمل' : 'Choose your nearest branch to join our team'}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {branchesInfo.map((branch) => (
            <Link
              key={branch.slug}
              href={`/${lang}/careers/${branch.slug}`}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#353535] px-5 py-3 rounded-full font-medium shadow-sm hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] hover:shadow-lg transition-all duration-300"
            >
              <MapPin className="w-4 h-4" />
              {lang === 'ar' ? branch.nameAr : branch.nameEn}
            </Link>
          ))}
        </div>
      </section>

      {/* Job Alert Subscribe */}
      <JobAlert lang={lang} dict={dict} />

      {/* Google Reviews */}
      <GoogleReviews lang={lang} dict={dict.googleReviews} />
    </div>
  );
}

function JobCard({ job, btnText, isRtl, lang, dict }: { job: any, btnText: string, isRtl: boolean, lang: string, dict: any }) {
  const getIcon = () => {
    switch (job.id) {
      case "office-collector": return <Home className="w-6 h-6 text-[#2563EB]" />;
      case "field-collector": case "field-investigator": return <MapPin className="w-6 h-6 text-[#2563EB]" />;
      case "data-entry": return <Laptop className="w-6 h-6 text-[#2563EB]" />;
      default: return <Briefcase className="w-6 h-6 text-[#2563EB]" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-200/50 hover:border-[#2563EB]/30 hover:-translate-y-1 hover:bg-white">
      
      {/* Glass overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563EB]/0 to-[#2563EB]/0 group-hover:from-[#2563EB]/5 group-hover:to-blue-500/5 transition-all duration-300 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 text-[#2563EB] shadow-sm">
              {getIcon()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#353535] group-hover:text-[#2563EB] transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Clock className="w-3 h-3" />
                <span>{job.type}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Salary - prominent */}
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
            {job.salary}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-[#666] text-sm leading-relaxed mb-5 line-clamp-3 min-h-[60px]">
          {job.desc}
        </p>
        
        {/* Location Badge */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 text-[#2563EB] px-3 py-1.5 rounded-full border border-blue-100">
            <MapPin className="w-3 h-3" />
            {job.location}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-auto">
        <Link
          href={`/${lang}/jobs/${job.id}`}
          className="flex items-center justify-between flex-1 py-3 px-5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all duration-300 group/btn"
        >
          <span>{btnText}</span>
          <div className={`transform transition-transform duration-300 ${isRtl ? 'group-hover/btn:-translate-x-2' : 'group-hover/btn:translate-x-2'}`}>
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4 rotate-180" />}
          </div>
        </Link>

        <Link
          href={`/${lang}/jobs/${job.id}#apply`}
          className="flex items-center justify-center gap-2 py-3 px-5 bg-[#2563EB] text-white rounded-xl font-bold hover:bg-[#1d4ed8] transition-all duration-300 shadow-md hover:shadow-lg group/apply"
        >
          <Send className="w-4 h-4" />
          <span>{lang === 'ar' ? 'تقديم سريع' : 'Quick Apply'}</span>
        </Link>
      </div>
    </div>
  );
}
