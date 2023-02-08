import { FaStoreAlt } from "react-icons/fa";
import { defineType } from "sanity";

export default defineType({
  name: "butikk",
  title: "Butikk",
  type: "document",
  icon: FaStoreAlt,
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
