import { createImageUrlBuilder, createPreviewSubscriptionHook, createClient, ClientConfig } from "next-sanity";
import { isProduction } from "./environment";

const config: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  useCdn: isProduction(),
  apiVersion: "2021-08-23",
  withCredentials: true,
};

if (!config.projectId) {
  throw Error("The Project ID is not set. Check your environment variables.");
}
if (!config.dataset) {
  throw Error("The dataset name is not set. Check your environment variables.");
}

export const urlFor = (source: any) => createImageUrlBuilder(config).image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const sanityClient = createClient(config);

import { isDevelopment } from "./environment";

export function getStudioUrl() {
  if (isDevelopment()) {
    return location.origin + "/cms";
  }

  return "/cms";
}
