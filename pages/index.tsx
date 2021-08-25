import useSWR from "swr";
import { sanityClient } from "../utils/sanity";
import AuthStatus from "../components/AuthStatus";
import LeggTilTing from "../components/LeggTilTing";
import Ting from "../components/Ting";
import styled from "styled-components/macro";
import Clear from "../components/Clear";

export const handlelisteDocId = "handleListe";
export const handlelisteQuery = `*[_id == "${handlelisteDocId}"][0]`;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 1rem;
`;

const StyledUl = styled.ul`
  margin: 3rem 0 !important;
`;

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

  return (
    <div>
      <AuthStatus />
      <Style>
        <h2>Handleliste:</h2>
        <LeggTilTing reload={response.revalidate} />
        <StyledUl>
          {items.map((ting) => (
            <Ting key={ting._key} ting={ting} reload={response.revalidate} />
          ))}
        </StyledUl>
        <Clear reload={response.revalidate} ting={items} />
      </Style>
    </div>
  );
}

export default Index;
