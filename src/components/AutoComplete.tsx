import React, { useEffect, useMemo, useState } from "react";
import { useCombobox } from "downshift";
import Input from "./basicComponents/Input";
import styled from "styled-components";
import { css } from "styled-components";
import { AutoCompleteOption, useAutocompleteResponse } from "./LeggTilTing";
import { Box } from "@chakra-ui/react";

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
  const [items, setItems] = useState<AutoCompleteOption[]>([]);

  const autoCompleteData = useAutocompleteResponse().data;

  const soretdAutocompleteData = useMemo(
    () => autoCompleteData?.options.sort((a, b) => b.timesUsed - a.timesUsed) || [],
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
          item.name.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setItems(possibleMatches);
      } else {
        setItems(soretdAutocompleteData);
      }
    },
    itemToString: (item) => item?.name ?? "N/A",
    onSelectedItemChange: (change) => change.selectedItem && props.onChange(change.selectedItem.name),
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
              key={`${item._key}`}
            >
              {item.name}
              <Box as="span" fontSize="xs" opacity={0.7} marginLeft=".5em">
                ({item.timesUsed})
              </Box>
            </ItemStyle>
          ))}
      </DropdownStyle>
    </div>
  );
}

export default Autocomplete;
