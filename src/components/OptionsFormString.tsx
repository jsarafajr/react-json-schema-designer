import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { CreatableListFormControl } from './formControls/CreatableListFormControl';
import { InputFormControl } from './formControls/InputFormControl';

export const OptionsFormString = () => {
  return (
    <>
      <HStack>
        <InputFormControl type="number" label="Min Length" placeholder="Enter number" />
        <InputFormControl type="number" label="Max Length" placeholder="Enter number" />
      </HStack>
      <Box>
        <CreatableListFormControl />
      </Box>
    </>
  );
};
