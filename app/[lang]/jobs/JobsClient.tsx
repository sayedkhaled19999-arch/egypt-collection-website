// --- START OF FILE app/[lang]/jobs/JobsClient.tsx ---
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Briefcase, Home, MapPin, Laptop, ArrowRight, Search, Clock } from 'lucide-react';
import Link from 'next/link';

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

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      
      {/* Hero Section */}
      <div {...handlers} className="relative w-full h-[350px] md:h-[420px] overflow-hidden bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center text-center px-4"
            style={{
              backgroundImage: `url('/jobs/job.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            
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
      </div>

      {/* Jobs Grid Section */}
      <section id="jobs-grid" className="container mx-auto px-4 py-16 -mt-16 relative z-20">
        
        {/* Count Badge */}
        <div className="flex justify-center mb-8">
           <div className="bg-white text-[#2563EB] px-6 py-2 rounded-full shadow-lg font-bold text-sm border border-gray-100 flex items-center gap-2">
             <Briefcase className="w-4 h-4" />
             {dict.jobsPage.available_count.replace('{{count}}', jobsList.length.toString())}
           </div>
        </div>

        {/* الكروت */}
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
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

function JobCard({ job, btnText, isRtl, lang }: { job: any, btnText: string, isRtl: boolean, lang: string }) {
  const getIcon = () => {
    switch (job.id) {
      case "office-collector": return <Home className="w-6 h-6 text-[#2563EB]" />;
      case "field-collector": case "field-investigator": return <MapPin className="w-6 h-6 text-[#2563EB]" />;
      case "data-entry": return <Laptop className="w-6 h-6 text-[#2563EB]" />;
      default: return <Briefcase className="w-6 h-6 text-[#2563EB]" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-200 hover:border-[#2563EB] hover:-translate-y-1">
      
      {/* الجزء العلوي */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300 text-[#2563EB]">
              {getIcon()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Clock className="w-3 h-3" />
                <span>{job.type}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* الوصف: زودنا السطور وخلينا الخط أوضح */}
        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3 min-h-[60px]">
          {job.desc}
        </p>
        
        {/* التاغات */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-md border border-gray-200">
            {job.location}
          </span>
        </div>
      </div>

      {/* الزرار: إيفيكت السهم والشكل الجديد */}
      <div className="mt-auto">
        <Link
          href={`/${lang}/jobs/${job.id}`}
          className="flex items-center justify-between w-full py-3 px-5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all duration-300 group/btn"
        >
          <span>{btnText}</span>
          {/* السهم بيتحرك لما تقف على الزرار */}
          <div className={`transform transition-transform duration-300 ${isRtl ? 'group-hover/btn:-translate-x-2' : 'group-hover/btn:translate-x-2'}`}>
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4 rotate-180" />}
          </div>
        </Link>
      </div>
    </div>
  );
}