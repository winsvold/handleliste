import React, { useState } from "react";
import { useCombobox } from "downshift";
import Input from "./basicComponents/Input";
import styled from "styled-components/macro";
import { css } from "styled-components";

const DropdownStyle = styled.ul`
  position: absolute;
  background-color: white;
  color: black;
`;

const ItemStyle = styled.li<{ highLighted: boolean }>`
  padding: .25rem .75rem;
  ${p => p.highLighted && css`background: #8884`}
`;

interface Props {
  label: string,
  items: string[],
  onChange: (value?: string) => void;
  onSelect: (value: string) => void;
  value: string;
  className?: string;
}

function Autocomplete(props: Props) {
  const [inputItems, setInputItems] = useState(props.items);

  const combobox = useCombobox({
    items: inputItems,
    inputValue: props.value,
    onInputValueChange: ({ inputValue }) => {
      props.onChange(inputValue);
      if (inputValue) {
        setInputItems(
          props.items.filter(item =>
            item.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      }
    },
    onSelectedItemChange: (change) => change.selectedItem && props.onChange(change.selectedItem)
  });

  return (
    <div className={props.className}>
      <div {...combobox.getComboboxProps()}>
        <Input {...combobox.getInputProps()} label={props.label} />
      </div>
      <DropdownStyle {...combobox.getMenuProps()}>
        {combobox.isOpen &&
        inputItems.map((item, index) => (
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