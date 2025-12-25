'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Target,
  Eye,
  Building2,
  SearchCheck,
  Users,
  Award,
} from 'lucide-react';

/* ================= Animations ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

/* ================= Page ================= */
export default function AboutPage() {
  return (
    <main className="bg-[#F4F4F4] overflow-hidden">

      {/* ================= Hero ================= */}
      <section className="py-28 px-4 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold text-[#2563EB] mb-10"
        >
          من نحن
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="max-w-5xl mx-auto text-lg md:text-xl leading-relaxed text-[#4B4B4B] mb-10"
        >
          إحنا شركة مصرية متخصصة في <strong>إدارة المديونيات والتحصيل والاستعلام الائتماني</strong>.  
          خبرتنا ممتدة عبر <strong>سنوات طويلة</strong> في التعامل مع كبرى البنوك والمؤسسات المالية داخل جمهورية مصر العربية،  
          ونقدّم خدمات دقيقة وموثوقة لكل عملائنا.
        </motion.p>

        <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <Highlight icon={<Building2 size={28} />} text="تعاون مع كبرى البنوك" />
          <Highlight icon={<SearchCheck size={28} />} text="خبرة في الاستعلام الميداني والائتماني" />
          <Highlight icon={<Users size={28} />} text="فرق عمل مدربة باحترافية" />
          <Highlight icon={<ShieldCheck size={28} />} text="التزام بالحوكمة وحماية البيانات" />
        </div>
      </section>

      {/* ================= About Content ================= */}
      <section className="max-w-6xl mx-auto px-4 space-y-14 pb-28">
        <Paragraph>
          من أول يوم، كان عندنا قناعة إن التحصيل والاستعلام مش أرقام وبس،  
          لكنه منظومة متكاملة بتقوم على التنظيم ودراسة الحالة واحترام جميع الأطراف.
        </Paragraph>

        <Paragraph>
          خبرتنا الطويلة في السوق المصري علمتنا إزاي نوازن بين تحقيق أفضل نتائج للبنوك،  
          والحفاظ على صورة العميل والالتزام الكامل بالقوانين.
        </Paragraph>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2">
          <Highlight icon={<Eye size={28} />} text="تحليل دقيق لكل حالة" />
          <Highlight icon={<Target size={28} />} text="حلول ذكية لتقليل المخاطر" />
          <Highlight icon={<Award size={28} />} text="نتائج مستمرة وموثوقة" />
          <Highlight icon={<Users size={28} />} text="فرق عمل محترفة ومدربة" />
        </div>
      </section>

      {/* ================= Vision / Mission / Values ================= */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-4 grid gap-10 md:grid-cols-3">
          <InfoCard
            icon={<Eye size={34} />}
            title="رؤيتنا"
            text="نكون الشريك المهني الأكثر ثقة للبنوك في مجالات التحصيل والاستعلام الائتماني داخل السوق المصري."
          />
          <InfoCard
            icon={<Target size={34} />}
            title="رسالتنا"
            text="تقديم حلول مدروسة تساعد البنوك على تقليل المخاطر وتعظيم العائد من خلال نظم عمل واضحة واحترافية."
          />
          <InfoCard
            icon={<ShieldCheck size={34} />}
            title="قيمنا"
            text="الالتزام – الاحتراف – الشفافية – احترام العميل – حماية البيانات."
          />
        </div>
      </section>

      {/* ================= Why Us ================= */}
      <section className="py-28 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-extrabold text-center text-[#2563EB] mb-16"
          >
            ليه كبرى البنوك بتختارنا؟
          </motion.h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Feature icon={<Building2 />} text="تعاون مستمر مع كبرى البنوك" />
            <Feature icon={<SearchCheck />} text="خبرة متراكمة في الاستعلام الميداني والائتماني" />
            <Feature icon={<Users />} text="فرق عمل مدربة على أعلى مستوى" />
            <Feature icon={<Award />} text="التزام كامل بالحوكمة والسرية" />
          </div>
        </div>
      </section>
      {/* ================= CEO ================= */}
        <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-4 grid gap-14 md:grid-cols-2 items-center">

            {/* Image */}
            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-xl"
            >
            <Image
                src="/ceo/wael-swelim.png"
                alt="المستشار وائل سويلم"
                fill
                className="object-cover"
                priority
            />
            </motion.div>

            {/* Text */}
            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center h-full"
            >
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#2563EB] mb-6">
                كلمة رئيس الشركة
            </h3>

            <p className="text-lg leading-loose text-[#4B4B4B] mb-6">
                الشركة اتبنت على مبدأ واضح: إن الشغل المنظم والالتزام هو أساس أي ثقة حقيقية.  
                ومن هنا اشتغلنا على بناء كيان مهني يخدم البنوك بأسلوب يحفظ الحقوق، ويحقق نتائج مستدامة.
            </p>

            <p className="text-lg leading-loose text-[#4B4B4B] mb-10">
                نجاحنا الحقيقي هو استمرار ثقة شركائنا، وده اللي بنعتبره أكبر إنجاز لينا.
            </p>

            {/* Signature in the middle */}
            <div className="flex flex-col items-center mt-6">
                <p className="font-bold text-xl mb-1">المستشار / وائل سويلم</p>
                <p className="text-sm text-[#4B4B4B] mb-2">رئيس الشركة – المؤسس</p>
                <div className="h-[2px] w-36 bg-[#2563EB]" />
            </div>
            </motion.div>

        </div>
        </section>
    </main>
  );
}

/* ================= Components ================= */

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.7 }}
      className="text-lg md:text-xl leading-[2.1] text-[#4B4B4B] first-letter:font-medium"
    >
      {children}
    </motion.p>
  );
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
      className="bg-[#F4F4F4] rounded-3xl p-10 shadow-lg text-center"
    >
      <div className="flex justify-center text-[#2563EB] mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold mb-4">{title}</h3>
      <p className="text-[#4B4B4B] leading-relaxed">{text}</p>
    </motion.div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-8 text-center shadow-md hover:scale-105 transition-transform"
    >
      <div className="flex justify-center text-[#2563EB] mb-4">
        {icon}
      </div>
      <p className="font-bold text-lg">{text}</p>
    </motion.div>
  );
}

function Highlight({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all"
    >
      <div className="text-[#2563EB] mb-3">
        {icon}
      </div>
      <p className="font-semibold text-[#4B4B4B]">{text}</p>
    </motion.div>
  );
}
