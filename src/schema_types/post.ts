import { defineArrayMember, defineField, defineType } from "sanity";
import { displayInternationalizedArrayString } from "../utils/i18n.ts";
import slugify from "github-slugid";

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
      type: "image",
      fields: [
        defineField({
          name: "description",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "title",
        slugify: (input) => {
          return slugify(input);
        },
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
            "filter": ({ document }) => {
              const language = document["language"];

              if (typeof language === "string") {
                return {
                  filter: "language == $language",
                  params: {
                    language,
                  },
                };
              }

              return {};
            },
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
            "filter": ({ document }) => {
              const language = document["language"];

              if (typeof language === "string") {
                return {
                  filter: "language == $language",
                  params: {
                    language,
                  },
                };
              }

              return {};
            },
          },
        }),
      ],
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
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
    }),
  ],

  preview: {
    select: { title: "title" },
    prepare(selection): Record<string, string> {
      return {
        title: displayInternationalizedArrayString(selection.title),
      };
    },
  },
});
