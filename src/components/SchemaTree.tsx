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
  onSubPropertyAdd: (path: string[]) => void;
  onPropertyRemove: (path: string[]) => void;
};

type SchemaTreeItemProps = Required<SchemaTreeProps> & {
  propertyName: string;
  required: boolean;
  static?: boolean;
};

const SchemaTreeItem = (props: SchemaTreeItemProps) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const hasSubProperties = Boolean(props.schema.type === 'object' && props.schema.properties);

  return (
    <>
      <SchemaProperty
        name={props.propertyName}
        required={props.required}
        disabled={props.static}
        type={props.schema.type! as PropertyType}
        depth={props.depth}
        collapsible={hasSubProperties}
        collapsed={!isOpen}
        actions={{
          toggleCollapse: onToggle,
          onNameChange: (newName: string) => props.onPropertyNameChange(props.path, newName),
          onRequiredChange: (newValue) => props.onPropertyRequiredChange(props.path, newValue),
          onTypeChange: (newType: PropertyType) => props.onPropertyTypeChange(props.path, newType),
          onFieldChange: (newName: string) => props.onPropertyKeywordUpdate(props.path, newName),
          onSubPropertyAdd: () => props.onSubPropertyAdd(props.path),
          onRemove: () => props.onPropertyRemove(props.path),
        }}
      />
      {hasSubProperties && (
        <Collapse in={isOpen}>
          <SchemaTree {...props} depth={props.depth + 1} />
        </Collapse>
      )}
      {props.schema.type === 'array' && props.schema.items && (
        <SchemaTreeItem
          {...props}
          static
          required
          schema={props.schema.items as JSONSchema7}
          path={[...props.path, 'items']}
          depth={props.depth + 1}
          propertyName="items"
        />
      )}
    </>
  );
};

export const SchemaTree = (props: SchemaTreeProps) => {
  const { required, properties = {} } = props.schema;
  const depth = props.depth ?? 0;
  const path = props.path ?? [];

  const isRequired = (fieldName: string) => required?.includes(fieldName) ?? false;

  return (
    <Stack py="1px">
      {Object.entries(properties).map(([propertyName, propertySchema], index) => {
        if (typeof propertySchema === 'boolean') {
          // TODO: handle this
          return '';
        }

        return (
          <SchemaTreeItem
            {...props}
            key={`${path.join('_')}${index}`}
            propertyName={propertyName}
            required={isRequired(propertyName)}
            schema={propertySchema}
            path={[...path, 'properties', propertyName]}
            depth={depth}
          />
        );
      })}
    </Stack>
  );
};
