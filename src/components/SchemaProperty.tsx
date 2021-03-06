import React, { useState } from 'react';
import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import { Box, Checkbox, Flex, HStack, Input, Select, Spacer, Divider } from '@chakra-ui/react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { ActionButton } from './ActionButton';
import { OptionsForm } from './OptionsForm';

type Props = {
  depth: number;
  name: string;
  required: boolean;
  schema: JSONSchema7;
  editable?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  disabled?: boolean;
  hasNested?: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  actions?: {
    toggleCollapse?: () => void;
    onTypeChange?: (newType: JSONSchema7TypeName) => void;
    onRequiredChange?: (newValue: boolean) => void;
    onNameChange?: (newName: string) => void;
    onKeywordChange?: (keyword: string, newValue?: string | string[] | number) => void;
    onSubPropertyAdd?: () => void;
    onRemove?: () => void;
  };
};

const SHIFT_STEP_WIDTH = 25;
const supportedTypes: JSONSchema7TypeName[] = ['string', 'number', 'boolean', 'object', 'array'];

export const SchemaProperty = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const depthShift = SHIFT_STEP_WIDTH * props.depth;

  const editable = props.editable ?? true;

  return (
    <>
      <HStack>
        <Flex width="100%">
          <Spacer maxW={`${depthShift}px`} />
          <HStack spacing="2px" flex={1}>
            {editable && <ActionButton dimmed hidden={props.disabled} icon="drag-handle" {...props.dragHandleProps} />}
            {editable && (
              <ActionButton
                icon={props.collapsed ? 'chevron-right' : 'chevron-down'}
                hidden={!props.collapsible}
                onClick={props.actions?.toggleCollapse}
              />
            )}
            <ActionButton
              icon="add"
              hidden={props.schema.type !== 'object'}
              onClick={props.actions?.onSubPropertyAdd}
            />
            <Input
              placeholder="Enter name"
              size="sm"
              value={props.name}
              isDisabled={!editable || props.disabled}
              onChange={(e) => props.actions?.onNameChange?.(e.target.value)}
            />
          </HStack>
        </Flex>
        <Checkbox
          isChecked={props.required}
          isDisabled={!editable || props.disabled}
          onChange={(e) => props.actions?.onRequiredChange?.(e.target.checked)}
        />
        <Select
          size="sm"
          w={'10em'}
          value={props.schema.type}
          isDisabled={!editable}
          onChange={(e) => props.actions?.onTypeChange?.(e.target.value as JSONSchema7TypeName)}
        >
          {supportedTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </Select>
        <HStack spacing={0}>
          <ActionButton
            icon="edit"
            active={isEditing}
            hidden={!editable}
            onClick={() => setIsEditing((isEditing) => !isEditing)}
          />
          <ActionButton icon="delete" hidden={!editable} onClick={props.actions?.onRemove} />
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
            <OptionsForm
              schema={props.schema}
              onKeywordChange={(keyword, value) => props.actions?.onKeywordChange?.(keyword, value)}
              onClose={() => setIsEditing(false)}
            />
          </Box>
          <Spacer maxW="40px" />
        </Flex>
      )}
    </>
  );
};
