import styled from "@emotion/styled";
import { Box } from "@mui/material";

const KeyButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "activeNote" && prop !== "blackKey",
})<{ activeNote?: boolean; blackKey?: boolean }>(({ activeNote, blackKey }) => {
  const colors = {
    border: blackKey ? "#373737" : "#eaeaea",
    note: blackKey ? "#FFF" : "#023047",
    pressed: blackKey ? "#ffd166" : "#ffd166",
    rest: blackKey ? "#474747" : "#FFF",
    shadow: blackKey ? "#373737" : "#eaeaea",
  };

  const styleProps = {
    alignItems: "flex-end",
    backgroundColor: activeNote ? colors.pressed : colors.rest,
    border: "2px solid " + colors.border,
    borderRadius: "10px !important",
    boxShadow: "0 6px 0 0 " + colors.shadow,
    color: colors.note,
    display: "flex",
    fontWeight: "bold",
    height: "100%",
    justifyContent: "center",
    paddingBottom: "10px",
  };

  const blackKeyProps = {
    height: "50%",
    left: "70%",
    position: "relative",
    top: "-100%",
    width: "60%",
  };

  return blackKey ? { ...styleProps, ...blackKeyProps } : styleProps;
});

export default KeyButton;
