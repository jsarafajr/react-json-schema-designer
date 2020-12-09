import React from 'react';
import { HStack } from '@chakra-ui/react';
import { InputFormControl } from './formControls/InputFormControl';

export const OptionsFormObject = () => {
  return (
    <>
      <HStack>
        <InputFormControl type="number" numberMin={0} label="Min Items" placeholder="Enter number" />
        <InputFormControl type="number" numberMin={0} label="Max Items" placeholder="Enter number" />
      </HStack>
    </>
  );
};
