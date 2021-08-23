import { BiCart } from "react-icons/bi";

export default {
  type: "document",
  name: "handleListe",
  icon: BiCart,
  __experimental_actions: ["update", "publish"], // Har du laget et nytt datasett må du midlertidig fjerne denne for å kunne lage et nytt oppsett-dokument
  fields: [
    {
      name: "items",
      type: "array",
      of: [{ type: "item" }],
    },
    {
      name: "checkedItems",
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
