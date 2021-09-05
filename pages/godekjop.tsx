import useSWR from "swr";
import { getStudioUrl, sanityClient } from "../utils/sanity";
import styled from "styled-components/macro";
import React from "react";
import GodtKjøp from "../components/GodtKjøp";

export const godekjøpQuery = `*[_type == "godtKjop" && !(_id in path("drafts.**"))] {
  "butikker": butikker[]->{name, _id},
  "kategorier": kategorier[]->{name, _id},
  kommentar,
  name,
  rating,
  _id,
  image
}`;

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
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export interface GodtKjøpI {
  _id: string,
  butikker?: {
    _id: string,
    name: string,
  }[],
  kategorier?: {
    _id: string,
    name: string
  }[],
  kommentar?: string,
  name: string,
  rating?: number,
  image?: any
}

function Index() {
  const response = useSWR<GodtKjøpI[]>(godekjøpQuery, (q) => sanityClient.fetch(q));
  const godeKjøp = response.data || [];

  return (
    <div>
      <Style>
        <h1>Gode kjøp 🛒</h1>
        <a href={getStudioUrl() + "/intent/create/template=godtKjop;type=godtKjop/"}>Legg til</a>
        <StyledUl>
          {godeKjøp.map((godtKjøp) => <li key={godtKjøp._id}><GodtKjøp {...godtKjøp} /></li>)}
        </StyledUl>
      </Style>
    </div>
  );
}

export default Index;
