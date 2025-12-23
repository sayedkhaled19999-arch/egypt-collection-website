'use client';

import { motion } from 'framer-motion';
import { Briefcase, Trophy, Clock, Users } from 'lucide-react';
import Link from 'next/link';

const perks = [
  {
    icon: <Briefcase className="w-10 h-10" />,
    title: 'راتب ثابت',
    description: 'مرتب شهري ثابت يضمنلك أمان واستقرار.'
  },
  {
    icon: <Trophy className="w-10 h-10" />,
    title: 'مكافآت للمتميزين',
    description: 'مكافآت حقيقية على الأداء والشغل الصح.'
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: 'عمولة مجزية',
    description: 'عمولات محترمة تزود دخلك كل شهر.'
  },
  {
    icon: <Clock className="w-10 h-10" />,
    title: 'مواعيد عمل واضحة',
    description: 'التزام وتنظيم بدون ضغط أو لخبطة.'
  },
  {
    icon: <Briefcase className="w-10 h-10" />,
    title: 'تأمين اجتماعي',
    description: 'تأمين اجتماعي كامل بعد التثبيت.'
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: 'بيئة عمل محترمة',
    description: 'احترام متبادل وتقدير لكل مجهود.'
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: 'فريق عمل متميز',
    description: 'هتشتغل وسط فريق محترف وخبرة كبيرة في مجاله.'
  },
  {
    icon: <Clock className="w-10 h-10" />,
    title: 'استقرار وظيفي',
    description: 'مش شغل مؤقت… ده مستقبل.'
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: 'تدريب مستمر',
    description: 'هنتعلمك كل حاجة من أول يوم.'
  },
  {
    icon: <Briefcase className="w-10 h-10" />,
    title: 'عقود واضحة',
    description: 'كل حاجة مكتوبة وواضحة من البداية.'
  },
  {
    icon: <Trophy className="w-10 h-10" />,
    title: 'تقدير مجهودك',
    description: 'شغلك مش بيضيع… كل مجهود محسوب.'
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: 'فرص حقيقية',
    description: 'مش وعود وخلاص… فرص حقيقية للنمو.'
  }
];

export default function CallToAction() {
  return (
    <motion.section
      className="py-16 flex justify-center bg-[#F4F4F4]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 max-w-6xl w-full">
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-6 text-center">
          جاهز تنضم لينا؟
        </h2>

        <p className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed mb-10 text-center">
          ليه تختار تنضم لينا؟ شوف المميزات اللي هتحصل عليها فورًا وانت معانا:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {perks.map((perk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="
                group relative overflow-hidden
                flex flex-col items-center gap-3 p-6
                bg-[#F4F4F4] rounded-2xl shadow-md
                transition-all duration-300
                hover:scale-105 hover:shadow-xl
              "
            >
              {/* Glow effect */}
              <div className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                bg-gradient-to-br from-[#2563EB]/10 via-transparent to-[#2563EB]/10
                transition-opacity duration-300
              " />

              {/* Icon */}
              <div className="
                relative z-10 text-[#2563EB]
                transition-transform duration-300
                group-hover:scale-110
              ">
                {perk.icon}
              </div>

              {/* Title */}
              <h3
                className="
                  relative z-10 text-xl font-bold
                  text-[#353535]
                  transition-all duration-300
                  group-hover:text-transparent
                  group-hover:bg-clip-text
                  group-hover:bg-gradient-to-r
                  group-hover:from-[#2563EB]
                  group-hover:to-[#1E40AF]
                "
              >
                {perk.title}
              </h3>

              {/* Description */}
              <p
                className="
                  relative z-10 text-sm text-[#757575] text-center
                  transition-colors duration-300
                  group-hover:text-[#4B4B4B]
                "
              >
                {perk.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/jobs"
            className="
              inline-block bg-[#2563EB] text-white font-bold
              px-10 py-4 rounded-xl shadow-lg
              transition-all duration-300
              hover:scale-105 hover:shadow-2xl
            "
          >
            اعرف أكثر عن الوظائف المتاحة
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
