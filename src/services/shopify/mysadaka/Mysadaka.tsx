import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { createAdminApiClient } from "@shopify/admin-api-client";

export const mySadakaClient = createStorefrontApiClient({
  storeDomain: "https://mysadaka.fr",
  apiVersion: "2025-01",
  publicAccessToken: process.env.MYSADAKA_PUBLIC_ACCESS_TOKEN ?? "",
});

export const mySadakaAdminClient = createAdminApiClient({
  storeDomain: "341f53-3.myshopify.com",
  apiVersion: "2024-10",
  accessToken: process.env.MYSADAKA_ACCESS_TOKEN ?? "",
});
