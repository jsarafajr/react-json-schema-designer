import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

type Props = {
  label: string;
  placeholder: string;
  type?: 'text' | 'number';
  value?: string | number;
  numberMin?: number;
  numberMax?: number;
  onChange?: (value: string | number) => void;
};

export const InputFormControl = ({
  value,
  label,
  placeholder,
  type = 'text',
  numberMin,
  numberMax,
  onChange,
}: Props) => {
  return (
    <FormControl mb={2}>
      <FormLabel fontSize="xs" mb={1}>
        {label}
      </FormLabel>
      {type === 'number' ? (
        <NumberInput
          size="sm"
          min={numberMin}
          max={numberMax}
          inputMode="numeric"
          value={value}
          onChange={(_, value) => onChange?.(value)}
        >
          <NumberInputField placeholder={placeholder} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      ) : (
        <Input
          size="sm"
          type={type}
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
    </FormControl>
  );
};
