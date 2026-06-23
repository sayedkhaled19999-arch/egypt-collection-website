'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle, Search, Phone } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
      >
        <span className="font-bold text-lg text-[#4B4B4B] pr-4">{question}</span>
        <ChevronDown
          size={24}
          className={`text-[#2563EB] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="px-6 pb-6 text-[#4B4B4B] leading-relaxed">{answer}</p>
      </div>
    </motion.div>
  );
}

interface FaqSectionProps {
  title: string;
  icon: React.ReactNode;
  items: { q: string; a: string }[];
  openIndex: number | null;
  onToggle: (index: number) => void;
}

function FaqSection({ title, icon, items, openIndex, onToggle }: FaqSectionProps) {
  return (
    <section className="mb-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="text-[#2563EB]">{icon}</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#2563EB]">{title}</h2>
      </motion.div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <FaqItem
            key={index}
            question={item.q}
            answer={item.a}
            isOpen={openIndex === index}
            onToggle={() => onToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}

interface FaqClientProps {
  lang: string;
  dict: any;
}

export default function FaqClient({ lang, dict }: FaqClientProps) {
  const [openCollection, setOpenCollection] = useState<number | null>(null);
  const [openInvestigation, setOpenInvestigation] = useState<number | null>(null);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="py-24 px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9 }}
          className="flex justify-center mb-6"
        >
          <HelpCircle size={48} className="text-[#2563EB]" />
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold text-[#2563EB] mb-4"
        >
          {dict.faqPage.hero_title}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="text-lg md:text-xl text-[#4B4B4B] max-w-3xl mx-auto"
        >
          {dict.faqPage.hero_desc}
        </motion.p>
      </section>

      <div className="max-w-4xl mx-auto px-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <FaqSection
          title={dict.faqPage.collection_title}
          icon={<Search size={28} />}
          items={dict.faqPage.questions.collection}
          openIndex={openCollection}
          onToggle={(i) => setOpenCollection(openCollection === i ? null : i)}
        />

        <FaqSection
          title={dict.faqPage.investigation_title}
          icon={<Phone size={28} />}
          items={dict.faqPage.questions.investigation}
          openIndex={openInvestigation}
          onToggle={(i) => setOpenInvestigation(openInvestigation === i ? null : i)}
        />
      </div>

      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-10 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2563EB] mb-4">
            {dict.faqPage.still_contact}
          </h2>
          <p className="text-[#4B4B4B] mb-8 text-lg">
            {dict.faqPage.still_contact_desc}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#1e4bb8] transition transform hover:scale-105"
          >
            <Phone size={20} />
            {dict.faqPage.contact_btn}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
