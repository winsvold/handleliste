import styled, { keyframes } from "styled-components/macro";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Style = styled.span`
  font-size: 1.5em;
  display: inline-block;
    animation: ${fadeIn} 1s 1s backwards, ${spin} 2s 1s infinite;
`;

function Spinner() {
  return (
    <Style>
      🛍
    </Style>
  )
}

export default Spinner;