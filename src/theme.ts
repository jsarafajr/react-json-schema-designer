import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  components: {
    Button: {
      // TODO: check why default theming doesn't work
      defaultProps: {
        size: 'sm',
      },
    },
  },
});
