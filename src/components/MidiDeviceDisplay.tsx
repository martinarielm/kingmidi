import { Box, Typography } from "@mui/material";
import type { LastMidiInputDevice } from "../hooks/useMidiInput";
import { colors } from "../theme";

interface MidiDeviceDisplayProps {
  device: LastMidiInputDevice | null;
  isAudioEnabled: boolean;
}

export default function MidiDeviceDisplay({
  device,
  isAudioEnabled,
}: MidiDeviceDisplayProps) {
  return (
    <Box sx={{ width: 200 }}>
      <Typography
        variant="overline"
        sx={{
          color: "#fff",
          display: "block",
          fontFamily: "Quicksand",
          fontWeight: 500,
          mt: 0,
        }}
      >
        MIDI Device
      </Typography>

      <Typography
        noWrap
        sx={{
          opacity: isAudioEnabled ? 1 : 0.3,
          color: "#ffffffd7",
          display: "block",
          fontFamily: "Silkscreen",
          fontSize: 12,
          mb: 1,
          position: "relative",
          left: "-6px",
          pl: "6px",
          textShadow: isAudioEnabled
            ? `0 0 3px #ffffff47,  0 0 5px ${colors.primary}, 0 0 2px ${colors.primary}`
            : "none",
        }}
      >
        {device?.name ?? "Waiting..."}
      </Typography>
    </Box>
  );
}
