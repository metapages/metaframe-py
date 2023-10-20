import {
  Box,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

import { FormModulesAndCss } from './FormModulesAndCss';

export const PanelModules: React.FC = () => {
  return (
    <HStack w="100%" h="100%" spacing="0px">
      <VStack w="100%" h="100%" alignItems="flex-start" bg="white">
        <SimpleGrid columns={1}  width="100%" p={10}>
          <FormModulesAndCss  />

          {/* <FormDefinition /> */}
        </SimpleGrid>
      </VStack>
      <Box w="100%"></Box>
    </HStack>
  );
};
