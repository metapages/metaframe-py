import {
  Box,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

export const PanelOptions: React.FC = () => {
  return (
    <HStack w="100%" h="100%" spacing="0px">
      <VStack w="100%" h="100%" spacing="0px" alignItems="flex-start" bg="white">
        <SimpleGrid columns={1} spacing={10} width="100%" p={10}>
          Coming soon, disabled because not yet converted to new integration
          {/* <FormOptions /> */}
        </SimpleGrid>
      </VStack>
      <Box w="100%"></Box>
    </HStack>
  );
};
