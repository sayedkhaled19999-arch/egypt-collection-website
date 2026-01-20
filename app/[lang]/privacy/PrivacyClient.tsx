// --- START OF FILE components/PrivacyClient.tsx ---

'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  Server,
  Phone,
  Facebook,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

interface PrivacyClientProps {
  dict: any;
}

export default function PrivacyClient({ dict }: PrivacyClientProps) {

  return (
    <main className="bg-[#F4F4F4] overflow-hidden">

      {/* ================= Hero ================= */}
      <section className="py-24 px-4 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-5xl font-extrabold text-[#2563EB] mb-8"
        >
          {dict.privacyPage.hero_title}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="max-w-4xl mx-auto text-lg md:text-xl leading-relaxed text-[#4B4B4B] mb-10"
        >
          {dict.privacyPage.hero_desc}
        </motion.p>

        <div className="max-w-3xl mx-auto grid gap-6 sm:grid-cols-3">
          <Highlight icon={<Lock size={28} />} text={dict.privacyPage.highlights.security} />
          <Highlight icon={<Server size={28} />} text={dict.privacyPage.highlights.compliance} />
          <Highlight icon={<UserCheck size={28} />} text={dict.privacyPage.highlights.legal} />
        </div>
      </section>

      {/* ================= Main Content ================= */}
      <section className="max-w-5xl mx-auto px-4 space-y-12 pb-24">
        
        {/* 1. مقدمة هامة */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-bold text-[#2563EB] mb-6 flex items-center gap-2">
                <ShieldCheck /> {dict.privacyPage.intro.title}
            </h2>
            <Paragraph>
                {dict.privacyPage.intro.desc}
            </Paragraph>
            <ul className="list-disc list-inside space-y-3 mt-4 text-[#4B4B4B] text-lg leading-loose marker:text-[#2563EB]">
                <li><strong>{dict.privacyPage.intro.source1}</strong></li>
                <li><strong>{dict.privacyPage.intro.source2}</strong></li>
            </ul>
        </div>

        {/* 2. التوظيف وإعلانات فيسبوك */}
        <div className="grid gap-8 md:grid-cols-2">
            <InfoCard 
                icon={<FileText size={32} />}
                title={dict.privacyPage.cards.jobs_title}
                text={dict.privacyPage.cards.jobs_text}
            />
            <InfoCard 
                icon={<Facebook size={32} />}
                title={dict.privacyPage.cards.ads_title}
                text={dict.privacyPage.cards.ads_text}
            />
        </div>

        {/* 3. مشاركة البيانات */}
        <div className="bg-[#2563EB] text-white rounded-3xl p-8 md:p-12 shadow-lg text-center">
             <h2 className="text-2xl font-bold mb-4">{dict.privacyPage.sharing.title}</h2>
             <p className="text-lg leading-loose max-w-3xl mx-auto opacity-90">
                <strong>{dict.privacyPage.sharing.text_bold}</strong><br/>
                {dict.privacyPage.sharing.text_body}
             </p>
        </div>

        {/* 4. التواصل */}
        <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-[#4B4B4B] mb-4">{dict.privacyPage.contact.title}</h3>
            <p className="text-[#4B4B4B] mb-6">{dict.privacyPage.contact.desc}</p>
            <div className="inline-flex flex-col items-center bg-white px-8 py-6 rounded-2xl shadow-md">
                <div className="text-[#2563EB] mb-2"><Phone size={24} /></div>
                <p className="font-bold text-lg text-[#4B4B4B]">{dict.privacyPage.contact.address}</p>
                <p className="text-[#4B4B4B] mt-1">{dict.privacyPage.contact.email}</p>
            </div>
        </div>

      </section>
    </main>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.7 }}
      className="text-lg leading-[2] text-[#4B4B4B]"
    >
      {children}
    </motion.div>
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
      className="bg-white rounded-3xl p-8 shadow-md text-center border border-gray-100"
    >
      <div className="flex justify-center text-[#2563EB] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-[#333]">{title}</h3>
      <p className="text-[#4B4B4B] leading-relaxed text-sm md:text-base">{text}</p>
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
      className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
    >
      <div className="text-[#2563EB] mb-2">
        {icon}
      </div>
      <p className="font-semibold text-[#4B4B4B] text-sm">{text}</p>
    </motion.div>
  );
}