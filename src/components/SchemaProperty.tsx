import React, { useState } from 'react';
import { JSONSchema7TypeName } from 'json-schema';
import { Box, Checkbox, Flex, HStack, Input, Select, Spacer, Divider } from '@chakra-ui/react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { ActionButton } from './ActionButton';
import { OptionsForm } from './OptionsForm';

type Props = {
  depth: number;
  name: string;
  required: boolean;
  type: JSONSchema7TypeName;
  collapsible?: boolean;
  collapsed?: boolean;
  disabled?: boolean;
  hasNested?: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  actions: {
    toggleCollapse: () => void;
    onTypeChange: (newType: JSONSchema7TypeName) => void;
    onRequiredChange: (newValue: boolean) => void;
    onNameChange: (newName: string) => void;
    onFieldChange: (fieldName: string, newValue: string) => void;
    onSubPropertyAdd: () => void;
    onRemove: () => void;
  };
};

const SHIFT_STEP_WIDTH = 25;
const supportedTypes: JSONSchema7TypeName[] = ['string', 'number', 'boolean', 'object', 'array'];

export const SchemaProperty = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const depthShift = SHIFT_STEP_WIDTH * props.depth;

  return (
    <>
      <HStack>
        <Flex width="100%">
          <Spacer maxW={`${depthShift}px`} />
          <HStack spacing="2px" flex={1}>
            <ActionButton dimmed icon="drag-handle" {...props.dragHandleProps} />
            <ActionButton
              icon={props.collapsed ? 'chevron-right' : 'chevron-down'}
              hidden={!props.collapsible}
              onClick={props.actions.toggleCollapse}
            />
            <ActionButton icon="add" hidden={props.type !== 'object'} onClick={props.actions.onSubPropertyAdd} />
            <Input
              placeholder="Enter name"
              size="sm"
              value={props.name}
              isDisabled={props.disabled}
              onChange={(e) => props.actions.onNameChange(e.target.value)}
            />
          </HStack>
        </Flex>
        <Checkbox
          isChecked={props.required}
          isDisabled={props.disabled}
          onChange={(e) => props.actions.onRequiredChange(e.target.checked)}
        />
        <Select
          size="sm"
          w={'10em'}
          value={props.type}
          onChange={(e) => props.actions.onTypeChange(e.target.value as JSONSchema7TypeName)}
        >
          {supportedTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </Select>
        <HStack spacing={0}>
          <ActionButton icon="edit" active={isEditing} onClick={() => setIsEditing((isEditing) => !isEditing)} />
          <ActionButton icon="delete" onClick={props.actions.onRemove} />
        </HStack>
      </HStack>
      {isEditing && (
        <Flex>
          <Spacer maxW={`${depthShift + 8}px`} />
          <Box>
            <Divider orientation="vertical" opacity={1} />
          </Box>
          <Spacer maxW="46px" />
          <Box flex={1}>
            <OptionsForm type={props.type} onClose={() => setIsEditing(false)} />
          </Box>
          <Spacer maxW="40px" />
        </Flex>
      )}
    </>
  );
};
