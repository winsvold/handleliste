import styled from "styled-components";
import { handlelisteDocId } from "../pages";
import { GodtKjøpI as GodtKjøpI } from "../pages/godekjop";
import { guid } from "../studio/utils/guid";
import { sanityClient, urlFor } from "../utils/sanity";
import Button from "./basicComponents/Button";
import { useState } from "react";

const smallScreen = 'max-width: 600px';

const Style = styled.div`
  background: #fff1;
  padding: 1rem;
  display: grid;
  gap: .5rem;
  grid-auto-columns: minmax(5rem, 7rem) 1fr auto;
  grid-template-areas: 
    "img title rating"
    "img kommentar kommentar"
    "img badges knapp";
  @media(${smallScreen}) {
    grid-template-areas: 
    "img title"
    "img rating"
    "img kommentar"
    "badges badges"
    "knapp knapp";
  }
`;

const Kommentar = styled.p`
  font-weight: 300;
  font-size: .9rem;
  grid-area: kommentar;
`;

const Image = styled.img`
  grid-area: img;
  margin: -1rem 0 -1rem -1rem;
  @media(${smallScreen}) {
    margin: -1rem 0 0 -1rem;
  }
  align-self: stretch;
  aspect-ratio: .75;
  width: 100%;
  object-fit: cover;
  object-position: center top;
`;

const Title = styled.h2`
  font-size: 1rem;
  grid-area: title;
`;

const Rating = styled.div`
  grid-area: rating;
  justify-self: end;
`;

const Badges = styled.ul`
  grid-area: badges;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: .5rem;
`;

const Badge = styled.li`
  background: #fff2;
  border-radius: .3rem;
  padding: .25rem .75rem;
`;

const StyledButton = styled(Button)`
  justify-self: flex-end;
  grid-area: knapp;
  align-self: end;
`;

const ratings = {
  0: "☆☆☆  😊",
  1: "★☆☆  🤗",
  2: "★★☆  😁",
  3: "★★★  🥳"
};

const leggTilIHandleliste = async (godtKjøp: GodtKjøpI) => {
  await sanityClient
    .patch(handlelisteDocId)
    .append("items", [{ name: godtKjøp.name, _key: guid(), godtKjop: { _ref: godtKjøp._id, _type: "reference" } }])
    .commit();
};

function GodtKjøp(props: GodtKjøpI) {
  const imageUrl = props.image ? urlFor(props.image).width(250).url() : undefined;
  const [lagtTil, setLagtTil] = useState(false);

  const onLeggTil = () => {
    if (lagtTil) {
      return false;
    }
    leggTilIHandleliste(props);
    setLagtTil(true);
  };

  return (
    <Style>
      {imageUrl && <Image src={imageUrl} alt="" />}
      <Title>{props.name}</Title>
      {props.rating !== undefined && <Rating>{ratings[props.rating]}</Rating>}
      <Kommentar>{props.kommentar}</Kommentar>
      <Badges>
        {props.kategorier?.map(kategori => <Badge key={kategori._id}>{kategori.name}</Badge>)}
        {props.butikker?.map(butikk => <Badge key={butikk._id}>{butikk.name}</Badge>)}
      </Badges>
      <StyledButton
        onClick={onLeggTil}>{lagtTil ? "Lagt i handleliste 👍" : "Legg i handleliste 🛒"}</StyledButton>
    </Style>
  );
}

export default GodtKjøp;