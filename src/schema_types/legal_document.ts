import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalDocument",
  type: "document",
  fields: [
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Privacy Policy", value: "privacy_policy" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", type: "bodyContent" }),
    defineField({
      name: "effectiveAt",
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
    select: { title: "type" },
  },
});
