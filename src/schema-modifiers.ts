import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import { produce } from 'immer';
import { get as lodashGet, set, omit, mapValues } from 'lodash-es';
import { v4 as uuid } from 'uuid';
import { findAvailableKeyName, renameInArray, renameObjectKey, reorderObjectKey } from './utils';
import { PropertyMetadata } from './json-schema-with-metadata';

const get = (immerInput: object, path: string[]) => {
  // lodash returns immer Proxy value when path is empty array
  return path.length === 0 ? immerInput : lodashGet(immerInput, path);
};

const validateNestedPropertyPath = (schema: JSONSchema7, path: string[]): void => {
  if (path.length < 2) {
    throw new Error('wrong property path');
  }
};

const traverseProperties = (
  schema: JSONSchema7,
  predicate: (property: JSONSchema7) => JSONSchema7 | void
): JSONSchema7 => {
  const traverseHelper = (property: JSONSchema7, path: string[]): JSONSchema7 => {
    const newSchema: JSONSchema7 = { ...(predicate(property) ?? property) };

    if (newSchema.type === 'object' && newSchema.properties) {
      newSchema.properties = mapValues(newSchema.properties, (propertySchema, propertyName) =>
        traverseHelper(propertySchema as JSONSchema7, [...path, 'properties', propertyName])
      );
    }

    if (newSchema.type === 'array' && newSchema.items) {
      newSchema.items = traverseHelper(newSchema.items as JSONSchema7, [...path, 'items']);
    }

    return newSchema;
  };

  return traverseHelper(schema, []);
};

// TODO: dereference
export const enrichWithMetadata = (schema: JSONSchema7): JSONSchema7 => {
  return traverseProperties(schema, (property) => ({
    ...property,
    _metadata: generatePropertyMetadata(property),
  }));
};

export const stripMetadata = (schemaWithMetadata: JSONSchema7): JSONSchema7 => {
  return traverseProperties(schemaWithMetadata, (property => omit(property, '_metadata')));
};

export const generatePropertyMetadata = (schema: JSONSchema7): PropertyMetadata => {
  return {
    id: uuid(),
  };
};

export const renameProperty = (schema: JSONSchema7, path: string[], newName: string): JSONSchema7 => {
  validateNestedPropertyPath(schema, path);

  const oldName = path[path.length - 1];
  // 2 steps back - fieldName and properties
  const parentSchemaPath = path.slice(0, path.length - 2);

  return produce(schema, (schemaDraft) => {
    const parentSchema = get(schemaDraft, parentSchemaPath);

    parentSchema.properties = renameObjectKey(parentSchema.properties, oldName, newName);

    if (parentSchema.required) {
      parentSchema.required = renameInArray(parentSchema.required, oldName, newName);
    }
  });
};

export const setPropertyRequire = (schema: JSONSchema7, path: string[], require: boolean): JSONSchema7 => {
  validateNestedPropertyPath(schema, path);

  const fieldName = path[path.length - 1];
  const parentSchemaPath = path.slice(0, path.length - 2);

  return produce(schema, (schemaDraft) => {
    const parentSchema = get(schemaDraft, parentSchemaPath);

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
  validateNestedPropertyPath(schema, path);

  return produce(schema, (schemaDraft) => {
    set(schemaDraft, path, value);
  });
};

export const setPropertyType = (schema: JSONSchema7, path: string[], newType: JSONSchema7TypeName): JSONSchema7 => {
  validateNestedPropertyPath(schema, path);

  return produce(schema, (schemaDraft) => {
    const oldProperty = get(schemaDraft, path);
    const newProperty: JSONSchema7 = {
      type: newType,
    };

    if (oldProperty.title) newProperty.title = oldProperty.title;
    if (oldProperty.description) newProperty.description = oldProperty.description;

    if (newType === 'array') {
      newProperty.items = {
        type: 'string',
      };
    }

    newProperty._metadata = generatePropertyMetadata(newProperty);

    set(schemaDraft, path, newProperty);
  });
};

export const reorderSubProperty = (
  schema: JSONSchema7,
  path: string[],
  fromIndex: number,
  toIndex: number
): JSONSchema7 => {
  return produce(schema, (schemaDraft) => {
    const parentProperty = get(schemaDraft, path);

    if (parentProperty.type !== 'object' || !parentProperty.properties) {
      throw new Error('reordering allowed only for objects');
    }

    parentProperty.properties = reorderObjectKey(parentProperty.properties, fromIndex, toIndex);
  });
};

export const addNewSubProperty = (schema: JSONSchema7, path: string[]): JSONSchema7 => {
  return produce(schema, (schemaDraft) => {
    const property = get(schemaDraft, path);

    if (property.type !== 'object') {
      throw new Error('adding properties is not allowed to this type');
    }

    if (!property.properties) {
      property.properties = {};
    }

    const newPropertyName = findAvailableKeyName(property.properties, 'newProperty');
    const newPropertySchema: JSONSchema7 = {
      type: 'string',
    };

    property.properties[newPropertyName] = {
      ...newPropertySchema,
      _metadata: generatePropertyMetadata(newPropertySchema),
    };
  });
};

export const removeProperty = (schema: JSONSchema7, path: string[]): JSONSchema7 => {
  validateNestedPropertyPath(schema, path);

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
