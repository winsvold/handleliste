import { SanityCodegenConfig } from "sanity-codegen";

const config: SanityCodegenConfig = {
  schemaPath: "./src/sanity/schemas/index.ts",
  outputPath: "./src/sanity/schema.types.ts",
};

export default config;
