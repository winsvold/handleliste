import S from "@sanity/desk-tool/structure-builder";
import handleListe from "./schemas/handleListe";
import autocomplete from "./schemas/autocomplete";

export default () =>
  S.list()
    .title("Innhold")
    .items([
      S.listItem()
        .title(handleListe.title)
        .icon(handleListe.icon)
        .child(S.editor().schemaType(handleListe.name).documentId(handleListe.name)),
      S.listItem()
        .title(autocomplete.title)
        .icon(autocomplete.icon)
        .child(S.editor().schemaType(autocomplete.name).documentId(autocomplete.name)),
      ...S.documentTypeListItems().filter(
        (listItem) => ![handleListe.name, autocomplete.name].includes(listItem.getId())
      ),
    ]);
