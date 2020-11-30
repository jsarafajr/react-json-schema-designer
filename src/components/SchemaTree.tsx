import React from 'react';
import { JSONSchema7 } from 'json-schema';
import { Stack, Collapse, useDisclosure } from '@chakra-ui/react';
import { SchemaProperty } from './SchemaProperty';
import { PropertyType } from '../constants';

export type SchemaTreeProps = {
  schema: JSONSchema7;
  path?: string[];
  depth?: number;
  onPropertyNameChange: (path: string[], name: string) => void;
  onPropertyTypeChange: (path: string[], type: PropertyType) => void;
  onPropertyKeywordUpdate: (path: string[], value: string) => void;
  onPropertyRequiredChange: (path: string[], required: boolean) => void;
};

type SchemaTreeItemProps = Required<SchemaTreeProps> & {
  propertyName: string;
  isRequired: boolean;
};

const SchemaTreeItem = (props: SchemaTreeItemProps) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <>
      <SchemaProperty
        name={props.propertyName}
        required={props.isRequired}
        type={props.schema.type! as PropertyType}
        depth={props.depth}
        collapsed={!isOpen}
        actions={{
          toggleCollapse: onToggle,
          onNameChange: (newName: string) => props.onPropertyNameChange(props.path, newName),
          onRequiredChange: (newValue => props.onPropertyRequiredChange(props.path, newValue)),
          onTypeChange: (newType: PropertyType) => props.onPropertyTypeChange(props.path, newType),
          onFieldChange: (newName: string) => props.onPropertyKeywordUpdate(props.path, newName),
        }}
      />
      {
        props.schema.type === 'object' && props.schema.properties &&
        <Collapse in={isOpen} unmountOnExit={true}> {/* https://github.com/chakra-ui/chakra-ui/issues/2534 */ }
          <SchemaTree
            {...props}
            depth={props.depth + 1}
          />
        </Collapse>
      }
    </>
  )
};

export const SchemaTree = (props: SchemaTreeProps) => {
  const { required, properties = {} } = props.schema;
  const depth = props.depth ?? 0;
  const path = props.path ?? [];

  const isRequired = (fieldName: string) => required?.includes(fieldName) ?? false;

  return (
    <Stack>
      {
        Object.entries(properties).map(([propertyName, propertySchema], index) => {
          if (typeof propertySchema === 'boolean') {
            // TODO: handle this
            return '';
          }

          return <SchemaTreeItem
            {...props}
            key={index}
            propertyName={propertyName}
            isRequired={isRequired(propertyName)}
            schema={propertySchema}
            path={[...path, 'properties', propertyName]}
            depth={depth}
          />
        })
      }
    </Stack>
  )
};