import { defineField, defineType } from "sanity";

export default defineType({
  name: "picture",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "description",
          type: "string",
        }),
      ],
    }),
  ],
});
