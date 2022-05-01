import styled from "styled-components/macro";
import { handlelisteDocId } from "../pages";
import Checkbox from "./basicComponents/Checkbox";
import { sanityClient } from "../utils/sanity";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { Item } from "../schema.types";
import { SanityKeyed } from "sanity-codegen";

const Style = styled.li`
  width: fit-content;
  & + & {
    margin-top: 0.35em;
  }
  transition: .2s;
  &:hover {
    transform: scale(1.05);
  }

  input {
    min-width: 1.2rem;
  }
`;

interface Props {
  ting: SanityKeyed<Item>;
  reload: () => void;
}

function Ting(props: Props) {
  const [checked, setChecked] = useState(props.ting.checked);
  const [isUpdating, setIsUpdating] = useState(false);


  useLayoutEffect(() => {
    if(!isUpdating) {
      setChecked(!!props.ting.checked)
      setIsUpdating(false);
    }
  
  }, [isUpdating, props.ting.checked])

  const onCheck = async (ting: SanityKeyed<Item>, e: ChangeEvent<HTMLInputElement>) => {
    console.log('e', e.target.checked)
    const oppdatertTing: Item = { ...ting, checked: e.target.checked };
    setIsUpdating(true);
    setChecked(e.target.checked);
    try {
      await sanityClient
      .patch(handlelisteDocId)
      .insert("replace", `[items[_key=="${ting._key}"]]`, [oppdatertTing])
      .commit();
    } catch (e) {
      alert("noe gikk galt");
      setIsUpdating(false);

    }
    finally {
      props.reload();  
    }

  };

  return (
    <Style key={props.ting.name}>
      <Checkbox
        label={props.ting.name}
        onChange={(e) => onCheck(props.ting, e)}
        checked={checked}
        type="checkbox"
      />
    </Style>
  );
}

export default Ting;
