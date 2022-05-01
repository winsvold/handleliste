import { createPreviewSubscriptionHook, createClient, ClientConfig } from "next-sanity";
import { isClient, isProduction } from "./environment";
import createImageUrlBuilder from "@sanity/image-url";

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

export const urlFor = (source: any) => createImageUrlBuilder(config as SanityProjectDetails).image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(config as SanityProjectDetails);

export const sanityClient = createClient(config);

import { isDevelopment } from "./environment";
import { SanityProjectDetails } from "@sanity/image-url/lib/types/types";

export function getStudioUrl() {
  if (isDevelopment() && isClient()) {
    return location.origin + "/cms";
  }

  return "/cms";
}
