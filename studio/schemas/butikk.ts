import { FaStoreAlt } from "react-icons/fa";

export default {
  name: "butikk",
  type: "document",
  icon: FaStoreAlt,
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
