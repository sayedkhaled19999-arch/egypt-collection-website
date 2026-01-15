/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 1. التوجيه القديم بتاعك (بيحول من www لـ non-www)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.egyptcollections.com' }],
        destination: 'https://egyptcollections.com/:path*',
        permanent: true,
      },
      // 2. التوجيه الجديد (عشان تحل مشكلة Google Search Console)
      {
        source: '/partners',      // أي حد يدخل هنا
        destination: '/customers', // يتحول هنا فوراً
        permanent: true,          // 301 Redirect (جوجل بيفهم إن الصفحة اتنقلت للأبد)
      },
    ];
  },
};

module.exports = nextConfig;