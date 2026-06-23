'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Calendar, Clock, Tag } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

interface Props { lang: string; slug: string; dict: any; article: any; }

export default function ArticleClient({ lang, slug, dict, article }: Props) {
  const BackIcon = lang === 'ar' ? ChevronRight : ChevronLeft;

  return (
    <main className="bg-[#F4F4F4] min-h-screen">
      <section className="max-w-4xl mx-auto px-4 py-24">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          <Link href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-[#2563EB] font-bold mb-8 hover:gap-3 transition-all">
            <BackIcon className="w-5 h-5" />
            {lang === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
          </Link>
        </motion.div>

        <motion.article initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {lang === 'ar' ? '5 دقائق' : '5 min'}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#333] mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg md:text-xl text-[#4B4B4B] leading-relaxed mb-8 border-r-4 border-[#2563EB] pr-6">
            {article.desc}
          </p>

          <div className="prose prose-lg max-w-none text-[#4B4B4B] leading-relaxed space-y-4">
            <p>{article.content}</p>
            <p>{lang === 'ar'
              ? 'شركة ECC توفر فرص عمل ممتازة في مجال التحصيل والاستعلام لكل المحافظات. قدم الآن وكن جزء من فريقنا.'
              : 'ECC provides excellent job opportunities in collection and investigation for all governorates. Apply now and be part of our team.'}
            </p>
            <p>{lang === 'ar'
              ? 'مميزات العمل في ECC: راتب ثابت، عمولات مجزية، تأمين اجتماعي، تدريب مستمر، وفرص ترقي حقيقية.'
              : 'Benefits of working at ECC: fixed salary, high commissions, social insurance, continuous training, and real promotion opportunities.'}
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-[#2563EB]" />
              <span className="font-bold text-[#333]">{dict.blogPage.related}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string, i: number) => (
                <span key={i} className="bg-blue-50 text-[#2563EB] px-4 py-2 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
          className="mt-12 text-center">
          <Link href={`/${lang}/jobs`}
            className="inline-block bg-[#2563EB] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-[#1d4ed8] hover:scale-105 transition-all text-lg">
            {lang === 'ar' ? 'تصفح الوظائف المتاحة' : 'Browse Available Jobs'}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
