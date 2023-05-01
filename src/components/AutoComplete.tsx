import React, { useEffect, useMemo, useState } from "react";
import { useCombobox } from "downshift";
import Input from "./basicComponents/Input";
import styled from "styled-components";
import { css } from "styled-components";
import { useAutocompleteResponse } from "./LeggTilTing";

const DropdownStyle = styled.ul`
  position: absolute;
  background-color: white;
  color: black;
  list-style: none;
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
  onChange: (value: string) => void;
  value: string;
  className?: string;
}

function Autocomplete(props: Props) {
  const [items, setItems] = useState<string[]>([]);

  const autoCompleteData = useAutocompleteResponse().data;

  const soretdAutocompleteData = useMemo(
    () => autoCompleteData?.options.sort((a, b) => b.timesUsed - a.timesUsed).map((it) => it.name) || [],
    [autoCompleteData]
  );

  // Autocomplete items hentes inn asynkront, må derfor håndtere at de kan komme inn etter at komponenten har mounta
  useEffect(() => {
    return setItems(soretdAutocompleteData);
  }, [soretdAutocompleteData]);

  const combobox = useCombobox({
    items: items,
    inputValue: props.value,
    onInputValueChange: ({ inputValue }) => {
      props.onChange(inputValue || "");
      if (inputValue) {
        const possibleMatches = soretdAutocompleteData.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setItems(possibleMatches);
      } else {
        setItems(soretdAutocompleteData);
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
          items.slice(0, 10).map((item, index) => (
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
