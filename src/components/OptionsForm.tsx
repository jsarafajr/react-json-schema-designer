import React from 'react';
import { Stack } from '@chakra-ui/react';
import { InputFormControl } from './forms/FormControls';

export const OptionsForm = () => {
  return (
    <Stack>
      <InputFormControl label="Title" placeholder="Enter title" />
      <InputFormControl label="Description" placeholder="Enter description" />
    </Stack>
  );
};
