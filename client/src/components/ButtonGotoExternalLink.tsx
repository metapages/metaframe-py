import { IconButton, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useMetaframeUrl } from "../hooks/useMetaframeUrl";

export const ButtonGotoExternalLink: React.FC = () => {
  const { url } = useMetaframeUrl();

  return (
    <Link _hover={undefined} href={url} isExternal>
      <IconButton aria-label="go to source url" icon={<ExternalLinkIcon />} />
    </Link>
  );
};
