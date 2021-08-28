import { FaPuzzlePiece } from "react-icons/fa";

export default {
  name: "kategori",
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
};
