import Button from "./basicComponents/Button";
import React, { FormEvent, useState } from "react";
import { sanityClient } from "../utils/sanity";
import { handlelisteDocId, ListName } from "../pages";
import styled from "styled-components";
import { nanoid } from "nanoid";
import useSWR from "swr";
import AutoComplete from "./AutoComplete";
import { SanityKeyed } from "sanity-codegen";
import { useAuth } from "./AuthStatus";
import { Item } from "../sanity/schema.types";

interface Props {
  reload: () => void;
  listName: ListName;
}

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
`;

const StyledAutocomplete = styled(AutoComplete)`
  flex: 1;
`;

const autocompleteDocId = "autocomplete";
export const autocompleteQuery = `*[_id == "${autocompleteDocId}"][0]`;

type AutoCompleteOption = {
  name: string;
  timesUsed: number;
  _key: string;
};

interface Autocomplete {
  options: AutoCompleteOption[];
}

async function updateAutocompleteDictionary(input: string, autocompleteResponse?: Autocomplete) {
  if (!autocompleteResponse)
    throw new Error("Prøvde å legge til i autocomplete, men kunne ikke sjekke om den allerede fantes.");

  const cleanedInput = input.trim();

  const autoCompleteOption = autocompleteResponse?.options.find(
    (it) => it.name.toLowerCase() === cleanedInput.toLowerCase()
  );

  if (!autoCompleteOption) {
    console.log(`${cleanedInput} fantes ikke i autocomplete fra før, legger til`);
    const newAutocompleteOption: AutoCompleteOption = {
      name: cleanedInput,
      _key: nanoid(),
      timesUsed: 1,
    };
    await sanityClient.patch(autocompleteDocId).append("options", [newAutocompleteOption]).commit();
  } else {
    console.log(`${cleanedInput} fantes i autocomplete, bumper bruk med 1`);
    const updatedAutocompleteOption: AutoCompleteOption = {
      ...autoCompleteOption,
      timesUsed: autoCompleteOption.timesUsed + 1,
    };
    await sanityClient
      .patch(autocompleteDocId)
      .insert("replace", `options[_key=="${autoCompleteOption._key}"]`, [updatedAutocompleteOption])
      .commit();
  }
}

async function addItemToHandleliste(input: string, user: string, listName: ListName) {
  const newItem: SanityKeyed<Partial<Item>> = {
    addedBy: user,
    name: input,
    _key: nanoid(),
    checked: false,
    listName: listName,
  };
  await sanityClient.patch(handlelisteDocId).append("items", [newItem]).commit();
}

export const useAutocompleteResponse = () => useSWR<Autocomplete>(autocompleteQuery, (q) => sanityClient.fetch(q));

function LeggTilTing(props: Props) {
  const { data: autoCompleteData } = useAutocompleteResponse();
  const [input, setInput] = useState("");
  const name = useAuth().data?.name ?? "N/A";

  const onSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (input.length === 0) return;
    setInput("");
    await addItemToHandleliste(input, name, props.listName);
    await updateAutocompleteDictionary(input, autoCompleteData);
    props.reload();
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledAutocomplete label="Nytt element" value={input} onChange={setInput} />
      <Button type="submit">Legg til</Button>
    </StyledForm>
  );
}

export default LeggTilTing;
