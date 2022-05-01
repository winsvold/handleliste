import { SanityCodegenConfig } from 'sanity-codegen';

const config: SanityCodegenConfig = {
  schemaPath: './studio/schemas/schema.ts',
  outputPath: './schema.types.ts',
};

export default config;