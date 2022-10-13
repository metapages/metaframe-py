import { Box } from "@chakra-ui/react";

export const PanelHelp: React.FC = () => {
  return (
    <Box className="iframe-container">
      <iframe
        className="iframe"
        src={`https://markdown.mtfm.io/#?url=${window.location.origin}${window.location.pathname}/README.md`}
      />
    </Box>
  );
};
