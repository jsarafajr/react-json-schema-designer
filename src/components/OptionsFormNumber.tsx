import React from 'react';
import { HStack } from '@chakra-ui/react';
import { InputFormControl } from './formControls/InputFormControl';

export const OptionsFormNumber = () => {
  return (
    <>
      <HStack>
        <InputFormControl type="number" label="Min" placeholder="Enter number" />
        <InputFormControl type="number" label="Max" placeholder="Enter number" />
      </HStack>
    </>
  );
};
