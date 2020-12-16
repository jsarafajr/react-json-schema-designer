import { JSONSchema7 } from 'json-schema';

export type PropertyMetadata = {
  id: string
};

declare module 'json-schema' {
  interface JSONSchema7 {
    _metadata?: PropertyMetadata;
  }
}