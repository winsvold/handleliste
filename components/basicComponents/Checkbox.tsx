import styled from "styled-components/macro";
import { InputHTMLAttributes } from "react";

const Style = styled.label<{
  checked: boolean;
}>`
  display: flex;
  align-items: center;

  text-decoration: ${(props) => (props.checked ? "line-through" : "initial")};

  input {
    margin-right: 0.5em;
    width: 1.2em;
    height: 1.2em;
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
}

function Checkbox(props: Props) {
  const { label, checked, ...rest } = props;
  return (
    <Style checked={checked}>
      <input type="checkbox" checked={checked} {...rest} />
      {label}
    </Style>
  );
}

export default Checkbox;
