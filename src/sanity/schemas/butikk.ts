import { defineType } from "sanity";

export default defineType({
  name: "butikk",
  title: "Butikk",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
