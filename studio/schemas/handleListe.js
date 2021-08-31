import { BiCart } from "react-icons/bi";

export default {
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
    prepare(selection) {
      return {
        title: "Handleliste",
      };
    },
  },
};
