import styled from "styled-components";
import { GodtKjøp as GodtKjøpI } from "../pages/godekjop";
import { urlFor } from "../utils/sanity";

const Style = styled.div`
    background: #fff1;
    display: flex;
`;

const Content = styled.div`
    display: grid;
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
    margin-top: .5rem !important;
`;

const Badge = styled.li`
    background: #fff2;
    border-radius: .3rem;
    padding: .25rem .75rem;
`;

const ratings = {
    0: '🤢',
    1: '🤗',
    2: '😆',
    3: '🥳'
}

function GodtKjøp(props: GodtKjøpI){
    const imageUrl = props.image ? urlFor(props.image).height(150).url() : undefined;
    
    return (
        <Style>
            {imageUrl && <img src={imageUrl} alt="" />}
            <Content>
                <SpaceBetween>
                    <h2>{props.name}</h2>
                    {props.rating && <span>{ratings[props.rating]}</span>}
                </SpaceBetween>
                <p>{props.kommentar}</p>
                <Badges>
                    {props.kategorier?.map(kategori => <Badge key={kategori._id}>{kategori.name}</Badge>)}
                    {props.butikker?.map(butikk => <Badge key={butikk._id}>{butikk.name}</Badge>)}
                </Badges>
            </Content>
        </Style>
    )
}

export default GodtKjøp;