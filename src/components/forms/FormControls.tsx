import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

type GenericFormControlProps = {

};

type InputFormControlProps = GenericFormControlProps & {
  label: string;
  placeholder: string;
};

export const InputFormControl = (props: InputFormControlProps) => {
  return (
    <FormControl mb={2}>
      <FormLabel fontSize="xs" mb={1}>{props.label}</FormLabel>
      <Input size="sm" type="text" placeholder={props.placeholder} />
    </FormControl>
  );
}
