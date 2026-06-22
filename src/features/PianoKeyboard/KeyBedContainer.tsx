import styled from "@emotion/styled";
import { Box } from "@mui/material";

const KeyBedContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "octaves",
})<{ octaves: number }>(({ octaves }) => ({
  borderRadius: "10px",
  display: "grid",
  gridGap: "10px",
  gridTemplateColumns: `repeat(${octaves}, 300px)`,
  height: "100%",
  minHeight: 100,
  maxHeight: 250,
  justifyContent: "center",
  overflowX: "auto",
}));

export default KeyBedContainer;
