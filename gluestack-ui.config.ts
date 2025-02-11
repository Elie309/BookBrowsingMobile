import { createConfig } from '@gluestack-ui/themed';
import {config as defaultConfig} from '@gluestack-ui/config';

export const config = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      primary: {
        light: '#fbdaaf',
        main: '#F4A236',
        dark: '#EA8B0D',
        contrastText: '#fff',
      },
    },
  },
});
