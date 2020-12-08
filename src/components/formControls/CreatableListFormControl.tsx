import React, { useState } from 'react';
import { useTheme, Theme, FormControl, FormLabel } from '@chakra-ui/react';
import type { StylesConfig, ValueType } from 'react-select';
import CreatableSelect from 'react-select/creatable';

type Props = {};

const size = 'sm';

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
  const [value, setValue] = useState<ValueType<{ label: string; value: string }>[]>([]);

  const theme = useTheme<Theme>();

  return (
    <FormControl mb={2}>
      <FormLabel fontSize="xs" mb={1}>
        Enum
      </FormLabel>
      <CreatableSelect
        styles={getSelectStyles(theme)}
        components={{ DropdownIndicator: null }}
        inputValue={inputValue}
        isClearable={false}
        isMulti
        menuIsOpen={false}
        onChange={(value) => setValue(value as any)}
        onInputChange={setInputValue}
        onKeyDown={(e) => {
          if (inputValue && e.key === 'Enter') {
            setValue([...value, { label: inputValue, value: inputValue }]);
            setInputValue('');
            e.preventDefault();
          }
        }}
        placeholder="Enter values"
        value={value}
      />
    </FormControl>
  );
};
