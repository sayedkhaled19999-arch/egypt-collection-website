// --- START OF FILE app/sitemap.ts ---

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://egyptcollections.com';
  
  // اللغات الموجودة في الموقع
  const locales = ['ar', 'en'];

  // 1. مسارات الصفحات الثابتة
  const staticPaths = [
    '',          // الرئيسية
    '/about',    // من نحن
    '/contact',  // تواصل معنا
    '/jobs',     // الوظائف
    '/partners', // الشركاء
    '/privacy',  // الخصوصية
  ];

  // 2. معرفات الوظائف (الديناميكية)
  const jobIds = [
    'office-collector',
    'field-collector',
    'field-investigator',
    'data-entry'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // أولاً: تكرار الصفحات الثابتة لكل لغة
  staticPaths.forEach((path) => {
    locales.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${path}`, // النتيجة: /ar/about و /en/about
        lastModified: new Date(),
        changeFrequency: path === '/jobs' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    });
  });

  // ثانياً: تكرار صفحات الوظائف لكل لغة
  jobIds.forEach((id) => {
    locales.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/jobs/${id}`, // النتيجة: /ar/jobs/field-collector
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9, // الوظائف مهمة جداً
      });
    });
  });

  return sitemapEntries;
}