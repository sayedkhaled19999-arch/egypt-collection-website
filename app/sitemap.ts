import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.egyptcollections.com';

  // 1. تعريف الصفحات الثابتة (ضفنا privacy هنا)
  const routes = [
    '',
    '/about',
    '/contact',
    '/jobs',
    '/partners',
    '/privacy', // 👇 ضفناها هنا عشان تتأرشف
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    // الوظائف بتتحدث أسبوعياً، الباقي شهرياً، والخصوصية سنوياً أو شهرياً (مش هتفرق خليها شهري)
    changeFrequency: route === '/jobs' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. تعريف صفحات الوظائف الديناميكية
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
    priority: 0.9, 
  }));

  // 3. دمج الكل
  return [...routes, ...jobRoutes];
}