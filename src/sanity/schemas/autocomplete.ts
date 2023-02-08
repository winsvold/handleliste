import { MdFlashOn } from "react-icons/md";
import { defineType } from "sanity";

export default defineType({
  name: "autocomplete",
  title: "Autocomplete",
  type: "document",
  icon: MdFlashOn,
  fields: [
    {
      name: "options",
      type: "array",
      of: [
        {
          name: "option",
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "timesUsed",
              type: "number",
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "timesUsed",
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({
      title: "Autocomplete",
    }),
  },
});
