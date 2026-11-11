import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sección para permitir imágenes de tailus.io
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "",
        pathname: "/**",
      },
    ],
  },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
