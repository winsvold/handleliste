import React, { useEffect, useState } from "react";
import { useCombobox } from "downshift";
import Input from "./basicComponents/Input";
import styled from "styled-components";
import { css } from "styled-components";

const DropdownStyle = styled.ul`
  position: absolute;
  background-color: white;
  color: black;
`;

const ItemStyle = styled.li<{ highLighted: boolean }>`
  padding: 0.25rem 0.75rem;
  ${(p) =>
    p.highLighted &&
    css`
      background: #8884;
    `}
`;

interface Props {
  label: string;
  options: string[];
  onChange: (value: string) => void;
  value: string;
  className?: string;
}

function Autocomplete(props: Props) {
  const [inputOptions, setInputOptions] = useState(props.options);

  // Autocomplete items hentes inn asynkront, må derfor håndtere at de kan komme inn etter at komponenten har mounta
  useEffect(() => setInputOptions(props.options), [props.options]);

  const combobox = useCombobox({
    items: inputOptions,
    inputValue: props.value,
    onInputValueChange: ({ inputValue }) => {
      props.onChange(inputValue || "");
      if (inputValue) {
        setInputOptions(props.options.filter((item) => item.toLowerCase().startsWith(inputValue.toLowerCase())));
      } else {
        setInputOptions(props.options);
      }
    },
    onSelectedItemChange: (change) => change.selectedItem && props.onChange(change.selectedItem),
  });

  return (
    <div className={props.className}>
      <div {...combobox.getComboboxProps()}>
        <Input {...combobox.getInputProps({ onFocus: combobox.openMenu })} label={props.label} />
      </div>
      <DropdownStyle {...combobox.getMenuProps()}>
        {combobox.isOpen &&
          inputOptions.slice(0, 10).map((item, index) => (
            <ItemStyle
              {...combobox.getItemProps({ item, index })}
              highLighted={combobox.highlightedIndex === index}
              key={`${item}${index}`}
            >
              {item}
            </ItemStyle>
          ))}
      </DropdownStyle>
    </div>
  );
}

export default Autocomplete;
