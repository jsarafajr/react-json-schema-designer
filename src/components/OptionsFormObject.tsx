import React from 'react';
import { HStack } from '@chakra-ui/react';
import { InputFormControl } from './formControls/InputFormControl';

export const OptionsFormObject = () => {
  return (
    <>
      <HStack>
        <InputFormControl type="number" numberMin={0} label="Min Properties" placeholder="Enter number" />
        <InputFormControl type="number" numberMin={0} label="Max Properties" placeholder="Enter number" />
      </HStack>
    </>
  );
};
