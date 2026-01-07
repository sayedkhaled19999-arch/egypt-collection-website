import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // 👇 التعديل المهم هنا: شيلنا www عشان يبقى متوافق مع باقي الموقع
  const baseUrl = 'https://egyptcollections.com';

  // 1. هنا بنرص الصفحات الثابتة اللي في موقعك
  const routes = [
    '',
    '/about',
    '/contact',
    '/jobs',
    '/Customers',
    '/privacy', 
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    // الوظائف بتتحدث كل أسبوع، الباقي كل شهر (كدا زي الفل)
    changeFrequency: route === '/jobs' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
    priority: route === '' ? 1 : 0.8, // الصفحة الرئيسية أهم حاجة (1)، الباقي أقل سنة (0.8)
  }));

  // 2. هنا بنعمل روابط صفحات الوظائف بشكل أوتوماتيك
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
    priority: 0.9, // الوظائف مهمة جداً فنديلها أولوية عالية
  }));

  // 3. بنلم كله على بعضه ونرجعه لجوجل
  return [...routes, ...jobRoutes];
}