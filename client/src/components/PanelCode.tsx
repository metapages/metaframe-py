import { useCallback, useRef, useState } from "react";
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useHashParamBase64 } from "@metapages/hash-query";
import { MetaframeInputMap } from "@metapages/metapage";
import { MetaframeStandaloneComponent } from "@metapages/metapage-embed-react";
import { useMetaframeUrl } from "/@/hooks/useMetaframeUrl";

export const PanelCode: React.FC = () => {
  const [code, setCode] = useHashParamBase64("js");
  const { url } = useMetaframeUrl();

  return (
    <HStack width="100%" spacing={10}>
      <VStack width="100%" alignItems="flex-start">
        <Heading size="sm">Javascript code</Heading>

        <Box
          height="400px"
          width="100%"
          borderWidth="1px"
          p={2}
          rounded="md"
          overflow="scroll"
        >
          {url ? <LocalEditor code={code} setCode={setCode} /> : null}
        </Box>
      </VStack>

      <VStack width="100%" alignItems="flex-start">
        <Heading size="sm">Metaframe running code</Heading>

        <Box height="400px" width="100%" borderWidth="1px" p={2} rounded="md">
          {url ? <MetaframeStandaloneComponent url={url} /> : null}
        </Box>
      </VStack>
    </HStack>
  );
};

const LocalEditor: React.FC<{
  code: string;
  setCode: (code: string) => void;
}> = ({ code, setCode }) => {
  // only use the code prop initially, but then ignore so we don't get clobbering
  const codeInternal = useRef<string>(code);
  const inputs = useRef<{ text: string }>({ text: codeInternal.current });
  const onCodeOutputsUpdate = useCallback(
    (outputs: MetaframeInputMap) => {
      setCode(outputs.text);
    },
    [setCode]
  );

  return (
    <MetaframeStandaloneComponent
      url={
        "https://editor.mtfm.io/#?options=eyJhdXRvc2VuZCI6dHJ1ZSwiaGlkZW1lbnVpZmlmcmFtZSI6dHJ1ZSwibW9kZSI6ImphdmFzY3JpcHQiLCJzYXZlbG9hZGluaGFzaCI6dHJ1ZSwidGhlbWUiOiJ2cy1kYXJrIn0="
      }
      inputs={inputs.current}
      onOutputs={onCodeOutputsUpdate}
    />
  );
};
