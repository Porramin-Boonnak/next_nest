/// <reference path="./next-allowed-dev-origins.d.ts" />

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["*"],
  },
};

export default nextConfig;