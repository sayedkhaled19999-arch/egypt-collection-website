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
    '/blog',     // المدونة
    '/services/collection',  // خدمات التحصيل
    '/services/investigation',  // خدمات الاستعلام
  ];

  // 2. معرفات الوظائف (الديناميكية)
  const jobIds = [
    'office-collector',
    'field-collector',
    'field-investigator',
    'data-entry'
  ];

  // 3. معرفات فروع الوظائف
  const branchSlugs = [
    'dokki-headquarters',
    'monufia',
    'beheira',
    'minya',
    'ismailia',
    'qena'
  ];

  // 4. معرفات المقالات
  const blogSlugs = [
    'how-to-apply',
    'office-vs-field',
    'field-investigator-guide',
    'data-entry-career'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // أولاً: تكرار الصفحات الثابتة لكل لغة
  staticPaths.forEach((path) => {
    locales.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '/jobs' || path === '/blog' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path.startsWith('/services') ? 0.9 : 0.8,
      });
    });
  });

  // ثانياً: تكرار صفحات الوظائف لكل لغة
  jobIds.forEach((id) => {
    locales.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/jobs/${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.95,
      });
    });
  });

  // ثالثاً: صفحات فروع التوظيف
  branchSlugs.forEach((slug) => {
    locales.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/careers/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  // رابعاً: المقالات
  blogSlugs.forEach((slug) => {
    locales.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}