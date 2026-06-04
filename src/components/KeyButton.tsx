import styled from "@emotion/styled";
import { Box } from "@mui/material";

const KeyButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "activeNote" && prop !== "blackKey",
})<{ activeNote?: boolean; blackKey?: boolean }>(({ activeNote, blackKey }) => {
  const colors = {
    border: blackKey ? "#373737" : "#eaeaea",
    note: blackKey ? "#FFF" : "#023047",
    pressed: "#ffd166",
    rest: blackKey ? "#474747" : "#FFF",
    shadow: blackKey ? "#373737" : "#eaeaea",
  };

  const styleProps = {
    transition: "0.2s",
    alignItems: "flex-end",
    backgroundColor: colors.rest,
    backgroundImage: activeNote
      ? "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"
      : "none",
    border: "2px solid " + (activeNote ? "#fbc2eb" : colors.border),
    borderRadius: "10px !important",
    boxShadow: "0 6px 0 0 " + (activeNote ? "#a18cd1" : colors.shadow),
    color: colors.note,
    display: "flex",
    fontWeight: "bold",
    height: "100%",
    justifyContent: "center",
    minWidth: "2em",
    paddingBottom: "10px",
  };

  const blackKeyProps = {
    height: "50%",
    left: "70%",
    position: "relative",
    top: "-100%",
    width: "60%",
    borderColor: activeNote ? "#bb91af" : colors.border,
    boxShadow: "0 6px 0 0 " + (activeNote ? "#716393" : colors.shadow),
    backgroundImage: activeNote
      ? "linear-gradient(to top, #716393 0%, #bb91af 100%)"
      : "none",
  };

  return blackKey ? { ...styleProps, ...blackKeyProps } : styleProps;
});

export default KeyButton;
