import { useCallback } from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Code,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { useHashParam } from '@metapages/hash-query';

export type Modes = "visible" | "invisible" | "disabled";
export const DefaultMode :Modes = "invisible";

export const RadioButtonMode: React.FC = () => {
  const [mode, setMode] = useHashParam("hm", undefined);

  const handleRadio = useCallback(
    (nextValue: string) => {
      setMode(nextValue === DefaultMode ? undefined : nextValue);
    },
    [mode, setMode]
  );

  return (
    <VStack align="flex-start" w="100%" >
    <FormLabel fontWeight="bold">When the top menu is toggled off (and this is in an iframe), the menu button (<HamburgerIcon color="gray.400" />)  will </FormLabel>
    <RadioGroup id="mode" onChange={handleRadio} value={mode || DefaultMode} w="100%">
      <Stack pl="30px" pr="30px" spacing={5} direction="column" borderWidth='1px' borderRadius='lg'>
        <Radio value="invisible" defaultChecked>be invisible but clickable  (default)</Radio>
        <Radio value="visible" >
          remain visible
        </Radio>
        <Radio value="disabled" >removed (you cannot click back without removing <Code>hm=disabled</Code> in the URL </Radio>
      </Stack>
    </RadioGroup>
    </VStack>
  );
};
