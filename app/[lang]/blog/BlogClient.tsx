'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

interface Props { lang: string; dict: any; }

export default function BlogClient({ lang, dict }: Props) {
  const articles = Object.entries(dict.blogPage.articles as any).map(([slug, data]: [string, any]) => ({ slug, ...data }));

  return (
    <main className="bg-[#F4F4F4] min-h-screen">
      <section className="py-24 px-4 text-center">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold text-[#2563EB] mb-4">
          {dict.blogPage.title}
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-[#4B4B4B] max-w-3xl mx-auto">
          {dict.blogPage.subtitle}
        </motion.p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, i) => (
            <motion.div key={article.slug} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.1 }}>
              <Link href={`/${lang}/blog/${article.slug}`} className="block group">
                <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>2026</span>
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{lang === 'ar' ? '5 دقائق قراءة' : '5 min read'}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#333] group-hover:text-[#2563EB] transition-colors mb-4 leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-[#4B4B4B] text-base leading-relaxed mb-6 line-clamp-3">
                    {article.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 2).map((tag: string, ti: number) => (
                        <span key={ti} className="text-xs bg-blue-50 text-[#2563EB] px-3 py-1 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-2 text-[#2563EB] font-bold text-sm group-hover:gap-3 transition-all">
                      {dict.blogPage.read_more}
                      <ArrowLeft className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
