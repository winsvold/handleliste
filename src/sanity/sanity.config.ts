import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { redirectToFrontend } from "./redirectToFrontend";
import schemas from "./schemas";

export default defineConfig({
  name: "Handleliste",
  title: "Handleliste sanity studio",

  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  basePath: "/studio",

  plugins: [deskTool(), visionTool()],
  tools: [redirectToFrontend()],

  schema: {
    types: schemas,
  },
});
