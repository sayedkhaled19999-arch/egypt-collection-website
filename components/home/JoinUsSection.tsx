'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Briefcase, Trophy, Clock, Users } from 'lucide-react';

const perks = [
  { icon: <Briefcase className="w-10 h-10" />, title: 'راتب ثابت', description: 'مرتب شهري ثابت يضمنلك أمان واستقرار.' },
  { icon: <Trophy className="w-10 h-10" />, title: 'مكافآت للمتميزين', description: 'مكافآت حقيقية على الأداء والشغل الصح.' },
  { icon: <Users className="w-10 h-10" />, title: 'عمولة مجزية', description: 'عمولات محترمة تزود دخلك كل شهر.' },
  { icon: <Clock className="w-10 h-10" />, title: 'مواعيد عمل واضحة', description: 'التزام وتنظيم بدون ضغط أو لخبطة.' },
  { icon: <Briefcase className="w-10 h-10" />, title: 'تأمين اجتماعي', description: 'تأمين اجتماعي كامل بعد التثبيت.' },
  { icon: <Users className="w-10 h-10" />, title: 'بيئة عمل محترمة', description: 'احترام متبادل وتقدير لكل مجهود.' },
  { icon: <Users className="w-10 h-10" />, title: 'فريق عمل متميز', description: 'هتشتغل وسط فريق محترف وخبرة كبيرة في مجاله.' },
  { icon: <Clock className="w-10 h-10" />, title: 'استقرار وظيفي', description: 'مش شغل مؤقت… ده مستقبل.' },
  { icon: <Users className="w-10 h-10" />, title: 'تدريب مستمر', description: 'هنتعلمك كل حاجة من أول يوم.' },
  { icon: <Briefcase className="w-10 h-10" />, title: 'عقود واضحة', description: 'كل حاجة مكتوبة وواضحة من البداية.' },
  { icon: <Trophy className="w-10 h-10" />, title: 'تقدير مجهودك', description: 'شغلك مش بيضيع… كل مجهود محسوب.' },
  { icon: <Users className="w-10 h-10" />, title: 'فرص حقيقية', description: 'مش وعود وخلاص… فرص حقيقية للنمو.' }
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } }
};

export default function JoinUsSection() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section className="py-16 flex justify-center bg-[#F4F4F4]">
      <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 max-w-6xl w-full">

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* العنوان والجملة */}
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-6 text-center">
            جاهز تنضم لينا؟
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed mb-10 text-center">
            ليه تختار تنضم لينا؟ شوف المميزات اللي هتحصل عليها فورًا وانت معانا:
          </motion.p>

          {/* كروت المميزات */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" variants={containerVariants}>
            {perks.map((perk, i) => (
              <motion.div key={i} variants={itemVariants} className="group relative overflow-hidden flex flex-col items-center gap-3 p-6 bg-[#F4F4F4] rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
                {/* shine / glow overlay */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-[#2563EB]/10 via-transparent to-[#2563EB]/10 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10 text-[#2563EB] transition-transform duration-300 group-hover:scale-110">{perk.icon}</div>
                <h3 className="relative z-10 text-xl font-bold text-[#353535] transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#2563EB] group-hover:to-[#1E40AF]">
                  {perk.title}
                </h3>
                <p className="relative z-10 text-sm text-[#757575] text-center transition-colors duration-300 group-hover:text-[#4B4B4B]">
                  {perk.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* زر الانتقال */}
          <motion.div variants={itemVariants} className="mt-14 text-center">
            <Link href="/jobs" className="inline-block bg-[#2563EB] text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              اعرف أكثر عن الوظائف المتاحة
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
