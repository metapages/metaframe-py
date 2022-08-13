import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { WithMetaframe } from "@metapages/metaframe-hook";
import { App } from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <ChakraProvider>
      <WithMetaframe>
        <App />
      </WithMetaframe>
    </ChakraProvider>
  </StrictMode>
);
