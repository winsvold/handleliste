import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import handleListe from "./handleListe";
import item from "./item";
import godtKjop from "./godtKjop";
import kategori from "./kategori";
import butikk from "./butikk";
import autocomplete from "./autocomplete";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([handleListe, item, godtKjop, kategori, butikk, autocomplete]),
});
