import {
  useCallback,
  useRef,
} from 'react';

import { useMetaframeUrl } from '/@/hooks/useMetaframeUrl';

import {
  Box,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useHashParamBase64 } from '@metapages/hash-query';
import { MetaframeInputMap } from '@metapages/metapage';
import { MetaframeStandaloneComponent } from '@metapages/metapage-embed-react';

export const PanelCode: React.FC = () => {
  const [code, setCode] = useHashParamBase64("py");
  const { url } = useMetaframeUrl();

  return (
    <HStack width="100%" justifyContent="flex-start" h="100%" spacing="0px">
      <VStack width="100%" alignItems="flex-start" bg="white" h="100%">
        <Box
          height="100%"
          width="100%"
          rounded="md"
          overflow="scroll"
          className="transparent borderFatSolidOrange"
        >
          {url ? <LocalEditor code={code} setCode={setCode} /> : null}
        </Box>
      </VStack>

      <VStack width="100%" alignItems="flex-start"></VStack>
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
        "https://editor.mtfm.io/#?hm=disabled&options=JTdCJTIyYXV0b3NlbmQlMjIlM0F0cnVlJTJDJTIybW9kZSUyMiUzQSUyMnB5dGhvbiUyMiUyQyUyMnNhdmVsb2FkaW5oYXNoJTIyJTNBdHJ1ZSUyQyUyMnRoZW1lJTIyJTNBJTIydnMtZGFyayUyMiU3RA=="
      }
      inputs={inputs.current}
      onOutputs={onCodeOutputsUpdate}
    />
  );
};
