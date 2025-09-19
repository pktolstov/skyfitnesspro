/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      unoptimized: true, // нужно для Cloudflare
    },
    experimental: {
      runtime: 'edge', // если используешь Edge Functions
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/fitness/main',
          permanent: true,
        },
      ];
    },
  };
  
  module.exports = nextConfig;