import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useHashParamBase64 } from "@metapages/hash-query";
import { MetaframeInputMap } from "@metapages/metapage";
import { MetaframeStandaloneComponent } from "@metapages/metapage-embed-react";
import { useCallback } from "react";
import { useMetaframeUrl } from "/@/hooks/useMetaframeUrl";

export const PanelCode: React.FC = () => {
  const [code, setCode] = useHashParamBase64("js");
  const { url } = useMetaframeUrl();

  const onCodeOutputsUpdate = useCallback(
    (outputs: MetaframeInputMap) => {
      setCode(outputs.text);
    },
    [setCode]
  );

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
          {url ? (
            <MetaframeStandaloneComponent
              url={
                "https://editor.mtfm.io/#?options=eyJoaWRlbWVudWlmaWZyYW1lIjp0cnVlLCJtb2RlIjoiamF2YXNjcmlwdCIsInNhdmVsb2FkaW5oYXNoIjp0cnVlLCJ0aGVtZSI6InZzLWRhcmsifQ=="
              }
              inputs={{ text: code }}
              onOutputs={onCodeOutputsUpdate}
            />
          ) : null}
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
