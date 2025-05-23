
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "/FinanceProTricks" : "",
  assetPrefix: isProd ? "/FinanceProTricks/" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
