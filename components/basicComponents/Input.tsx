import { InputHTMLAttributes, useRef } from "react";
import styled from "styled-components";
import { commonInteractiveElementStyling } from "./common";
import { guid } from "../../studio/utils/guid";

const Style = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    ${commonInteractiveElementStyling};
    width: 100%;
    min-width: 7rem;
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = (props: Props) => {
  const id = useRef(guid()).current;
  const { label, className, ...rest } = props;
  return (
    <Style className={className}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" {...rest} />
    </Style>
  );
};

export default Input;
