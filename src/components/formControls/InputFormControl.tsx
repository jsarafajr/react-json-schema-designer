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
  numberMin?: number;
  numberMax?: number;
};

export const InputFormControl = ({
  label,
  placeholder,
  type = 'text',
  numberMin,
  numberMax,
}: Props) => {
  return (
    <FormControl mb={2}>
      <FormLabel fontSize="xs" mb={1}>{label}</FormLabel>
      {
        type === 'number' ? (
          <NumberInput size="sm" min={numberMin} max={numberMax}>
            <NumberInputField placeholder={placeholder} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        ) : (
          <Input size="sm" type={type} placeholder={placeholder} />
        )
      }
    </FormControl>
  );
}
