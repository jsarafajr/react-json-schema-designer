import React from 'react';
import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import { Stack, Collapse, useDisclosure } from '@chakra-ui/react';
import { omit } from 'lodash-es';
import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from 'react-beautiful-dnd';
import { SchemaProperty } from './SchemaProperty';

export type SchemaTreeProps = {
  schema: JSONSchema7;
  path?: string[];
  depth?: number;
  onPropertyNameChange: (path: string[], name: string) => void;
  onPropertyTypeChange: (path: string[], type: JSONSchema7TypeName) => void;
  onPropertyKeywordUpdate: (path: string[], keyword: string, value?: string | string[] | number) => void;
  onPropertyRequiredChange: (path: string[], required: boolean) => void;
  onPropertyRemove: (path: string[]) => void;
  onSubPropertyAdd: (path: string[]) => void;
  onSubPropertyReorder: (path: string[], fromIndex: number, toIndex: number) => void;
};

type SchemaTreeItemProps = Required<SchemaTreeProps> & {
  propertyName: string;
  propertyIndex: number;
  required: boolean;
  static?: boolean;
};

const SchemaTreeItem = (props: SchemaTreeItemProps) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const hasSubProperties = Boolean(props.schema.type === 'object' && props.schema.properties);

  return (
    <Draggable draggableId={`draggable_${props.schema._metadata?.id}`} index={props.propertyIndex}>
      {(provided) => (
        <Stack ref={provided.innerRef} {...provided.draggableProps}>
          <SchemaProperty
            name={props.propertyName}
            required={props.required}
            schema={props.schema}
            disabled={props.static}
            depth={props.depth}
            collapsible={hasSubProperties}
            collapsed={!isOpen}
            dragHandleProps={provided.dragHandleProps}
            actions={{
              toggleCollapse: onToggle,
              onNameChange: (newName: string) => props.onPropertyNameChange(props.path, newName),
              onRequiredChange: (newValue) => props.onPropertyRequiredChange(props.path, newValue),
              onTypeChange: (newType: JSONSchema7TypeName) => props.onPropertyTypeChange(props.path, newType),
              onKeywordChange: (keyword, value) => props.onPropertyKeywordUpdate(props.path, keyword, value),
              onSubPropertyAdd: () => props.onSubPropertyAdd(props.path),
              onRemove: () => props.onPropertyRemove(props.path),
            }}
          />
          {hasSubProperties && (
            <Collapse in={isOpen}>
              <SchemaTree
                {...omit(props, 'static')} // workaround to fix making nested fields static 🙈 fix this
                depth={props.depth + 1}
              />
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
        </Stack>
      )}
    </Draggable>
  );
};

export const SchemaTree = (props: SchemaTreeProps) => {
  const { required, properties = {}, _metadata } = props.schema;
  const depth = props.depth ?? 0;
  const path = props.path ?? [];

  const isRequired = (fieldName: string) => required?.includes(fieldName) ?? false;

  const onPropertyDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    props.onSubPropertyReorder(path, result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onPropertyDragEnd}>
      <Droppable droppableId={`droppable_${_metadata?.id}`}>
        {(provided) => (
          <Stack py="1px" ref={provided.innerRef} {...provided.droppableProps}>
            {Object.entries(properties).map(([propertyName, propertySchema], index) => {
              if (typeof propertySchema === 'boolean') {
                // TODO: handle this
                return '';
              }

              return (
                <SchemaTreeItem
                  {...props}
                  key={propertySchema._metadata?.id}
                  propertyIndex={index}
                  propertyName={propertyName}
                  required={isRequired(propertyName)}
                  schema={propertySchema}
                  path={[...path, 'properties', propertyName]}
                  depth={depth}
                />
              );
            })}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
};
