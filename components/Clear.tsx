import styled from "styled-components/macro";
import Button from "./basicComponents/Button";
import { sanityClient } from "../utils/sanity";
import { handlelisteDocId, Item } from "../pages";
import { gradientBorder } from "../styles/gradientBorders";

const Style = styled.div`
  button {
    ${gradientBorder("hsl(0deg 100% 28%)", "hsl(0deg 100% 58%)")};
  }
`;

interface Props {
  reload: () => void;
  ting: Item[];
}

function Clear(props: Props) {
  const onClick = async () => {
    if (!confirm("Er du sikker?")) return;
    const checkedItems = props.ting.filter((ting) => ting.checked);
    await sanityClient
      .patch(handlelisteDocId)
      .unset(checkedItems.map((ting) => `items[_key=="${ting._key}"]`))
      .commit();
    props.reload();
  };

  return (
    <Style>
      <Button onClick={onClick}>Fjern checked</Button>
    </Style>
  );
}

export default Clear;
