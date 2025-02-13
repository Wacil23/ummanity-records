import { createAdminApiClient } from "@shopify/admin-api-client";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const wakalaClient = createStorefrontApiClient({
  storeDomain: "https://mywakala.com",
  apiVersion: "2025-01",
  publicAccessToken: process.env.WAKALA_PUBLIC_ACCESS_TOKEN,
});

export const wakalaAdminClient = createAdminApiClient({
  storeDomain: "b77596-61.myshopify.com",
  apiVersion: "2025-01",
  accessToken: process.env.WAKALA_ACCESS_TOKEN ?? "",
});
