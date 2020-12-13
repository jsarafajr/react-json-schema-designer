import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import { produce } from 'immer';
import { get, set } from 'lodash-es';
import { findAvailableKeyName, renameInArray, renameObjectKey } from './utils';

const validatePropertyPath = (schema: JSONSchema7, path: string[]): void => {
  if (path.length < 2) {
    throw new Error('wrong property path');
  }
};

export const renameProperty = (schema: JSONSchema7, path: string[], newName: string): JSONSchema7 => {
  validatePropertyPath(schema, path);

  const oldName = path[path.length - 1];
  // 2 steps back - fieldName and properties
  const parentSchemaPath = path.slice(0, path.length - 2);

  return produce(schema, (schemaDraft) => {
    const parentSchema =
      parentSchemaPath.length === 0 // lodash returns wrong value with empty array
        ? schemaDraft
        : get(schemaDraft, path.slice(0, path.length - 2));

    parentSchema.properties = renameObjectKey(parentSchema.properties, oldName, newName);

    if (parentSchema.required) {
      parentSchema.required = renameInArray(parentSchema.required, oldName, newName);
    }
  });
};

export const setPropertyRequire = (schema: JSONSchema7, path: string[], require: boolean): JSONSchema7 => {
  validatePropertyPath(schema, path);

  const fieldName = path[path.length - 1];
  const parentSchemaPath = path.slice(0, path.length - 2);

  return produce(schema, (schemaDraft) => {
    const parentSchema =
      parentSchemaPath.length === 0 // lodash returns wrong value with empty array
        ? schemaDraft
        : get(schemaDraft, path.slice(0, path.length - 2));

    if (!parentSchema.required) {
      parentSchema.required = [];
    }

    if (require && !parentSchema.required.includes(fieldName)) {
      parentSchema.required.push(fieldName);
    }

    if (!require) {
      parentSchema.required = parentSchema.required.filter((value: string) => value !== fieldName);
    }

    if (!parentSchema.required.length) {
      delete parentSchema.required;
    }
  });
};

export const setPropertyKeywordValue = (
  schema: JSONSchema7,
  path: string[],
  value: string | number | boolean
): JSONSchema7 => {
  validatePropertyPath(schema, path);

  return produce(schema, (schemaDraft) => {
    set(schemaDraft, path, value);
  });
};

export const setPropertyType = (schema: JSONSchema7, path: string[], newType: JSONSchema7TypeName): JSONSchema7 => {
  validatePropertyPath(schema, path);

  return produce(schema, (schemaDraft) => {
    const oldProperty = get(schemaDraft, path);
    const newProperty: JSONSchema7 = {
      type: newType,
    };

    if (newType === 'array') {
      newProperty.items = {
        type: 'string',
      }
    }

    if (oldProperty.title) newProperty.title = oldProperty.title;
    if (oldProperty.description) newProperty.description = oldProperty.description;

    set(schemaDraft, path, newProperty);
  });
};

export const addNewProperty = (schema: JSONSchema7, path: string[]): JSONSchema7 => {
  validatePropertyPath(schema, path);

  return produce(schema, (schemaDraft) => {
    const property = get(schemaDraft, path);

    if (property.type !== 'object') {
      throw new Error('adding properties is not allowed to this type');
    }

    if (!property.properties) {
      property.properties = {};
    }

    const newPropertyName = findAvailableKeyName(property.properties, 'newProperty');

    property.properties[newPropertyName] = {
      type: 'string'
    }
  });
};

export const removeProperty = (schema: JSONSchema7, path: string[]): JSONSchema7 => {
  validatePropertyPath(schema, path);

  const fieldName = path[path.length - 1];
  const parentSchemaPath = path.slice(0, path.length - 2);

  return produce(schema, (schemaDraft) => {
    const parentProperty = get(schemaDraft, parentSchemaPath);

    delete parentProperty.properties[fieldName];

    if (!Object.keys(parentProperty.properties).length) {
      delete parentProperty.properties;
    }
  });
};