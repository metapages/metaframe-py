import { useCallback } from 'react';

import { ConfigOptions } from '/@/shared/config';

import {
  FormLabel,
  InputGroup,
  Switch,
} from '@chakra-ui/react';
import { useHashParamJson } from '@metapages/hash-query';

export const SwitchDisplayConsole: React.FC = () => {
  const [config, setConfig] = useHashParamJson<ConfigOptions>("c");

  const onChange = useCallback(() => {
    const newValue = !(config?.c ?? undefined);
    const options :ConfigOptions = { ...config, c: newValue };
    if (!options.c) {
      delete options.c;
    }
    setConfig(Object.keys(options).length > 0 ? options : undefined);
  }, [config, setConfig]);

  return (
    <InputGroup size="md">
      <Switch id="console" isChecked={config?.c} onChange={onChange} mr={5}/>
      <FormLabel htmlFor="console" mb="0">
        Show console in panel
      </FormLabel>
    </InputGroup>
  );
};
