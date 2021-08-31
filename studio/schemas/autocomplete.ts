import { MdFlashOn } from "react-icons/md";

export default {
  name: "autocomplete",
  title: 'Autocomplete',
  type: "document",
  icon: MdFlashOn,
  __experimental_actions: ["update", "publish"], // Har du laget et nytt datasett må du midlertidig fjerne denne for å kunne lage et nytt oppsett-dokument
  fields: [
    {
      name: "options",
      type: "array",
      of: [{
        name: 'option',
        type: 'object',
        fields: [
          {
            name: 'name',
            type: 'string'
          },
          {
            name: 'timesUsed',
            type: 'number'
          }
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'timesUsed'
          }
        }
      }]
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Autocomplete'
    })
  },
};
