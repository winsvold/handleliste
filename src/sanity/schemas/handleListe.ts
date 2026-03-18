import { ShoppingCart } from "react-feather";
import { defineType } from "sanity";

export default defineType({
  type: "document",
  name: "handleListe",
  title: "Handleliste",
  icon: ShoppingCart,
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
