// deno-lint-ignore-file no-process-global
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/schema_types/mod.ts";
// import { SANITY_DATASET, SANITY_ID } from "@/env.ts";
import {
  internationalizedArray,
  type Language,
} from "sanity-plugin-internationalized-array";
import { documentInternationalization } from "@sanity/document-internationalization";
import { i18n, localeMap } from "./src/language.ts";
// import { media } from "sanity-plugin-media";
import { codeInput } from "@sanity/code-input";
// import process from "node:process";

function toLanguages(map: Record<string, string>): Language[] {
  return Object.entries(map).map(([id, title]) => ({ id, title }));
}

const languages = /* /@__PURE__/ */ toLanguages(localeMap);

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [
    structureTool(),
    visionTool(),
    internationalizedArray({
      languages,
      defaultLanguages: [i18n.defaultLang],
      fieldTypes: ["string", "bodyContent"],
      buttonAddAll: false,
    }),
    documentInternationalization({
      supportedLanguages: languages,
      schemaTypes: ["post.page", "category"],
    }),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
});
