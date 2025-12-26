import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.collection.eg';

  // 1. تعريف الصفحات الثابتة
  const routes = [
    '',
    '/about',
    '/contact',
    '/jobs',
    '/partners',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/jobs' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. تعريف صفحات الوظائف الديناميكية (عشان جوجل يشفهم واحدة واحدة)
  const jobIds = [
    'office-collector',
    'field-collector',
    'field-investigator',
    'data-entry'
  ];

  const jobRoutes = jobIds.map((id) => ({
    url: `${baseUrl}/jobs/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // أولوية عالية عشان دي صفحات الهبوط للإعلانات
  }));

  // 3. دمج الكل
  return [...routes, ...jobRoutes];
}