/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["tesseract.js", "pdf-parse"],
  },
};

export default nextConfig;
