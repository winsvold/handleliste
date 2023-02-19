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
  const autoCompleteOption = autocompleteResponse?.options.find((it) => it.name === input);

  if (!autoCompleteOption) {
    const newAutocompleteOption: AutoCompleteOption = {
      name: input,
      _key: nanoid(),
      timesUsed: 1,
    };
    await sanityClient.patch(autocompleteDocId).append("options", [newAutocompleteOption]).commit();
  } else {
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
  const autocompleteResponse = useAutocompleteResponse();
  const [input, setInput] = useState("");
  const name = useAuth().data?.name ?? "N/A";

  const onSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (input.length === 0) return;
    setInput("");
    await addItemToHandleliste(input, name, props.listName);
    await updateAutocompleteDictionary(input, autocompleteResponse.data);
    props.reload();
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledAutocomplete label="Nytt element" value={input} onChange={setInput} />
      <Button onClick={() => onSubmit()}>Legg til</Button>
    </StyledForm>
  );
}

export default LeggTilTing;
