import React from 'react';
import { HStack } from '@chakra-ui/react';
import { InputFormControl } from './formControls/InputFormControl';

export const OptionsFormNumber = () => {
  return (
    <>
      <HStack>
        <InputFormControl type="number" label="Min Length" placeholder="Enter number" />
        <InputFormControl type="number" label="Max Length" placeholder="Enter number" />
      </HStack>
    </>
  );
};