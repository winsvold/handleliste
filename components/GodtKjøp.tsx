import styled from "styled-components";
import { handlelisteDocId } from "../pages";
import { GodtKjøp as GodtKjøpI } from "../pages/godekjop";
import { guid } from "../studio/utils/guid";
import { sanityClient, urlFor } from "../utils/sanity";
import Button from "./basicComponents/Button";

const Style = styled.div`
    background: #fff1;
    display: flex;
    img {
        object-fit: cover;
        width: 7rem;
    }
`;

const Content = styled.div`
    display: grid;
    gap: .5rem;
    padding: 1rem;
    h2 {
        font-size: 1rem;
    }
    p {
        font-weight: 300;
        font-size: .9rem;
    }
`;

const SpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Badges = styled.ul`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
`;

const Badge = styled.li`
    background: #fff2;
    border-radius: .3rem;
    padding: .25rem .75rem;
`;

const StyledButton = styled(Button)`
    justify-self: flex-end;
`;

const ratings = {
    0: '☆☆☆  😊',
    1: '★☆☆  🤗',
    2: '★★☆  😁',
    3: '★★★  🥳'
}

const leggTilIHandleliste = async (godtKjøp: GodtKjøpI) => {
    await sanityClient
      .patch(handlelisteDocId)
      .append("items", [{ name: godtKjøp.name, _key: guid(), godtKjop: {_ref: godtKjøp._id, _type: 'reference'} }])
      .commit();
  };

function GodtKjøp(props: GodtKjøpI){
    const imageUrl = props.image ? urlFor(props.image).width(150).url() : undefined;
    
    return (
        <Style>
            {imageUrl && <img src={imageUrl} alt="" />}
            <Content>
                <SpaceBetween>
                    <h2>{props.name}</h2>
                    {props.rating !== undefined && <span>{ratings[props.rating]}</span>}
                </SpaceBetween>
                <p>{props.kommentar}</p>
                <Badges>
                    {props.kategorier?.map(kategori => <Badge key={kategori._id}>{kategori.name}</Badge>)}
                    {props.butikker?.map(butikk => <Badge key={butikk._id}>{butikk.name}</Badge>)}
                </Badges>
                <StyledButton onClick={() => leggTilIHandleliste(props)}>Legg til i handleliste 🛒</StyledButton>
            </Content>
        </Style>
    )
}

export default GodtKjøp;