import { useCallback } from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Tooltip,
} from '@chakra-ui/react';

export const ButtonTabsToggle: React.FC<{menuhidden:boolean, setMenuHidden:(v:boolean) => void, mode:string|undefined}> = ({mode, menuhidden, setMenuHidden}) => {
  
  const toggleMenu = useCallback(() => {
    setMenuHidden(!menuhidden);
  }, [menuhidden, setMenuHidden]);

  const button = (
    <IconButton
      aria-label="options"
      variant="ghost"
      color="gray.400"
      onClick={toggleMenu}
      opacity={( mode === "invisible" || mode === "disabled") && menuhidden ? 0 : 1}
      disabled={mode === "disabled" && menuhidden}
      icon={<HamburgerIcon />}
    />
  );
  if (menuhidden || mode === "invisible" || mode === "disabled") {
    return button;
  }
  return <Tooltip label="Toggle view mode">{button}</Tooltip>;
};
