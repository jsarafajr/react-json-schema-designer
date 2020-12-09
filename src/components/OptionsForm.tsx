import React, { ReactNode } from 'react';
import { Stack, Flex, Button } from '@chakra-ui/react';
import { InputFormControl } from './formControls/InputFormControl';
import { OptionsFormString } from './OptionsFormString';
import { PropertyType } from '../constants';
import { OptionsFormObject } from './OptionsFormObject';
import { OptionsFormNumber } from './OptionsFormNumber';

type Props = {
  type: PropertyType;
};

export const OptionsForm = ({ type }: Props) => {
  const typeOptions: Record<PropertyType, ReactNode> = {
    [PropertyType.OBJECT]: <OptionsFormObject />,
    [PropertyType.STRING]: <OptionsFormString />,
    [PropertyType.NUMBER]: <OptionsFormNumber />,
    [PropertyType.BOOLEAN]: <></>,
    [PropertyType.ARRAY]: <></>,
  };

  return (
    <Stack mb={3}>
      <InputFormControl label="Title" placeholder="Enter title" />
      <InputFormControl label="Description" placeholder="Enter description" />
      {typeOptions[type]}
      <Flex justify="flex-end">
        <Button size="sm" variant="solid">
          Close
        </Button>
      </Flex>
    </Stack>
  );
};
