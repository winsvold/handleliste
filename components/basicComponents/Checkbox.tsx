import styled from "styled-components/macro";
import { InputHTMLAttributes } from "react";

const Style = styled.label`
  display: flex;
  align-items: center;

  input {
    margin-right: 0.5em;
    width: 1.2em;
    height: 1.2em;
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Checkbox(props: Props) {
  const { label, ...rest } = props;
  return (
    <Style>
      <input type="checkbox" {...rest} />
      {label}
    </Style>
  );
}

export default Checkbox;
