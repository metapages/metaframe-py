import { IconButton, useClipboard, useToast } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useMetaframeUrl } from "../hooks/useMetaframeUrl";

export const ButtonCopyExternalLink: React.FC = () => {
  const { url } = useMetaframeUrl();
  const toast = useToast();
  const { onCopy } = useClipboard(url);

  return (
    <IconButton
      aria-label="copy url"
      onClick={() => {
        onCopy();
        toast({
          title: "Copied URL to clipboard",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }}
      icon={<CopyIcon />}
    />
  );
};
