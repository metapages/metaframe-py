import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import {
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';
import { WithMetaframe } from '@metapages/metaframe-hook';

import { App } from './App';

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <WithMetaframe>
        <App />
      </WithMetaframe>
    </ChakraProvider>
  </StrictMode>
);
