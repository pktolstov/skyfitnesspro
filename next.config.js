/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      runtime: 'edge', // Опционально, если хочешь Edge Functions
    },
    reactStrictMode: true,
    swcMinify: true,
    images: {
      unoptimized: true, // важно для Cloudflare, чтобы Image компонент работал без node server
    },
  };
  
  module.exports = nextConfig;