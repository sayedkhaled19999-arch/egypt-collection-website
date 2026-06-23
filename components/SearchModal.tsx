'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface SearchModalProps {
  lang: string;
  dict: any;
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  type: 'job' | 'article';
  title: string;
  href: string;
}

export default function SearchModal({ lang, dict, isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim() || !dict) return [];

    const q = query.toLowerCase();
    const jobs = dict.jobsData ? Object.entries(dict.jobsData).map(([key, val]: any) => ({
      type: 'job' as const,
      title: val.title,
      href: `/${lang}/jobs/${key}`,
    })) : [];

    const articles = dict.blogPage?.articles
      ? Object.entries(dict.blogPage.articles).map(([key, val]: any) => ({
          type: 'article' as const,
          title: val.title,
          href: `/${lang}/blog/${key}`,
        }))
      : [];

    return [...jobs, ...articles].filter((item) =>
      item.title.toLowerCase().includes(q)
    );
  }, [query, dict, lang]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 px-4 border-b border-gray-200">
              <Search size={20} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.search?.placeholder || 'Search...'}
                className="flex-1 py-4 text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none text-base"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close search"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="py-2">
                  {results.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                    >
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          item.type === 'job'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.type === 'job'
                          ? dict.search?.jobs_found || 'Job'
                          : dict.search?.blog_found || 'Article'}
                      </span>
                      <span className="text-gray-700 group-hover:text-[#2563EB] transition-colors">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : query.trim() ? (
                <p className="py-10 text-center text-gray-400">
                  {dict.search?.no_results || 'No results found'}
                </p>
              ) : (
                <p className="py-10 text-center text-gray-400 text-sm">
                  {lang === 'ar' ? 'ابدأ الكتابة للبحث...' : 'Start typing to search...'}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
