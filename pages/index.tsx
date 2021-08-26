import useSWR from "swr";
import { sanityClient } from "../utils/sanity";
import AuthStatus from "../components/AuthStatus";
import LeggTilTing from "../components/LeggTilTing";
import Ting from "../components/Ting";
import styled from "styled-components/macro";
import Clear from "../components/Clear";
import Head from "next/head";

export const handlelisteDocId = "handleListe";
export const handlelisteQuery = `*[_id == "${handlelisteDocId}"][0]`;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 1rem;

  h2 {
    font-family: "Delius", sans-serif;
    font-size: 2rem;
  }
`;

const StyledUl = styled.ul`
  margin: 3rem 0 !important;
`;

const AlignLeft = styled.div`
  justify-content: flex-start;
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
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Delius&display=swap" rel="stylesheet" />
      </Head>
      <AuthStatus />
      <Style>
        <h2>Handleliste 🛒</h2>
        <AlignLeft>
          <LeggTilTing reload={response.revalidate} />
          <StyledUl>
            {items.map((ting) => (
              <Ting key={ting._key} ting={ting} reload={response.revalidate} />
            ))}
          </StyledUl>
          <Clear reload={response.revalidate} ting={items} />
        </AlignLeft>
      </Style>
    </div>
  );
}

export default Index;
