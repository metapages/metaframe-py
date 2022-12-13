import { FormLabel, InputGroup, Switch } from "@chakra-ui/react";
import { useHashParamJson } from "@metapages/hash-query";
import { useCallback } from "react";

import { Config, ConfigDefault, ConfigOptions } from "/@/shared/config";

export const SwitchDisplayConsole: React.FC = () => {
  const [config, setConfig] = useHashParamJson<Config>("c", ConfigDefault);

  const onChange = useCallback(() => {
    const newValue = !(config?.opt?.c ?? undefined);
    const options :ConfigOptions = { ...config.opt, c: newValue };
    if (!options.c) {
      delete options.c;
    }
    setConfig({ ...config, opt: options });
  }, [config, setConfig]);

  return (
    <InputGroup size="md">
      <FormLabel htmlFor="console" mb="0">
        Show console in panel
      </FormLabel>
      <Switch id="console" isChecked={config?.opt?.c} onChange={onChange} />
    </InputGroup>
  );
};
