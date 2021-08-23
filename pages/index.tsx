import useSWR, { mutate } from "swr";
import { sanityClient } from "../utils/sanity";
import { FormEvent, useState } from "react";
import AuthStatus from "../components/AuthStatus";
import { guid } from "../studio/utils/guid";

const handlelisteDocId = "handleListe";
const query = `*[_id == "${handlelisteDocId}"][0]`;

interface Item {
  name: string;
}

interface HandleListeResponse {
  items: Item[];
  checkedItems: Item[];
}

function Index() {
  const response = useSWR<HandleListeResponse>(query, (q) => sanityClient.fetch(q));
  const items = response.data?.items || [];
  const checkedItems = response.data?.checkedItems || [];
  const [input, setInput] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
    await sanityClient
      .patch(handlelisteDocId)
      .append("items", [{ name: input, _key: guid() }])
      .commit();
    mutate(query); // forteller SWR at det skal refetches
  };

  const onCheck = async (ting: string, check: boolean) => {
    if (check) {
      await sanityClient
        .patch(handlelisteDocId)
        .append("checkedItems", [{ name: ting, _key: guid() }])
        .commit();
    } else {
      await sanityClient
        .patch(handlelisteDocId)
        .unset([`[checkedItems[name=="${ting}"]]`])
        .commit();
    }
    mutate(query); // forteller SWR at det skal refetches
  };

  return (
    <div>
      <AuthStatus />
      <h2>Handleliste:</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Legg til ting" value={input} onChange={(e) => setInput(e.target.value)} />
      </form>
      <ul>
        {items.map((ting) => {
          const isChecked = checkedItems.some((checkedItem) => ting.name === checkedItem.name);
          return (
            <li key={ting.name}>
              <label>
                <input onClick={() => onCheck(ting.name, !isChecked)} checked={isChecked} type="checkbox" />
                {ting.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Index;
