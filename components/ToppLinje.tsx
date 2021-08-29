import React from "react";
import styled from "styled-components";
import AuthStatus from "./AuthStatus";
import Link from 'next/link';

const Style = styled.div`
  display: flex;
  background-color: #aaa5;
  padding: 0.5rem 1rem;
  justify-content: space-between;
`;

const Links = styled.div`
    flex: 1;
    display: flex;
    gap: 1rem;
    a, a:visited {
        color: white
    }
`;

function ToppLinje() {
    return (
        <Style>
            <Links>
                <Link href="/">Handleliste</Link>
                <Link href="/godekjop">Gode kjøp</Link>
            </Links>
            <AuthStatus />
        </Style>
    )
}

export default ToppLinje;