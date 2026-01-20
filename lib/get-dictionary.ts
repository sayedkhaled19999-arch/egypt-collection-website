// --- START OF FILE lib/get-dictionary.ts ---
import 'server-only';
import type { Locale } from '@/i18n-config';

// بنحدد مسار ملفات الترجمة
const dictionaries = {
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();