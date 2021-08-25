import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { guid } from "../../studio/utils/guid";
import { commonInteractiveElementStyling } from "./common";

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
  const id = guid();
  const { label, className, ...rest } = props;
  return (
    <Style className={className}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" {...rest} />
    </Style>
  );
};

export default Input;
