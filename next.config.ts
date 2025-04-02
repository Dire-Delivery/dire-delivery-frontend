import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // Serve AVIF/WebP instead of PNG/JPEG
  },
  compress: true, // Enable gzip compression
  experimental: {
    optimizeCss: true, // Reduce CSS size
  },
  output: 'standalone', // Optimize for serverless deployment
  reactStrictMode: true, // Improve debugging and performance
  swcMinify: true, // Enable SWC-based minification for better performance
};

export default nextConfig;
