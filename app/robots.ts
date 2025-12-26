import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // السماح لكل العناكب (جوجل، بينج، ياهو...)
      allow: '/',     // السماح بدخول الموقع بالكامل
      disallow: '/private/', // (اختياري) لو عملت مجلد خاص مستقبلاً
    },
    sitemap: 'https://www.collection.eg/sitemap.xml', // رابط الخريطة اللي عملناها فوق
  };
}