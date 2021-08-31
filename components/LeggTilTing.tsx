import Button from "./basicComponents/Button";
import React, { FormEvent, useState } from "react";
import { sanityClient } from "../utils/sanity";
import { handlelisteDocId, Item } from "../pages";
import styled from "styled-components";
import { guid } from "../studio/utils/guid";
import useSWR  from "swr";
import AutoComplete from "./AutoComplete";

interface Props {
  reload: () => void;
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
  name: string,
  timesUsed: number,
  _key: string
};

interface Autocomplete {
  options: AutoCompleteOption[]
}

async function updateAutocompleteDictionary(input: string, autocompleteResponse?: Autocomplete) {
  const autoCompleteOption = autocompleteResponse?.options.find(it => it.name === input);

  if (!autoCompleteOption) {
    const newAutocompleteOption: AutoCompleteOption = {
      name: input,
      _key: guid(),
      timesUsed: 1
    };
    await sanityClient
      .patch(autocompleteDocId)
      .append("options", [newAutocompleteOption])
      .commit();
  } else {
    const updatedAutocompleteOption: AutoCompleteOption = {
      ...autoCompleteOption,
      timesUsed: autoCompleteOption.timesUsed + 1
    };
    await sanityClient
      .patch(autocompleteDocId)
      .insert("replace", `options[_key=="${autoCompleteOption._key}"]`, [updatedAutocompleteOption])
      .commit();
  }
}

async function addItemToHandleliste(input: string) {
  const newItem: Item = { name: input, _key: guid(), checked: false };
  await sanityClient
    .patch(handlelisteDocId)
    .append("items", [newItem])
    .commit();
}

function LeggTilTing(props: Props) {
  const autocompleteResponse = useSWR<Autocomplete>(autocompleteQuery, (q) => sanityClient.fetch(q));
  const [input, setInput] = useState("");

  const onSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (input.length === 0) return;
    setInput("");
    await addItemToHandleliste(input);
    await updateAutocompleteDictionary( input, autocompleteResponse.data);
    props.reload();
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledAutocomplete
        label="Nytt element"
        value={input}
        items={autocompleteResponse.data?.options.map(it => it.name) || []}
        onChange={(v) => setInput(v)}
        onSelect={setInput}
      />
      <Button onClick={() => onSubmit()}>Legg til</Button>
    </StyledForm>
  );
}

export default LeggTilTing;
