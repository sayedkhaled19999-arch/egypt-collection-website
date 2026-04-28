// --- START OF FILE next.config.js ---

/** @type {import('next').NextConfig} */
const nextConfig = {
  // الحل السحري لمشكلة الصور مع المسارات العربي
  images: {
    unoptimized: true,
  },
  
  // التوجيه الخاص بـ www و 404
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.egyptcollections.com' }],
        destination: 'https://egyptcollections.com/:path*',
        permanent: true,
      },
      // ✅ إضافة redirect لصفحة /Customers (اللي جوجل شايفها 404)
      {
        source: '/Customers',
        destination: '/ar/partners',
        permanent: true, // 301 redirect
      },
      // ✅ أي إصدارات تانية من Customers بحروف كبيرة/صغيرة
      {
        source: '/customers',
        destination: '/ar/partners',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;