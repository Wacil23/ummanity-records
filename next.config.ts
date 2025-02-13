import type { NextConfig } from "next";
import { env } from "process";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    facebookMetaToken: env.FACEBOOK_METADATA_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
