import { isKeyedObject, SlugValidationContext } from "sanity";
import { type Value } from "sanity-plugin-internationalized-array";
import { API_VERSION } from "../env.ts";

export function isValue(value: unknown): value is Value {
  return isKeyedObject(value) && "value" in value;
}

export async function isUniqueOtherThanLanguage(
  slug: string,
  context: SlugValidationContext,
) {
  const { document, getClient } = context;

  if (!document?.language) {
    return true;
  }
  const client = getClient({ apiVersion: API_VERSION });
  const id = document._id.replace(/^drafts\./, "");
  const params = { id, language: document.language, slug };

  const query = `!defined(*[
    !(sanity::versionOf($id)) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`;

  const result = await client.fetch(query, params);
  return result;
}
