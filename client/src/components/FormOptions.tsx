import { SwitchDisplayConsole } from '/@/components/SwitchDisplayConsole';

import { VStack } from '@chakra-ui/react';

export const FormOptions: React.FC = () => {
  return (
    <VStack width="100%" alignItems="flex-start">
      <VStack
        justifyContent="flex-start"
        borderWidth="1px"
        borderRadius="lg"
        p={2}
        width="100%"
        align="stretch"
      >
        <SwitchDisplayConsole />
        {/* <SwitchDoNotWaitForMetapageConnection /> */}
      </VStack>
    </VStack>
  );
};
