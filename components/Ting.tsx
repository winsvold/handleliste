import styled from "styled-components/macro";
import { handlelisteDocId } from "../pages";
import Checkbox from "./basicComponents/Checkbox";
import { sanityClient } from "../utils/sanity";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { Item } from "../schema.types";
import { SanityKeyed } from "sanity-codegen";
import { useAuth } from "./AuthStatus";

const Style = styled.li`
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 0 1rem;
  align-items: center;
  & + & {
    margin-top: 0.35em;
  }
  > *:first-child {
    transition: 0.2s;
    &:hover {
      transform: scale(1.05);
    }
  }
  input {
    min-width: 1.2rem;
  }
`;

const Meta = styled.p`
  font-size: 0.5rem;
  color: #aaa;
`;

interface Props {
  ting: SanityKeyed<Item>;
  reload: () => void;
}

function Ting(props: Props) {
  const [checked, setChecked] = useState(props.ting.checked);
  const [isUpdating, setIsUpdating] = useState(false);
  const ting = props.ting;
  const user = useAuth().data?.name;

  useLayoutEffect(() => {
    if (!isUpdating) {
      setChecked(!!props.ting.checked);
      setIsUpdating(false);
    }
  }, [isUpdating, props.ting.checked]);

  const onCheck = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.target.checked);
    const oppdatertTing: Item = { ...ting, checked: e.target.checked, checkedBy: user };
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
    } finally {
      props.reload();
    }
  };

  return (
    <Style key={props.ting.name}>
      <Checkbox label={props.ting.name} onChange={(e) => onCheck(e)} checked={checked} type="checkbox" />
      <Meta>
        🖊 {ting.addedBy?.split(" ")[0]} {ting.checked && ` - 🛒 ${ting.checkedBy?.split(" ")[0]}`}
      </Meta>
    </Style>
  );
}

export default Ting;
