import { defineField, defineType } from "sanity";

export default defineType({
  name: "redirect",
  type: "document",
  fields: [
    defineField({
      name: "from",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ "relativeOnly": true, allowRelative: true }),
    }),
    defineField({
      name: "to",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ "relativeOnly": true, allowRelative: true }),
    }),
    defineField({
      name: "permanent",
      type: "boolean",
    }),
  ],
});
