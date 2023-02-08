import { BiCart } from "react-icons/bi";
import { defineType } from "sanity";

export default defineType({
  type: "document",
  name: "handleListe",
  title: "Handleliste",
  icon: BiCart,
  fields: [
    {
      name: "items",
      type: "array",
      of: [{ type: "item" }],
    },
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Handleliste",
      };
    },
  },
});
