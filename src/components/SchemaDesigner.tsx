import React, { useState } from 'react';
import { ChakraProvider, Stack } from '@chakra-ui/react';
import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import { SchemaTree } from './SchemaTree';
import * as schemaModifiers from '../schema-modifiers';
import { SchemaRoot } from './SchemaRoot';

export type SchemaDesignerProps = {
  defaultSchema: JSONSchema7;
  onChange?: (newSchema: JSONSchema7) => void;
};

export const SchemaDesigner = (props: SchemaDesignerProps) => {
  const [schema, setSchema] = useState(schemaModifiers.enrichWithMetadata(props.defaultSchema));

  const updateSchemaState = (callback: (prevSchema: JSONSchema7) => JSONSchema7) => {
    setSchema((prevSchema) => {
      const nextSchema = callback(prevSchema);
      props.onChange?.(schemaModifiers.stripMetadata(nextSchema));
      return nextSchema;
    });
  };

  const updatePropertyName = (path: string[], newName: string) =>
    updateSchemaState((prevSchema) => schemaModifiers.renameProperty(prevSchema, path, newName));

  const updatePropertyType = (path: string[], newType: JSONSchema7TypeName) =>
    updateSchemaState((prevSchema) => schemaModifiers.setPropertyType(prevSchema, path, newType));

  const updatePropertyKeyword = (path: string[], keyword: string, value?: string | string[] | number) =>
    updateSchemaState((prevSchema) => schemaModifiers.setPropertyKeywordValue(prevSchema, path, keyword, value));

  const updatePropertyRequiredStatus = (path: string[], requiredStatus: boolean) =>
    updateSchemaState((prevSchema) => schemaModifiers.setPropertyRequire(prevSchema, path, requiredStatus));

  const addSubProperty = (path: string[]) =>
    updateSchemaState((prevSchema) => schemaModifiers.addNewSubProperty(prevSchema, path));

  const removeProperty = (path: string[]) =>
    updateSchemaState((prevSchema) => schemaModifiers.removeProperty(prevSchema, path));

  const reorderSubProperty = (path: string[], fromIndex: number, toIndex: number) =>
    updateSchemaState((prevSchema) => schemaModifiers.reorderSubProperty(prevSchema, path, fromIndex, toIndex));

  return (
    <ChakraProvider>
      <Stack>
        <SchemaRoot onSubPropertyAdd={() => addSubProperty([])} />
        <SchemaTree
          schema={schema}
          onPropertyNameChange={updatePropertyName}
          onPropertyTypeChange={updatePropertyType}
          onPropertyRequiredChange={updatePropertyRequiredStatus}
          onPropertyKeywordUpdate={updatePropertyKeyword}
          onSubPropertyAdd={addSubProperty}
          onPropertyRemove={removeProperty}
          onSubPropertyReorder={reorderSubProperty}
        />
      </Stack>
    </ChakraProvider>
  );
};
