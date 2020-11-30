import { JSONSchema7 } from 'json-schema';

export const schema: JSONSchema7 = {
  type: 'object',
  required: [
    'firstName',
    'lastName'
  ],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
    },
    lastName: {
      type: 'string',
      title: 'Last name'
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
    }
  }
}