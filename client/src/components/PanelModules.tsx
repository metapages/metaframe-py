import { SimpleGrid } from "@chakra-ui/react";
import { useHashParamJson } from "@metapages/hash-query";
import { Config, ConfigDefault } from "/@/shared/config";
import { FormDefinition } from "./FormDefinition";
import { FormModulesAndCss } from "./FormModulesAndCss";

export const PanelModules: React.FC = () => {
  const [config, setConfig] = useHashParamJson<Config>("c", ConfigDefault);
  return (
    <SimpleGrid columns={2} spacing={10} width="100%">
      <FormModulesAndCss config={config} setConfig={setConfig} />

      <FormDefinition config={config} setConfig={setConfig} />
    </SimpleGrid>
  );
};
