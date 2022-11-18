import { IconButton, Link } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";

export const ButtonGithub: React.FC = () => {
  return (
    <Link
      _hover={undefined}
      href="https://github.com/metapages/metaframe-js"
      isExternal
    >
      <IconButton aria-label="github" icon={<AiFillGithub />} />
    </Link>
  );
};
