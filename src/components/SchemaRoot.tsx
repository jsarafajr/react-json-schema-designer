import React from 'react';
import { SchemaProperty } from './SchemaProperty';

type Props = {
  onSubPropertyAdd: () => void;
};

export const SchemaRoot = (props: Props) => {
  return (
    <SchemaProperty
      required
      editable={false}
      depth={0}
      name="root"
      schema={{ type: "object" }}
      actions={{
        onSubPropertyAdd: props.onSubPropertyAdd,
      }}
    />
  );
};
