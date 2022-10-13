import { EditIcon, InfoIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Spacer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stack,
} from "@chakra-ui/react";
import { PanelCode } from "/@/components/PanelCode";
import { PanelHelp } from "/@/components/PanelHelp";
import { PanelModules } from "/@/components/PanelModules";
import { ButtonGotoExternalLink } from "/@/components/ButtonGotoExternalLink";
import { ButtonCopyExternalLink } from "/@/components/ButtoCopyExternalLink";
import "/@/app.css";

export const App: React.FC = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>
          <EditIcon /> &nbsp; Code
        </Tab>
        <Tab>
          <PlusSquareIcon /> &nbsp; Modules
        </Tab>
        <Tab>
          <InfoIcon /> &nbsp; Help
        </Tab>

        <Spacer />
        <Stack p={1} spacing={4} direction="row" align="center">
          <ButtonCopyExternalLink /> <ButtonGotoExternalLink />
        </Stack>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PanelCode />
        </TabPanel>
        <TabPanel>
          <PanelModules />
        </TabPanel>
        <TabPanel>
          <PanelHelp />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
