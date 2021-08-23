import S from "@sanity/desk-tool/structure-builder";
import handleListe from "./schemas/handleListe";

export default () =>
  S.list()
    .title("Innhold")
    .items([
        S.listItem()
            .title("Handleliste")
            .icon(handleListe.icon)
            .child(
                S.editor()
                    .schemaType("handleListe")
                    .documentId("handleListe")
            ),
      ...S.documentTypeListItems().filter((listItem) => !["handleListe"].includes(listItem.getId())),
    ]);
