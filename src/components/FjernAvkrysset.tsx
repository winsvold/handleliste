import Button from "./basicComponents/Button";
import { sanityClient } from "../utils/sanity";
import { handlelisteDocId } from "../pages";
import { Item } from "../sanity/sanity.types";

interface Props {
  reload: () => void;
  ting: (Item & { _key: string })[];
}

function FjernAvkrysset(props: Props) {
  const onClick = async () => {
    if (!confirm("Er du sikker?")) return;
    const checkedItems = props.ting.filter((ting) => ting.checked);
    await sanityClient
      .patch(handlelisteDocId)
      .unset(checkedItems.map((ting) => `items[_key=="${ting._key}"]`))
      .commit();
    props.reload();
  };

  return <Button onClick={onClick}>Fjern avkrysset 🗑️</Button>;
}

export default FjernAvkrysset;
