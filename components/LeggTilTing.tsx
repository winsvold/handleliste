import Input from "./basicComponents/Input";
import Button from "./basicComponents/Button";
import { FormEvent, useState } from "react";
import { sanityClient } from "../utils/sanity";
import { handlelisteDocId } from "../pages";
import styled from "styled-components";
import { guid } from "../studio/utils/guid";

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
`;

function LeggTilTing(props: Props) {
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
      <StyledInput
        label="Legg til ting"
        enterKeyHint="send"
        type="text"
        placeholder="Sjokolade"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={() => onSubmit()}>Legg til</Button>
    </StyledForm>
  );
}

export default LeggTilTing;
