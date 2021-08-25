import useSWR from "swr";
import { sanityClient } from "../utils/sanity";
import AuthStatus from "../components/AuthStatus";
import { guid } from "../studio/utils/guid";
import LeggTilTing from "../components/LeggTilTing";
import Ting from "../components/Ting";
import styled from "styled-components/macro";

export const handlelisteDocId = "handleListe";
export const handlelisteQuery = `*[_id == "${handlelisteDocId}"][0]`;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 1rem;
`;

const StyledUl = styled.ul``;

export interface Item {
  name: string;
}

interface HandleListeResponse {
  items: Item[];
  checkedItems: Item[];
}

function Index() {
  const response = useSWR<HandleListeResponse>(handlelisteQuery, (q) => sanityClient.fetch(q));
  const items = response.data?.items || [];
  const checkedItems = response.data?.checkedItems || [];

  const onCheck = async (ting: Item, check: boolean) => {
    if (check) {
      await sanityClient
        .patch(handlelisteDocId)
        .append("checkedItems", [{ name: ting.name, _key: guid() }])
        .commit();
    } else {
      await sanityClient
        .patch(handlelisteDocId)
        .unset([`[checkedItems[name=="${ting.name}"]]`])
        .commit();
    }
    response.revalidate();
  };

  return (
    <div>
      <AuthStatus />
      <Style>
        <LeggTilTing reload={response.revalidate} />
        <h2>Handleliste:</h2>
        <StyledUl>
          {items.map((ting) => (
            <Ting
              isChecked={checkedItems.some((checkedItem) => ting.name === checkedItem.name)}
              onCheck={onCheck}
              ting={ting}
            />
          ))}
        </StyledUl>
      </Style>
    </div>
  );
}

export default Index;
