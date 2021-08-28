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
