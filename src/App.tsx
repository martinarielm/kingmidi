import {
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { lazy, Suspense } from "react";
import ButtonAppBar from "./components/ButtonAppBar";
import EnableAudioButton from "./components/EnableAudioButton";
import OctaveSlider from "./components/OctaveSlider";
import "./App.css";
import PianoKeyboard from "./features/PianoKeyboard/PianoKeyboard";
import useRoomPresence from "./features/useRoomPresence";
import useMidiInput from "./hooks/useMidiInput";
import useOctaveRange from "./hooks/useOctaveRange";
import usePlayableNotes from "./hooks/usePlayableNotes";
import useSocketConnection from "./hooks/useSocketConnection";
import { useParams } from "react-router";
import MidiDeviceDisplay from "./components/MidiDeviceDisplay";

const RoomChat = lazy(() => import("./features/RoomChat"));

function App() {
  const { roomId } = useParams();
  const { isSocketConnected } = useSocketConnection();
  const { roomUsers } = useRoomPresence({ roomId, isSocketConnected });
  const {
    activeNotes,
    isAudioEnabled,
    playMidiNote,
    playPointerNote,
    releaseMidiNote,
    releasePointerNote,
    setAudioEnabled,
  } = usePlayableNotes();
  const { activeOctaves, handleOctaveRangeChange, octaveRange } =
    useOctaveRange();

  const { lastMidiInputDevice } = useMidiInput({
    onNoteOn: playMidiNote,
    onNoteOff: releaseMidiNote,
  });

  return (
    <>
      <ButtonAppBar />

      <Container maxWidth="xl" sx={{ pb: 2, pt: 4 }}>
        <Grid container sx={{ pt: 5, justifyContent: "center" }} spacing={4}>
          <Grid size={12}>
            <Paper
              elevation={5}
              sx={{ backgroundColor: "#34373b", borderRadius: 2, py: 2, px: 4 }}
            >
              <Grid
                container
                direction="row"
                spacing={8}
                sx={{
                  mb: 3,
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <EnableAudioButton
                    isAudioEnabled={isAudioEnabled}
                    onToggle={() => setAudioEnabled(!isAudioEnabled)}
                  />

                  <Typography
                    variant="overline"
                    sx={{
                      color: "#fff",
                      display: "block",
                      fontFamily: "Quicksand",
                      fontWeight: 500,
                    }}
                  >
                    Enable Audio
                  </Typography>
                </Grid>

                <Grid
                  sx={{
                    alignSelf: "start",
                    borderRadius: 2,
                    backgroundColor: "#0f0f0f",
                    px: 1.5,
                    py: 0.2,
                  }}
                >
                  <MidiDeviceDisplay
                    device={lastMidiInputDevice}
                    isAudioEnabled={isAudioEnabled}
                  />
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 200,
                    }}
                  >
                    <OctaveSlider
                      value={octaveRange}
                      onChange={handleOctaveRangeChange}
                    />
                  </Box>

                  <Typography
                    variant="overline"
                    sx={{
                      color: "#fff",
                      display: "block",
                      fontFamily: "Quicksand",
                      fontWeight: 500,
                    }}
                  >
                    Octave Range
                  </Typography>
                </Grid>
              </Grid>

              <PianoKeyboard
                activeNotes={activeNotes}
                activeOctaves={activeOctaves}
                onNoteOff={releasePointerNote}
                onNoteOn={playPointerNote}
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1} sx={{ alignItems: "center" }}>
              {roomId && (
                <Box sx={{ width: "100%" }}>
                  <Suspense fallback={null}>
                    <RoomChat roomId={roomId} disabled={!isSocketConnected} />
                  </Suspense>
                </Box>
              )}

              <Box>
                <Chip
                  color={isSocketConnected ? "success" : "error"}
                  label={
                    isSocketConnected
                      ? "Socket connected"
                      : "Socket disconnected"
                  }
                  size="small"
                />
                {roomId && (
                  <Chip
                    color={roomUsers >= 2 ? "success" : "warning"}
                    label={`Room ${roomId}: ${roomUsers}/2`}
                    size="small"
                  />
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
