'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Briefcase, Home, MapPin, Laptop, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
}

const jobs: JobCardProps[] = [
  {
    id: "office-collector",
    title: "محصل مكتبي",
    description: "متابعة العملاء من خلال التليفون ومساعدتهم للخروج من مرحلة التعثر والانتظام في السداد بشكل سلس وسريع.",
    location: "الدقي - الجيزة",
    type: "دوام كامل",
  },
  {
    id: "field-collector",
    title: "محصل ميداني",
    description: "زيارة العملاء الغير منتظمين في السداد وتشجيعهم على سداد المديونية المتأخرة عليهم، مع متابعة الحالات الميدانية بدقة.",
    location: "جميع محافظات مصر",
    type: "دوام كامل",
  },
  {
    id: "field-investigator",
    title: "مستعلم ميداني",
    description: "إجراء زيارات ميدانية لجمع بيانات دقيقة عن العملاء، مع تقديم تقارير واضحة للإدارة لضمان جودة المعلومات.",
    location: "الجيزة و القاهرة",
    type: "دوام كامل",
  },
  {
    id: "data-entry",
    title: "مدخل بيانات",
    description: "إدخال بيانات العملاء والمعاملات بدقة وسرعة باستخدام برامج الأوفيس، لضمان تنظيم المعلومات وسهولة الوصول إليها.",
    location: "الدقي - الجيزة",
    type: "دوام كامل",
  },
];

export default function JobsPage() {
  const [current, setCurrent] = useState(0);
  const autoSlideRef = useRef<number | null>(null);

  useEffect(() => {
    autoSlideRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % 1);
    }, 10000);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {},
    onSwipedRight: () => {},
    trackMouse: false,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">

      {/* Hero Header */}
      <div {...handlers} className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/50"></div>

            {/* الكارت الرئيسي */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 bg-black/40 p-6 md:p-8 rounded-xl max-w-[90%] md:max-w-xl backdrop-blur-sm"
            >
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 whitespace-normal">
                الوظائف المتاحة
              </h1>
              <p className="text-md md:text-lg text-white mb-4">
                لو حابب تبقى جزء من فريقنا، هنا فرصتك تلمع وتكبر معانا
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Jobs Grid */}
      <section id="jobs-grid" className="container mx-auto px-4 py-16 -mt-16 relative z-10">
        <div className="text-center text-gray-700 text-lg md:text-xl font-semibold mt-16 mb-16">
          يوجد <span className="font-bold text-blue-600">{jobs.length}</span> وظائف متاحة حالياً
        </div>
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

// Job Card Component
function JobCard({ job }: { job: JobCardProps }) {
  const getIcon = () => {
    switch (job.id) {
      case "office-collector":
        return <Home className="w-6 h-6 text-blue-500" />;
      case "field-collector":
      case "field-investigator":
        return <MapPin className="w-6 h-6 text-blue-500" />;
      case "data-entry":
        return <Laptop className="w-6 h-6 text-blue-500" />;
      default:
        return <Briefcase className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="flex flex-col justify-between bg-gray-100 rounded-2xl shadow-lg p-6 h-full hover:scale-105 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300">
      <div>
        <div className="flex items-center gap-3 mb-3">
          {getIcon()}
          <h3 className="text-lg font-bold text-center">{job.title}</h3>
        </div>
        <p className="text-gray-700 mb-3 text-center">{job.description}</p>
        <p className="text-sm text-gray-500 text-center">{job.location} | {job.type}</p>
      </div>
      <div className="flex justify-center mt-4">
        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-300 text-center text-sm"
        >
          اعرف أكثر
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
