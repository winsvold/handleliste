import styled from "styled-components";
import { commonInteractiveElementStyling } from "./common";

export default styled.button`
  ${commonInteractiveElementStyling};
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;
