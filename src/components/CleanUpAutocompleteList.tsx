import { Autocomplete } from "../sanity/schema.types";
import { sanityClient } from "../utils/sanity";
import { autocompleteDocId, useAutocompleteResponse } from "./LeggTilTing";
import Button from "./basicComponents/Button";

export const CleanUpAutocompleteList = () => {
  const { data } = useAutocompleteResponse();

  const onClick = async () => {
    const currentOptions = data?.options;
    const newOptions = currentOptions
      ?.filter((option) => option.timesUsed > 1) // Fjerner de som bare er brukt en gang
      ?.filter((option, i, array) => array.findIndex((item) => item.name == option.name) === i); // Fjerner duplikater

    if (!newOptions?.length) throw new Error("Det skjedde en feil");

    const update: Partial<Autocomplete> = {
      // @ts-ignore
      options: newOptions,
    };

    await sanityClient.patch(autocompleteDocId).set(update).commit();
  };

  return <Button onClick={onClick}>Rydd i lista</Button>;
};
