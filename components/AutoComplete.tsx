import React, { useEffect, useState } from "react";
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
  onChange: (value: string) => void;
  value: string;
  className?: string;
}

function Autocomplete(props: Props) {
  const [inputItems, setInputItems] = useState(props.items);

  // Autocomplete items hentes inn asynkront, må derfor håndtere at de kan komme inn etter at komponenten har mounta
  useEffect(() => setInputItems(props.items), [props.items.length])

  const combobox = useCombobox({
    items: inputItems,
    inputValue: props.value,
    onInputValueChange: ({ inputValue }) => {
      props.onChange(inputValue || '');
      if (inputValue) {
        setInputItems(
          props.items.filter(item =>
            item.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      } else {
        setInputItems(props.items)
      }
    },
    onSelectedItemChange: (change) => change.selectedItem && props.onChange(change.selectedItem)
  });

  return (
    <div className={props.className}>
      <div {...combobox.getComboboxProps()}>
        <Input {...combobox.getInputProps({onFocus: combobox.openMenu})} label={props.label} />
      </div>
      <DropdownStyle {...combobox.getMenuProps()}>
        {combobox.isOpen &&
        inputItems.slice(0, 10).map((item, index) => (
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