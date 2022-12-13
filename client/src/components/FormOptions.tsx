import { Heading, VStack } from "@chakra-ui/react";

import { SwitchDisplayConsole } from "/@/components/SwitchDisplayConsole";

export const FormOptions: React.FC = () => {
  return (
    <VStack width="100%" alignItems="flex-start">
      <Heading size="sm">Options </Heading>
      <VStack
        justifyContent="flex-start"
        borderWidth="1px"
        borderRadius="lg"
        p={2}
        width="100%"
        align="stretch"
      >
        <SwitchDisplayConsole />
      </VStack>
    </VStack>
  );
};
