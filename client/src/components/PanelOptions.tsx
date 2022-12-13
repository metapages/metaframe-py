import { SimpleGrid } from "@chakra-ui/react";

import { FormOptions } from "/@/components/FormOptions";

export const PanelOptions: React.FC = () => {
  return (
    <SimpleGrid columns={2} spacing={10} width="100%">
      <FormOptions />
    </SimpleGrid>
  );
};
