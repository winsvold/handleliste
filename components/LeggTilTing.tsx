import Input from "./basicComponents/Input";
import Button from "./basicComponents/Button";
import React, { FormEvent, useState } from "react";
import { sanityClient } from "../utils/sanity";
import { handlelisteDocId } from "../pages";
import styled from "styled-components";
import { guid } from "../studio/utils/guid";
import useSWR from "swr";
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

const StyledInput = styled(Input)`
  flex: 1;
  color: var(--whiteish);
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

function LeggTilTing(props: Props) {
  const autocompleteResponse = useSWR<Autocomplete>(autocompleteQuery, (q) => sanityClient.fetch(q));
  const [input, setInput] = useState("");

  const onSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (input.length === 0) return;
    setInput("");
    await sanityClient
      .patch(handlelisteDocId)
      .append("items", [{ name: input, _key: guid() }])
      .commit();
    props.reload();
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <AutoComplete
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
