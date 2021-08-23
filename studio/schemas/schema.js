import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import handleListe from "./handleListe";
import item from "./item";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([handleListe, item]),
});
