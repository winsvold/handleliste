import useSWR from "swr";
import { sanityClient } from "../utils/sanity";
import LeggTilTing from "../components/LeggTilTing";
import Ting from "../components/Ting";
import styled from "styled-components";
import FjernAvkrysset from "../components/FjernAvkrysset";
import Spinner from "../components/Spinner";
import { Item } from "../sanity/schema.types";
import { SanityKeyed } from "sanity-codegen";
import { useState } from "react";
import { Flex, Link } from "@chakra-ui/react";
import { CleanUpAutocompleteList } from "../components/CleanUpAutocompleteList";
import { isDevelopment } from "../utils/environment";

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

const lists = ["Dagligvarer", "Andre ting", "Ordne", "Kvitfjell", "Netthandel", "Middagsplan"] as const;
export type ListName = (typeof lists)[number];

function Index() {
  const response = useSWR<HandleListeResponse>(handlelisteQuery, (q) => sanityClient.fetch(q));
  const [currentList, setCurrentList] = useState<ListName>("Dagligvarer");
  const items = response.data?.items.filter((item) => item.listName === currentList) || [];
  const loading = !response.data && !response.error;

  return (
    <div>
      <Style>
        <h1>Handleliste 🛒</h1>
        <Flex gap="0.5rem 1rem" flexWrap="wrap">
          {lists.map((list) => (
            <Link
              textDecoration={list === currentList ? "underline" : "none"}
              as="button"
              key={list}
              onClick={() => setCurrentList(list)}
            >
              {list}
            </Link>
          ))}
        </Flex>
        <AlignLeft>
          <LeggTilTing reload={response.mutate} listName={currentList} />
          {loading && <Spinner />}
          {items.length > 0 && (
            <>
              <StyledUl>
                {items.map((ting) => (
                  <Ting key={ting._key} ting={ting} reload={response.mutate} />
                ))}
              </StyledUl>
              <FjernAvkrysset reload={response.mutate} ting={items} />
            </>
          )}
        </AlignLeft>
      </Style>
      {isDevelopment() && <CleanUpAutocompleteList />}
    </div>
  );
}

export default Index;
