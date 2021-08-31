import styled from "styled-components/macro";
import { handlelisteDocId, Item } from "../pages";
import Checkbox from "./basicComponents/Checkbox";
import { sanityClient } from "../utils/sanity";

const Style = styled.li`
  & + & {
    margin-top: 0.35em;
  }
`;

interface Props {
  ting: Item;
  reload: () => void;
}

function Ting(props: Props) {
  const onCheck = async (ting: Item) => {
    const oppdatertTing: Item = { ...ting, checked: !ting.checked };
    await sanityClient
      .patch(handlelisteDocId)
      .insert("replace", `[items[_key=="${ting._key}"]]`, [oppdatertTing])
      .commit();
    props.reload();
  };

  return (
    <Style key={props.ting.name}>
      <Checkbox
        label={props.ting.name}
        onChange={() => onCheck(props.ting)}
        checked={!!props.ting.checked}
        type="checkbox"
      />
    </Style>
  );
}

export default Ting;
