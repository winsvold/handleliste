import useSWR, { mutate } from "swr";
import { sanityClient } from "../utils/sanity";
import { FormEvent, useState } from "react";
import AuthStatus from "../components/AuthStatus";

const handlelisteDocId = "handleListe";
const query = `*[_id == "${handlelisteDocId}"][0]`;

interface HandleListeResponse {
  items: string[];
  checkedItems: string[];
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
      .set({ items: [...items, input] })
      .commit();
    mutate(query);
  };

  const onCheck = async (ting: string, check: boolean) => {
    let newCheckedItems = check ? [...checkedItems, ting] : checkedItems.filter((it) => it !== ting);
    await sanityClient.patch(handlelisteDocId).set({ checkedItems: newCheckedItems }).commit();
    mutate(query);
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
          const isChecked = checkedItems.includes(ting);
          return (
            <li key={ting}>
              <label>
                <input onClick={() => onCheck(ting, !isChecked)} checked={isChecked} type="checkbox" />
                {ting}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Index;
