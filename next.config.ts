import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  experimental: {
    // Admin uploads go straight to Firebase Storage, so server actions only carry small JSON.
    serverActions: { bodySizeLimit: "2mb" },
  },
  // Old URLs from arcod.in / arcod.org / arcod.net → new pages (301).
  // Add more here once you have the full list of old page addresses.
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/:path*", destination: "/about", permanent: true },
      { source: "/our-team", destination: "/about#board", permanent: true },
      { source: "/projects", destination: "/programmes", permanent: true },
      { source: "/programs", destination: "/programmes", permanent: true },
      { source: "/current-projects", destination: "/programmes", permanent: true },
      { source: "/past-projects", destination: "/programmes?view=legacy", permanent: true },
      { source: "/photo-gallery", destination: "/gallery", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/donate", destination: "/contact#donate", permanent: true },
      { source: "/donation", destination: "/contact#donate", permanent: true },
    ];
  },
};

export default nextConfig;
