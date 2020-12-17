import React, { ReactNode } from 'react';
import { Stack, Flex, Button, HStack, Box } from '@chakra-ui/react';
import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import { InputFormControl } from './formControls/InputFormControl';
import { CreatableListFormControl } from './formControls/CreatableListFormControl';

type Props = {
  schema: JSONSchema7;
  onKeywordChange: (keyword: string, value?: string | string[] | number) => void;
  onClose: () => void;
};

const OptionsFormString = (props: Props) => {
  return (
    <>
      <HStack>
        <InputFormControl
          type="number"
          numberMin={0}
          label="Min Length"
          placeholder="Enter number"
          value={props.schema.minLength}
          onChange={(value) => props.onKeywordChange('minLength', value)}
        />
        <InputFormControl
          type="number"
          numberMin={0}
          label="Max Length"
          placeholder="Enter number"
          value={props.schema.maxLength}
          onChange={(value) => props.onKeywordChange('maxLength', value)}
        />
      </HStack>
      <Box>
        <CreatableListFormControl
          label="Enum"
          placeholder="Enter values"
          value={props.schema.enum as string[]}
          onChange={(value) => props.onKeywordChange('enum', value)}
        />
      </Box>
    </>
  );
};

const OptionsFormNumber = (props: Props) => {
  return (
    <>
      <HStack>
        <InputFormControl
          type="number"
          label="Minimum"
          placeholder="Enter number"
          value={props.schema.minimum}
          onChange={(value) => props.onKeywordChange('minimum', value)}
        />
        <InputFormControl
          type="number"
          label="Maximum"
          placeholder="Enter number"
          value={props.schema.maximum}
          onChange={(value) => props.onKeywordChange('maximum', value)}
        />
      </HStack>
    </>
  );
};

const OptionsFormObject = (props: Props) => {
  return (
    <>
      <HStack>
        <InputFormControl
          type="number"
          numberMin={0}
          label="Min Properties"
          placeholder="Enter number"
          value={props.schema.minProperties}
          onChange={(value) => props.onKeywordChange('minProperties', value)}
        />
        <InputFormControl
          type="number"
          numberMin={0}
          label="Max Properties"
          placeholder="Enter number"
          value={props.schema.maxProperties}
          onChange={(value) => props.onKeywordChange('maxProperties', value)}
        />
      </HStack>
    </>
  );
};

const OptionsFormArray = (props: Props) => {
  return (
    <>
      <HStack>
        <InputFormControl
          type="number"
          numberMin={0}
          label="Min Items"
          placeholder="Enter number"
          value={props.schema.minItems}
          onChange={(value) => props.onKeywordChange('minItems', value)}
        />
        <InputFormControl
          type="number"
          numberMin={0}
          label="Max Items"
          placeholder="Enter number"
          value={props.schema.maxItems}
          onChange={(value) => props.onKeywordChange('maxItems', value)}
        />
      </HStack>
    </>
  );
};

export const OptionsForm = (props: Props) => {
  const typeOptions: Record<JSONSchema7TypeName, ReactNode> = {
    object: <OptionsFormObject {...props} />,
    string: <OptionsFormString {...props} />,
    number: <OptionsFormNumber {...props} />,
    boolean: <></>,
    array: <OptionsFormArray {...props} />,
    integer: <>not supported</>,
    null: <>not supported</>,
  };

  return (
    <Stack mb={3}>
      <InputFormControl
        label="Title"
        placeholder="Enter title"
        value={props.schema.title}
        onChange={(value) => props.onKeywordChange('title', value)}
      />
      <InputFormControl
        label="Description"
        placeholder="Enter description"
        value={props.schema.description}
        onChange={(value) => props.onKeywordChange('description', value)}
      />
      {typeOptions[props.schema.type as JSONSchema7TypeName]}
      <Flex justify="flex-end">
        <Button size="sm" variant="solid" onClick={props.onClose}>
          Close
        </Button>
      </Flex>
    </Stack>
  );
};
