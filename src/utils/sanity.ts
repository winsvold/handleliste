import createImageUrlBuilder, { type SanityProjectDetails } from "@sanity/image-url";
import { ClientConfig, createClient } from "next-sanity";
import sanityConfig from "../sanity/sanity.config";
import { isProduction } from "./environment";

const config: ClientConfig = {
  dataset: sanityConfig.dataset,
  projectId: sanityConfig.projectId,
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

export const sanityClient = createClient(config);
