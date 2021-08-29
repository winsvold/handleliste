import useSWR from "swr";
import { sanityClient } from "../utils/sanity";
import styled from "styled-components/macro";
import React from "react";
import GodtKjøp from "../components/GodtKjøp";

export const godekjøpQuery = `*[_type == "godtKjop"] {
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
`;

export interface GodtKjøp {
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
  const response = useSWR<GodtKjøp[]>(godekjøpQuery, (q) => sanityClient.fetch(q));
  const godeKjøp = response.data || [];

  return (
    <div>
      <Style>
        <h1>Gode kjøp 🛒</h1>
        <StyledUl>
          {godeKjøp.map((godtKjøp) => <li key={godtKjøp._id}><GodtKjøp {...godtKjøp} /></li>)}
        </StyledUl>
      </Style>
    </div>
  );
}

export default Index;
