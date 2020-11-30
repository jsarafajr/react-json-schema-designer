import React, { useState } from 'react';
import { Checkbox, Flex, HStack, Input, Select, Spacer } from '@chakra-ui/react';
import { PropertyType } from '../constants';
import { ActionButton } from './ActionButton';
import { OptionsForm } from './OptionsForm';

type Props = {
  depth: number;
  name: string;
  required: boolean;
  type: PropertyType;
  title?: string;
  collapsed?: boolean;
  actions: {
    toggleCollapse: () => void;
    onTypeChange: (newType: PropertyType) => void;
    onRequiredChange: (newValue: boolean) => void;
    onNameChange: (newName: string) => void;
    onFieldChange: (fieldName: string, newValue: string) => void;
  }
};

const SHIFT_STEP_WIDTH = 30;

export const SchemaProperty = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const depthShift = SHIFT_STEP_WIDTH * props.depth;

  return (
    <>
      <HStack>
        <Flex width="100%">
          <Spacer />
          <HStack spacing="2px" width={`calc(100% - ${depthShift}px)`}>
            <ActionButton dimmed icon="drag-handle" />
            <ActionButton
              hidden={![PropertyType.OBJECT, PropertyType.ARRAY].includes(props.type)}
              icon={props.collapsed ? 'chevron-right' : 'chevron-down'}
              onClick={props.actions.toggleCollapse}
            />
            <ActionButton hidden={props.type !== PropertyType.OBJECT} icon="add" />
            <Input
              placeholder="Enter name"
              size="sm"
              value={props.name}
              onChange={(e) => props.actions.onNameChange(e.target.value)}
            />
          </HStack>
        </Flex>
        <Checkbox isChecked={props.required} onChange={e => props.actions.onRequiredChange(e.target.checked)} />
        <Select size="sm" w={'14em'} value={props.type}
                onChange={e => props.actions.onTypeChange(e.target.value as PropertyType)}>
          {
            Object.values(PropertyType).map(type => <option key={type}>{type}</option>)
          }
        </Select>
        <HStack spacing={0}>
          <ActionButton
            icon="edit"
            active={isEditing}
            onClick={() => setIsEditing(isEditing => !isEditing)}
          />
          <ActionButton icon="delete" />
        </HStack>
      </HStack>
      {
        isEditing && (
          <Flex>
            <Spacer />
            <OptionsForm />
          </Flex>
        )
      }
    </>
  )
};
