import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 112.5%;
    @media (min-width: 1000px) {
      font-size: 125%;
    }
    font-weight: 400;
    color: #ddd;
    background-color: #111;
    font-family: 'Roboto', sans-serif;
    
    --tint: palegoldenrod;
  }
  
  body {
    background-color: #181818;
    min-height: 100vh;
  }
  
  *:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem orange;
  }
`;
