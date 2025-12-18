import { defineField, defineType } from "sanity";

export default defineType({
  name: "tag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "string" }),
    defineField({ name: "slug", type: "slug" }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
