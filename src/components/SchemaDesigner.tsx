import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { JSONSchema7 } from 'json-schema';
import { theme } from '../theme';
import { SchemaTree } from './SchemaTree';
import { setPropertyKeywordValue, renameProperty, setPropertyRequire, setPropertyType } from '../schema-modifiers';
import { PropertyType } from '../constants';

export type SchemaDesignerProps = {
  defaultSchema: JSONSchema7;
  onChange?: (newSchema: JSONSchema7) => void;
};

export const SchemaDesigner = (props: SchemaDesignerProps) => {
  const [schema, setSchema] = useState(props.defaultSchema);

  const updatePropertyName = (path: string[], newName: string) => {
    setSchema(prevSchema => {
      const nextSchema = renameProperty(prevSchema, path, newName);
      props.onChange?.(nextSchema);
      return nextSchema;
    });
  };

  const updatePropertyType = (path: string[], newType: PropertyType) => {
    setSchema(prevSchema => {
      const nextSchema = setPropertyType(prevSchema, path, newType);
      props.onChange?.(nextSchema);
      return nextSchema;
    })
  };

  const updatePropertyKeyword = (path: string[], value: string | number) => {
    setSchema(prevSchema => {
      const nextSchema = setPropertyKeywordValue(prevSchema, path, value);
      props.onChange?.(nextSchema);
      return nextSchema;
    });
  };

  const updatePropertyRequiredStatus = (path: string[], requiredStatus: boolean) => {
    setSchema(prevSchema => {
      const nextSchema = setPropertyRequire(prevSchema, path, requiredStatus);
      props.onChange?.(nextSchema);
      return nextSchema;
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <SchemaTree
        schema={schema}
        onPropertyNameChange={updatePropertyName}
        onPropertyTypeChange={updatePropertyType}
        onPropertyRequiredChange={updatePropertyRequiredStatus}
        onPropertyKeywordUpdate={updatePropertyKeyword}
      />
    </ChakraProvider>
  )
};
