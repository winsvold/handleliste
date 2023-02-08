import { FaPuzzlePiece } from "react-icons/fa";
import { defineType } from "sanity";

export default defineType({
  name: "kategori",
  title: "Kategori",
  type: "document",
  icon: FaPuzzlePiece,
  fields: [
    {
      name: "name",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
