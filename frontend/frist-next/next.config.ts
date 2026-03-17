/// <reference path="./next-allowed-dev-origins.d.ts" />

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: [
      "http://192.168.1.2:3000",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://192.168.1.3:3000",
      "http://192.168.1.4:3000",
    ],
  },
};

export default nextConfig;