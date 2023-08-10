/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@use "src/styles/variables.scss" as *; @use "src/styles/mixins.scss" as *;`,
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  // 테스트용 (추후 삭제 예정)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bootcamp-project-api.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
