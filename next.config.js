/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      unoptimized: true, // важно для Cloudflare, чтобы Image компонент работал без node server
    },
  };
  
  module.exports = nextConfig;