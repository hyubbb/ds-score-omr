/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // TypeScript 에러 무시 임시 빌드를 위해서
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint 경고 무시 임시 빌드를 위해서
  },
};

module.exports = nextConfig;
