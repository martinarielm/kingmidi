import styled from "@emotion/styled";
import { Box } from "@mui/material";
import type { PointerEvent, ReactNode } from "react";

type KeyButtonStyleProps = {
  activeNote?: boolean;
  blackKey?: boolean;
};

const KeyButtonBase = styled(Box, {
  shouldForwardProp: (prop) => prop !== "activeNote" && prop !== "blackKey",
})<KeyButtonStyleProps>(({ activeNote, blackKey }) => {
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
    cursor: "pointer" as const,
    minWidth: "2em",
    paddingBottom: "10px",
    userSelect: "none" as const,
    touchAction: "none" as const,
  };

  const blackKeyProps = {
    height: "50%",
    left: "70%",
    position: "relative" as const,
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

type KeyButtonProps = {
  activeNote?: boolean;
  blackKey?: boolean;
  children: ReactNode;
  midiNumber: number;
  onNoteOn: (midiNumber: number) => void;
  onNoteOff: (midiNumber: number) => void;
};

function PianoKeyButton({
  activeNote,
  blackKey,
  children,
  midiNumber,
  onNoteOn,
  onNoteOff,
}: KeyButtonProps) {
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Keep receiving the matching release/cancel even if the pointer leaves the key.
    event.currentTarget.setPointerCapture(event.pointerId);
    onNoteOn(midiNumber);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    onNoteOff(midiNumber);
  };

  const handlePointerCancel = () => {
    onNoteOff(midiNumber);
  };

  return (
    <KeyButtonBase
      activeNote={activeNote}
      aria-label={typeof children === "string" ? children : undefined}
      blackKey={blackKey}
      onLostPointerCapture={handlePointerCancel}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {children}
    </KeyButtonBase>
  );
}

export default PianoKeyButton;
