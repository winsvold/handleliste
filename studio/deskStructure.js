import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Innhold")
    .items([
      ...S.documentTypeListItems().filter((listItem) => ![].includes(listItem.getId())),
    ]);
