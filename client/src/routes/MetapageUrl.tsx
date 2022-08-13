import {
  Box,
  Center,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Link,
  Spacer,
  useClipboard,
  useToast,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export const MetapageUrl: React.FC<{ url: string }> = ({ url }) => {
  const toast = useToast();
  const { onCopy } = useClipboard(url);

  return (
    <VStack width="100%" alignItems="flex-start">
      <Heading size="sm">
        Metaframe URL (copy this to your metapage definition)
      </Heading>

      <VStack
        spacing={4}
        justifyContent="flex-start"
        alignItems="flex-start"
        rounded="md"
        border={2}
        width="100%"
      >
        <FormControl>
          <HStack minH={"36px"}
          width="100%"
          >
            <Box
              padding="4px"
              borderWidth="1px"
              borderRadius="lg"
              width="90%"
              // overflow="hidden"
              onClick={() => {
                onCopy();
                toast({
                  title: "Copied URL to clipboard",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              <Center >
                <Text noOfLines={[1,2,3]}>{url ? url : ""}</Text>

                <Spacer />
                <IconButton aria-label="copy url" icon={<CopyIcon />} />
              </Center>
            </Box>

            <Spacer />

            <Link _hover={undefined} href={url} isExternal>
              <IconButton
                aria-label="go to source url"
                icon={<ExternalLinkIcon />}
              />
            </Link>
          </HStack>
        </FormControl>
      </VStack>
    </VStack>
  );
};
