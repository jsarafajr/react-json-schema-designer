import { JSONSchema7 } from 'json-schema';

declare module 'json-schema' {
  interface JSONSchema7 {
    _metadata?: {
      id: string
      path: string[]
    };
  }
}