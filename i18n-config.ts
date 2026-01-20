// --- FILE: i18n-config.ts ---
export const i18n = {
  defaultLocale: 'ar', // لازم دي تكون ar
  locales: ['ar', 'en'], // خلي ar في الأول
} as const;

export type Locale = (typeof i18n)['locales'][number];