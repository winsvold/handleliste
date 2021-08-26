import styled from "styled-components";
import { commonInteractiveElementStyling } from "./common";

export default styled.button`
  ${commonInteractiveElementStyling};

  border: 0.2rem solid var(--button-color);
  color: #262525;
  border-radius: 0.2rem;
  background-color: var(--button-color);
  padding: 0.25rem 0.75rem;

  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;
