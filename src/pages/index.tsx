import useSWR from "swr";
import { sanityClient } from "../utils/sanity";
import LeggTilTing from "../components/LeggTilTing";
import Ting from "../components/Ting";
import styled from "styled-components";
import Clear from "../components/Clear";
import Spinner from "../components/Spinner";
import { Item } from "../sanity/schema.types";
import { SanityKeyed } from "sanity-codegen";

export const handlelisteDocId = "handleListe";
export const handlelisteQuery = `*[_id == "${handlelisteDocId}"][0]`;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 1rem;

  h1 {
    font-size: 2rem;
  }
`;

const StyledUl = styled.ul`
  margin: 3rem 0 !important;
`;

const AlignLeft = styled.div`
  justify-content: flex-start;
`;

interface HandleListeResponse {
  items: SanityKeyed<Item>[];
}

function Index() {
  const response = useSWR<HandleListeResponse>(handlelisteQuery, (q) => sanityClient.fetch(q));
  const items = response.data?.items || [];
  const loading = !response.data && !response.error;

  return (
    <div>
      <Style>
        <h1>Handleliste 🛒</h1>
        <AlignLeft>
          <LeggTilTing reload={response.mutate} />
          {loading && <Spinner />}
          {items.length > 0 && (
            <>
              <StyledUl>
                {items.map((ting) => (
                  <Ting key={ting._key} ting={ting} reload={response.mutate} />
                ))}
              </StyledUl>
              <Clear reload={response.mutate} ting={items} />
            </>
          )}
        </AlignLeft>
      </Style>
    </div>
  );
}

export default Index;
