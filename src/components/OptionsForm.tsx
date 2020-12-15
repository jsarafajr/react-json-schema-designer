import React, { ReactNode } from 'react';
import { Stack, Flex, Button } from '@chakra-ui/react';
import { JSONSchema7TypeName } from 'json-schema';
import { InputFormControl } from './formControls/InputFormControl';
import { OptionsFormString } from './OptionsFormString';
import { OptionsFormObject } from './OptionsFormObject';
import { OptionsFormNumber } from './OptionsFormNumber';
import { OptionsFormArray } from './OptionsFormArray';

type Props = {
  type: JSONSchema7TypeName;
  onClose: () => void;
};

export const OptionsForm = ({ type, onClose }: Props) => {
  const typeOptions: Record<JSONSchema7TypeName, ReactNode> = {
    object: <OptionsFormObject />,
    string: <OptionsFormString />,
    number: <OptionsFormNumber />,
    boolean: <></>,
    array: <OptionsFormArray />,
    integer: <>not supported</>,
    null: <>not supported</>,
  };

  return (
    <Stack mb={3}>
      <InputFormControl label="Title" placeholder="Enter title" />
      <InputFormControl label="Description" placeholder="Enter description" />
      {typeOptions[type]}
      <Flex justify="flex-end">
        <Button size="sm" variant="solid" onClick={onClose}>
          Close
        </Button>
      </Flex>
    </Stack>
  );
};
