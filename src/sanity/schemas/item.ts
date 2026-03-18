import { defineType } from "sanity";
import { CheckCircle } from "react-feather";

export default defineType({
  name: "item",
  title: "Item",
  type: "object",
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "listName",
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
        media: selection.checked ? CheckCircle : null,
      };
    },
  },
});
