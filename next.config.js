/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@use "src/styles/variables.scss" as *; @use "src/styles/mixins.scss" as *;`,
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  // MOCK 데이터 사용 간 이미지를 띄우기 위해 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
