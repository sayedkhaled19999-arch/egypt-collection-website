'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
// ضفنا أيقونات جديدة عشان التنوع
import { 
  Briefcase, Trophy, Clock, Users, 
  ShieldCheck, HeartHandshake, TrendingUp, 
  GraduationCap, FileText, Gem, Lock, Star 
} from 'lucide-react';

const perks = [
  { icon: <Briefcase className="w-10 h-10" />, title: 'راتب ثابت', description: 'مرتب شهري ثابت يضمنلك أمان واستقرار.' },
  { icon: <Trophy className="w-10 h-10" />, title: 'مكافآت للمتميزين', description: 'مكافآت حقيقية على الأداء والشغل الصح.' },
  { icon: <TrendingUp className="w-10 h-10" />, title: 'عمولة مجزية', description: 'عمولات محترمة تزود دخلك كل شهر.' },
  { icon: <Clock className="w-10 h-10" />, title: 'مواعيد عمل واضحة', description: 'التزام وتنظيم بدون ضغط أو لخبطة.' },
  
  { icon: <ShieldCheck className="w-10 h-10" />, title: 'تأمين اجتماعي', description: 'تأمين اجتماعي كامل بعد التثبيت.' },
  { icon: <HeartHandshake className="w-10 h-10" />, title: 'بيئة عمل محترمة', description: 'احترام متبادل وتقدير لكل مجهود.' },
  { icon: <Users className="w-10 h-10" />, title: 'فريق عمل متميز', description: 'هتشتغل وسط فريق محترف وخبرة كبيرة.' },
  { icon: <Lock className="w-10 h-10" />, title: 'استقرار وظيفي', description: 'مش شغل مؤقت… ده مستقبل ومسار مهني.' },
  
  { icon: <GraduationCap className="w-10 h-10" />, title: 'تدريب مستمر', description: 'هنعلمك كل حاجة من أول يوم.' },
  { icon: <FileText className="w-10 h-10" />, title: 'عقود واضحة', description: 'كل حاجة مكتوبة وواضحة من البداية.' },
  { icon: <Gem className="w-10 h-10" />, title: 'تقدير مجهودك', description: 'شغلك مش بيضيع… كل مجهود محسوب.' },
  { icon: <Star className="w-10 h-10" />, title: 'فرص حقيقية', description: 'مش وعود وخلاص… فرص حقيقية للنمو.' }
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1 // تتابع ظهور الكروت
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    // سرعنا الوقت لـ 0.6 عشان الحركة تبقى نشيطة
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
};

export default function JoinUsSection() {
  // triggerOnce: عشان الانيميشن يشتغل مرة واحدة وميزغللش العين
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-16 md:py-20 flex justify-center bg-[#F4F4F4]">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-14 max-w-6xl w-full">

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* العنوان والجملة */}
          <div className="text-center mb-12">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4">
              جاهز تنضم لينا؟
            </motion.h2>
            <motion.p variants={itemVariants} className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              ليه تختار تنضم لينا؟ شوف المميزات اللي هتحصل عليها فورًا وانت معانا:
            </motion.p>
          </div>

          {/* كروت المميزات */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" variants={containerVariants}>
            {perks.map((perk, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants} 
                className="group relative overflow-hidden flex flex-col items-center text-center gap-3 p-6 bg-[#F8F9FA] rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-100"
              >
                {/* تأثير اللمعة */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/0 via-white/0 to-blue-50/50 transition-all duration-300 rounded-2xl" />
                
                <div className="relative z-10 text-[#2563EB] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {perk.icon}
                </div>
                
                <h3 className="relative z-10 text-lg font-bold text-[#353535] transition-colors duration-300 group-hover:text-[#2563EB]">
                  {perk.title}
                </h3>
                
                <p className="relative z-10 text-sm text-[#666] leading-relaxed group-hover:text-[#4B4B4B]">
                  {perk.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* زر الانتقال */}
          <motion.div variants={itemVariants} className="mt-14 text-center">
            <Link 
              href="/jobs" 
              className="inline-block bg-[#2563EB] text-white font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:bg-[#1e4db7] hover:scale-105 hover:shadow-blue-500/30 hover:-translate-y-1"
            >
              اعرف أكثر عن الوظائف المتاحة
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}