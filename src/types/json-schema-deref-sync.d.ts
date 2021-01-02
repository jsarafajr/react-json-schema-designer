declare module 'json-schema-deref-sync' {
  import { JSONSchema7 } from 'json-schema';

  type Options = {
    mergeAdditionalProperties?: boolean;
  };

  function deref(jsonSchema: JSONSchema7, options: Options): JSONSchema7;

  export = deref;
}
