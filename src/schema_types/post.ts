import {
  defineArrayMember,
  defineField,
  defineType,
  ReferenceFilterResolver,
} from "sanity";
import { isUniqueOtherThanLanguage } from "../utils/validation.ts";

export default defineType({
  name: "post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "string" }),
    defineField({ name: "body", type: "bodyContent" }),
    defineField({
      name: "coverImage",
      type: "picture",
    }),
    defineField({
      name: "slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "title",
        isUnique: isUniqueOtherThanLanguage,
      },
    }),
    defineField({
      name: "authors",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "author" },
          options: {
            filter: createLanguageFilter(),
          },
        }),
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "category" },
          options: {
            filter: createLanguageFilter(),
          },
        }),
      ],
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{
        type: "reference",
        to: { type: "tag" },
        options: {
          filter: createLanguageFilter(),
        },
      }],
    }),
    defineField({
      name: "createdAt",
      type: "datetime",
    }),
    defineField({
      name: "updatedAt",
      type: "datetime",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});

function createLanguageFilter(): ReferenceFilterResolver {
  return (ctx) => {
    const language = ctx.document["language"];

    if (typeof language === "string") {
      return {
        filter: "language == $language",
        params: {
          language,
        },
      };
    }

    return {};
  };
}
