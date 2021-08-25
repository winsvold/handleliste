import styled from "styled-components/macro";
import { Item } from "../pages";
import Checkbox from "./basicComponents/Checkbox";

const Style = styled.li`
  & + & {
    margin-top: 0.35em;
  }
`;

interface Props {
  ting: Item;
  isChecked: boolean;
  onCheck: (ting: Item, check: boolean) => void;
}

function Ting(props: Props) {
  return (
    <Style key={props.ting.name}>
      <Checkbox
        label={props.ting.name}
        onClick={() => props.onCheck(props.ting, !props.isChecked)}
        checked={props.isChecked}
        type="checkbox"
      />
    </Style>
  );
}

export default Ting;
