import { defineType } from "sanity";

export default defineType({
  name: "kategori",
  title: "Kategori",
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
