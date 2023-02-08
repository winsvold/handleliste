import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 112.5%;
    background-color: #111;
    font-family: 'Roboto', sans-serif;

    h1 {
      font-family: "Delius", sans-serif;
    }
    
    --tint: palegoldenrod;
    --bg-color: #181818;
    --whiteish: #ddd;
    --button-color: #90323D;
    --palette-1: #8C7A6B;
    --palette-2: #90323D;
    --palette-3: #5E0B15;
    --palette-4: #BC8034;
  }
  
  *:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem var(--palette-4);
  }
`;
