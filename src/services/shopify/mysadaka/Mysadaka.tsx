import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { createAdminApiClient } from "@shopify/admin-api-client";

export const mySadakaClient = createStorefrontApiClient({
  storeDomain: "https://mysadaka.fr",
  apiVersion: "2025-01",
  publicAccessToken: "e0708cbad51d6ffd457eed2bae84fa6c",
});

export const mySadakaAdminClient = createAdminApiClient({
  storeDomain: "341f53-3.myshopify.com",
  apiVersion: "2024-10",
  accessToken: "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",
});
