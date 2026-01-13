import { defineField, defineType } from "sanity";

enum FieldSet {
  Advanced = "advanced",
}

export default defineType({
  name: "picture",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
      fieldset: FieldSet.Advanced,
    }),
  ],
  fieldsets: [
    {
      name: FieldSet.Advanced,
      options: {
        collapsed: true,
      },
    },
  ],
});
