import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { MetaframeStandaloneComponent } from "@metapages/metapage-embed-react";
import { Config, configToUrl, urlToConfig } from "../shared/config";
import { MetaframeInputMap } from "@metapages/metapage";
import {
  setHashValueInHashString,
  stringToBase64String,
  useHashParamBase64,
} from "@metapages/hash-query";
import { FormModulesAndCss } from "./FormModulesAndCss";
import { FormDefinition } from './FormDefinition';
import { MetapageUrl } from "./MetapageUrl";

export const Route: React.FC = () => {
  const [code, setCode] = useHashParamBase64("js");
  const [config, setConfig] = useState<Config>(
    urlToConfig(new URL(window.location.href))
  );
  const [url, setUrl] = useState<string>();

  // update the url
  useEffect(() => {
    const url = new URL(window.location.href);
    configToUrl(url, config);
    url.pathname = "";
    url.host = import.meta.env.VITE_SERVER_ORIGIN.split(":")[0];
    url.port = import.meta.env.VITE_SERVER_ORIGIN.split(":")[1];
    if (code) {
      url.hash = setHashValueInHashString(
        url.hash,
        "js",
        stringToBase64String(code)
      );
    }
    setUrl(url.href);

    const thisWindowUrl = new URL(window.location.href);
    configToUrl(thisWindowUrl, config);
    window.history.replaceState({}, "", thisWindowUrl.href);
  }, [config, code, setUrl]);

  const onCodeOutputsUpdate = useCallback(
    (outputs: MetaframeInputMap) => {
      setCode(outputs.value);
    },
    [setCode]
  );

  return (
    <VStack padding={10} alignItems="flex-start" width="100%">
      <SimpleGrid columns={2} spacing={10} width="100%">
        <FormModulesAndCss config={config} setConfig={setConfig} />
        <MetapageUrl url={url} />
        <FormDefinition config={config} setConfig={setConfig} />
      </SimpleGrid>
      <HStack rounded="md" width="100%" alignItems="flex-start"></HStack>

      <br />
      <br />
      <br />
      <Divider />
      <br />
      <br />

      <HStack width="100%" spacing={10}>
        <VStack width="100%" alignItems="flex-start">
          <Heading size="sm">Embedded javascript (in URL hash)</Heading>

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
                  "https://metapages.github.io/metaframe-editor/#?options=eyJtb2RlIjoiamF2YXNjcmlwdCIsInNhdmVsb2FkaW5oYXNoIjp0cnVlLCJ0aGVtZSI6InZzLWRhcmsifQ=="
                }
                inputs={{ value: code }}
                onOutputs={onCodeOutputsUpdate}
              />
            ) : null}
          </Box>
        </VStack>

        <VStack width="100%" alignItems="flex-start">
          <Heading size="sm">Metaframe with modules and code loaded</Heading>

          <Box height="400px" width="100%" borderWidth="1px" p={2} rounded="md">
            {url ? <MetaframeStandaloneComponent url={url} /> : null}
          </Box>
        </VStack>
      </HStack>
    </VStack>
  );
};
