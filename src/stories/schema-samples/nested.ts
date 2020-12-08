import { JSONSchema7 } from 'json-schema';

export const schema: JSONSchema7 = {
  type: 'object',
  required: ['fullName'],
  properties: {
    fullName: {
      type: 'string',
      title: 'Full name',
    },
    // TODO: add reference
    address: {
      type: 'object',
      properties: {
        house: {
          type: 'number',
        },
        street: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        country: {
          type: 'string',
        },
      },
    },
    creditCard: {
      type: 'object',
      properties: {
        number: {
          type: 'string',
        },
        billingAddress: {
          type: 'object',
          properties: {
            house: {
              type: 'number',
            },
            street: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            country: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};
