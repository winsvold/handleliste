import { css } from "styled-components";

const beforeAfterCommon = css`
  content: "";
  position: absolute;
`;

export const gradientBorder = (color1 = "palegoldenrod", color2 = "white", angle = 45) => css`
  position: relative;
  isolation: isolate;
  border-color: transparent;
  ::before {
    ${beforeAfterCommon};
    width: calc(100% + 0.5rem);
    height: calc(100% + 0.5rem);
    background: linear-gradient(${angle}deg, ${color1}, ${color2});
    top: -0.25rem;
    left: -0.25rem;
    z-index: -2;
    border-radius: 0.4rem;
  }
  ::after {
    ${beforeAfterCommon};
    width: 100%;
    height: 100%;
    background: var(--bg-color);
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 0.2rem;
  }
`;
