import { FaWineBottle } from "react-icons/fa";
import { defineType } from "sanity";

const godtKjop = defineType({
  name: "godtKjop",
  title: "Godt kjøp",
  type: "document",
  icon: FaWineBottle,
  fields: [
    {
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    },
    {
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "rating",
      type: "number",
      description: "0 - Ok | 1 - Bra | 2 - Veldig bra | 3 - Fantastisk",
      validation: (Rule: any) => Rule.min(0).max(3),
    },
    {
      name: "kommentar",
      type: "text",
      rows: 4,
    },
    {
      name: "kategorier",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "kategori" }],
        },
      ],
    },
    {
      name: "butikker",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "butikk" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "kategori[0].name",
    },
  },
});

export default godtKjop;
