import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "ieee-collabratec.ieee.org",
      },
      {
        protocol: "https",
        hostname: "standards.ieee.org",
      },
      {
        protocol: "https",
        hostname: "jobs.ieee.org",
      },
      {
        protocol: "https",
        hostname: "signalprocessingsociety.org",
      },
      {
        protocol: "https",
        hostname: "www.ieee.org",
      },
      {
        protocol: "https",
        hostname: "brand-experience.ieee.org",
      },
      {
        protocol: "https",
        hostname: "ieee.org",
      }
    ],
  },
};

export default nextConfig;
