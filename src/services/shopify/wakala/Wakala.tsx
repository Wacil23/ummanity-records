import { createAdminApiClient } from "@shopify/admin-api-client";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const wakalaClient = createStorefrontApiClient({
  storeDomain: "https://mywakala.com",
  apiVersion: "2025-01",
  publicAccessToken: "6653d4a9699c568b211ec425a91fae8e",
});

export const wakalaAdminClient = createAdminApiClient({
  storeDomain: "b77596-61.myshopify.com",
  apiVersion: "2025-01",
  accessToken: "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",
});
