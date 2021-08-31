import React, { ForwardedRef, InputHTMLAttributes, useRef } from "react";
import styled from "styled-components";
import { guid } from "../../studio/utils/guid";

const Style = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    margin-bottom: 4px;
  }
  input {
    width: 100%;
    min-width: 7rem;
    color: var(--whiteish);
    border: 0.2rem solid var(--whiteish);
    border-radius: 0.2rem;
    background-color: transparent;
    padding: 0.25rem 0.75rem;
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const id = useRef(guid()).current;
  const { label, className, ...rest } = props;
  return (
    <Style className={className}>
      <label htmlFor={id}>{label}</label>
      <input enterKeyHint="send" id={id} ref={ref} type="text" {...rest} />
    </Style>
  );
};

export default React.forwardRef(Input);
