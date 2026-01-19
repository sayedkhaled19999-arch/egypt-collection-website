import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://egyptcollections.com';

  // 1. الصفحات الأساسية
  const routes = [
    '',
    '/about',
    '/contact',
    '/jobs',
    '/partners', // تأكد إن ده يطابق اسم الفولدر بالظبط
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    // الوظائف تتحدث أسبوعياً، الباقي شهرياً
    changeFrequency: route === '/jobs' ? 'weekly' : 'monthly',
    // الرئيسية (1)، الباقي (0.8)
    priority: route === '' ? 1 : 0.8,
  })) as MetadataRoute.Sitemap;

  // 2. صفحات الوظائف (ديناميكية)
  const jobIds = [
    'office-collector',
    'field-collector',
    'field-investigator',
    'data-entry'
  ];

  const jobRoutes = jobIds.map((id) => ({
    url: `${baseUrl}/jobs/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, // الوظائف أهم من صفحات "من نحن" وغيرها
  })) as MetadataRoute.Sitemap;

  // 3. تجميع الكل
  return [...routes, ...jobRoutes];
}