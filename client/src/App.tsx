import '/@/app.css';
import './debug.css';

import { ButtonCopyExternalLink } from '/@/components/ButtoCopyExternalLink';
import { ButtonGotoExternalLink } from '/@/components/ButtonGotoExternalLink';
import { PanelCode } from '/@/components/PanelCode';
import { PanelHelp } from '/@/components/PanelHelp';
import { PanelModules } from '/@/components/PanelModules';
import { PanelOptions } from '/@/components/PanelOptions';
import { FiSettings } from 'react-icons/fi';

import {
  EditIcon,
  InfoIcon,
  PlusSquareIcon,
} from '@chakra-ui/icons';
import {
  HStack,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

const HeaderHeight = "60px";
export const App: React.FC = () => {
  return (
    <HStack spacing="0px" h="100vh" w="100%" className="borderDashedPurple">
      <Tabs w="100%" h="100%" isLazy={true}>
        <TabList bg="white" h={HeaderHeight}>
          <Tab>
            <EditIcon /> &nbsp; Javascript
          </Tab>
          <Tab>
            <PlusSquareIcon /> &nbsp; Modules
          </Tab>
          <Tab>
            <FiSettings /> &nbsp; Options
          </Tab>
          <Tab>
            <InfoIcon /> &nbsp; Docs
          </Tab>

          <Spacer />
          <HStack p={1} spacing={4} align="center" pr={16}>
            <ButtonGotoExternalLink />{" "}<ButtonCopyExternalLink /> 
          </HStack>
        </TabList>

        <TabPanels h={`calc(100% - ${HeaderHeight})`}>
          <TabPanel p="0px" h="100%">
            <PanelCode />
          </TabPanel>
          <TabPanel p="0px" h="100%">
            <PanelModules />
          </TabPanel>
          <TabPanel p="0px" m="0px" h="100%">
            <PanelOptions />
          </TabPanel>
          <TabPanel p="0px" h="100%">
            <PanelHelp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </HStack>
  );
};
