import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Component, ComponentProps } from './Component';
import { schema as simpleSchema } from './schema-samples/simple';
import { schema as nestedSchema } from './schema-samples/nested';

export default {
  title: 'Examples',
  component: Component,
} as Meta;

const Template: Story<ComponentProps> = (args) => <Component {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  schema: simpleSchema,
};

export const Nested = Template.bind({});
Nested.args = {
  schema: nestedSchema,
};