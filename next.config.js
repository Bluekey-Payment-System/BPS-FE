/** @type {import('next').NextConfig} */

const path = require('path'); 

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "src/styles/variables.scss"; @import "src/styles/mixins.scss";`, 
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
}

module.exports = nextConfig;
