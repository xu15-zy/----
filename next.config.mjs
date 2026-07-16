/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',          // 静态导出，生成 out/ 目录
  images: { unoptimized: true }, // 静态站不支持 Image Optimization API
};

export default nextConfig;
