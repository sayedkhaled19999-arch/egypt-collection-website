// --- START OF FILE next.config.js ---

/** @type {import('next').NextConfig} */
const nextConfig = {
  // الحل السحري لمشكلة الصور مع المسارات العربي
  images: {
    unoptimized: true,
  },
  // التوجيه الخاص بـ www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.egyptcollections.com' }],
        destination: 'https://egyptcollections.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;