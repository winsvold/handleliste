import { Box } from "@chakra-ui/react";
import { useCombobox } from "downshift";
import { useMemo } from "react";
import styled, { css } from "styled-components";
import useDebounce from "../utils/useDebounce";
import { useAutocompleteResponse } from "./LeggTilTing";
import Input from "./basicComponents/Input";

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
  const autoCompleteData = useAutocompleteResponse().data;

  const debouncedValue = useDebounce(props.value, 500);

  const autoCompleteOptions = useMemo(() => {
    const sortedOptions = autoCompleteData?.options.sort((a, b) => b.timesUsed - a.timesUsed) || [];

    if (!debouncedValue) return sortedOptions;

    const possibleMatches = sortedOptions.filter((item) =>
      item.name.toLowerCase().startsWith(debouncedValue.toLowerCase())
    );

    return possibleMatches;
  }, [autoCompleteData, debouncedValue]);

  const combobox = useCombobox({
    items: autoCompleteOptions,
    inputValue: props.value,
    onInputValueChange: ({ inputValue }) => {
      props.onChange(inputValue || "");
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
          autoCompleteOptions.slice(0, 10).map((item, index) => (
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
