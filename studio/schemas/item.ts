import { GiCheeseWedge } from "react-icons/gi";
import { BsCheckBox } from "react-icons/bs";

export default {
  name: "item",
  type: "object",
  icon: GiCheeseWedge,
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "checked",
      type: "boolean",
    },
    {
      name: "checkedBy",
      type: "string",
    },
    {
      name: "addedBy",
      type: "string",
    },
    {
      name: "godtKjop",
      type: "reference",
      to: [{ type: "godtKjop" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      checked: "checked",
    },
    prepare(selection) {
      return {
        title: selection.name,
        media: selection.checked ? BsCheckBox : null,
      };
    },
  },
};
