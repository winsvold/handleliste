import useSWR from "swr";
import { sanityClient } from "../utils/sanity";
import AuthStatus from "../components/AuthStatus";
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
  checked: boolean;
  _key: string;
}

interface HandleListeResponse {
  items: Item[];
}

function Index() {
  const response = useSWR<HandleListeResponse>(handlelisteQuery, (q) => sanityClient.fetch(q));
  const items = response.data?.items || [];

  const onCheck = async (ting: Item) => {
    const oppdatertTing: Item = { ...ting, checked: !ting.checked };
    await sanityClient
      .patch(handlelisteDocId)
      .insert("replace", `[items[_key=="${ting._key}"]]`, [oppdatertTing])
      .commit();
    response.revalidate();
  };

  return (
    <div>
      <AuthStatus />
      <Style>
        <h2>Handleliste:</h2>
        <LeggTilTing reload={response.revalidate} />
        <StyledUl>
          {items.map((ting) => (
            <Ting key={ting._key} onCheck={onCheck} ting={ting} />
          ))}
        </StyledUl>
      </Style>
    </div>
  );
}

export default Index;
