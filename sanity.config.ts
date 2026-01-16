// deno-lint-ignore-file no-process-global
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemaTypes from "./src/schema_types/mod.ts";
import {
  internationalizedArray,
  type Language,
} from "sanity-plugin-internationalized-array";
import { documentInternationalization } from "@sanity/document-internationalization";
import { i18n, localeMap } from "./src/language.ts";
// import { media } from "sanity-plugin-media";
import { codeInput } from "@sanity/code-input";
import { media } from "sanity-plugin-media";

function toLanguages(map: Record<string, string>): Language[] {
  return Object.entries(map).map(([id, title]) => ({ id, title }));
}

const languages = /* /@__PURE__/ */ toLanguages(localeMap);

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [
    structureTool(),
    media(),
    internationalizedArray({
      languages,
      defaultLanguages: [i18n.defaultLang],
      fieldTypes: ["string", "bodyContent"],
      buttonAddAll: false,
    }),
    documentInternationalization({
      supportedLanguages: languages,
      schemaTypes: ["post", "category", "tag", "legalDocument", "blog", "home"],
    }),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
});
