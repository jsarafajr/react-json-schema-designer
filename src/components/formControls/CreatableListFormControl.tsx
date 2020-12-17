import React, { useState } from 'react';
import { useTheme, Theme, FormControl, FormLabel } from '@chakra-ui/react';
import type { StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';

type Props = {
  label: string;
  placeholder: string;
  value?: string[];
  onChange: (value?: string[]) => void;
};

const size = 'sm';

// as for now there is no way to easily use chakra style with react-select, revisit this later
const getSelectStyles = (theme: Theme): StylesConfig => ({
  container: (base) => ({
    ...base,
    fontSize: theme.fontSizes[size],
  }),
  control: (base) => ({
    ...base,
    borderColor: 'inherit',
    borderRadius: theme.radii[size],
    // @ts-ignore
    minHeight: theme.sizes[theme.components.Input.sizes[size].field.h],
    msTransition: theme.transition.duration.normal,
    '&:hover': {
      borderColor: theme.colors.gray['300'],
    },
  }),
  valueContainer: (base) => ({
    ...base,
    // @ts-ignore
    paddingLeft: theme.space[theme.components.Input.sizes[size].field.pl],
    // @ts-ignore
    paddingRight: theme.space[theme.components.Input.sizes[size].field.pr],
  }),
  placeholder: (base) => ({
    ...base,
    color: theme.colors.gray['400'],
  }),
});

export const CreatableListFormControl = (props: Props) => {
  const [inputValue, setInputValue] = useState('');

  const selectValue = props.value?.map((valueEntry) => ({
    label: valueEntry,
    value: valueEntry,
  })) || [];
  
  
  const theme = useTheme<Theme>();

  return (
    <FormControl mb={2}>
      <FormLabel fontSize="xs" mb={1}>
        {props.label}
      </FormLabel>
      <CreatableSelect
        styles={getSelectStyles(theme)}
        components={{ DropdownIndicator: null }}
        inputValue={inputValue}
        isClearable={false}
        isMulti
        menuIsOpen={false}
        onChange={(newSelectValue) => props.onChange(newSelectValue?.map(selectValueEntry => selectValueEntry.value))}
        onInputChange={setInputValue}
        onKeyDown={(e) => {
          if (inputValue && e.key === 'Enter') {
            props.onChange([...selectValue.map(selectValueEntry => selectValueEntry.value), inputValue]);
            setInputValue('');
            e.preventDefault();
          }
        }}
        placeholder={props.placeholder}
        value={selectValue}
      />
    </FormControl>
  );
};
