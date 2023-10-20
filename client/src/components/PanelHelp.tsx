import {
  Box,
  HStack,
  VStack,
} from '@chakra-ui/react';

export const PanelHelp: React.FC = () => {

  return (
    <HStack w="100%" h="100%" spacing="0px">
      <VStack w="100%" h="100%" alignItems="flex-start" bg="white">
        <Box  w="100%" h="100%" p={10}>

        <Box className="iframe-container">
          <iframe
            className="iframe"
            src={`https://markdown.mtfm.io/#?hm=disabled&url=${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname.substring(0, window.location.pathname.length - 1) : window.location.pathname}/README.md`}
            />
        </Box>
            </Box>
      </VStack>
      <Box w="100%"></Box>
    </HStack>
  );
};
