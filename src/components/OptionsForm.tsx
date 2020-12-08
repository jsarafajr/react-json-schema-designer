import React from 'react';
import { Stack, Flex, Button } from '@chakra-ui/react';
import { InputFormControl } from './formControls/InputFormControl';
import { OptionsFormString } from './OptionsFormString';

export const OptionsForm = () => {
  return (
    <Stack mb={3}>
      <InputFormControl label="Title" placeholder="Enter title" />
      <InputFormControl label="Description" placeholder="Enter description" />
      <OptionsFormString />
      <Flex justify="flex-end">
        <Button size="sm" variant="outline">
          Close
        </Button>
      </Flex>
    </Stack>
  );
};
