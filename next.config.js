/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 1. التوجيه الخاص بـ www خليه زي ما هو (ده ممتاز للسيو عشان توحيد الدومين)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.egyptcollections.com' }],
        destination: 'https://egyptcollections.com/:path*',
        permanent: true,
      },
      // تم حذف الجزء الخاص بـ partners نهائياً
      // الصفحة هتشتغل لوحدها طالما الملف بتاعها موجود في فولدر pages أو app
    ];
  },
};

module.exports = nextConfig;