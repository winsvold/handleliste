import { GiCheeseWedge } from "react-icons/gi";
import { BsCheck } from "react-icons/bs";
import { defineType } from "sanity";

export default defineType({
  name: "item",
  title: "Item",
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
    prepare(selection: any) {
      return {
        title: selection.name,
        media: selection.checked ? BsCheck : null,
      };
    },
  },
});
