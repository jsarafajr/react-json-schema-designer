import React, { useState } from 'react';
import { JSONSchema7 } from 'json-schema';
import { Flex, Box } from '@chakra-ui/react';
import { SchemaDesigner } from '../components/SchemaDesigner';

export type ComponentProps = {
  schema: JSONSchema7;
};

export const Component = (props: ComponentProps) => {
  const [schema, setSchema] = useState(props.schema);

  return (
    <Flex>
      <Box>
        <SchemaDesigner defaultSchema={props.schema} onChange={setSchema} />
      </Box>
      <Box>
        <pre style={{ fontSize: '10px' }}>
          {JSON.stringify(schema, null, 2)}
        </pre>
      </Box>
    </Flex>
  );
};