/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*', // كل الروابط
        has: [{ type: 'host', value: 'www.egyptcollections.com' }], // لو فيها www
        destination: 'https://egyptcollections.com/:path*', // حولها للنسخة بدون www
        permanent: true, // redirect دائم 301
      },
    ];
  },
};

module.exports = nextConfig;
