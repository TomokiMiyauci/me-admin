import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "string" }),
    defineField({
      name: "coverImage",
      type: "picture",
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
    select: { title: "title" },
  },
});
