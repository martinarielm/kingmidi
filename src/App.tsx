import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
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

      <Grid container sx={{ mt: 9, mb: 2, px: 2 }} spacing={4}>
        <Grid size={12}>
          <Paper
            elevation={5}
            sx={{
              backgroundColor: "#34373b",
              borderRadius: 2,
              py: 2,
              px: { xs: 2, sm: 4 },
            }}
          >
            <Grid
              container
              columnSpacing={4}
              sx={{
                mb: 3,
              }}
            >
              <Grid
                size={{ xs: 4, lg: 2, xl: 2 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "#ffffff",
                    opacity: 0.9,
                    fontFamily: "Quicksand",
                    fontWeight: 500,
                    mr: 1,
                  }}
                >
                  Power
                </Typography>
                <EnableAudioButton
                  isAudioEnabled={isAudioEnabled}
                  onToggle={() => setAudioEnabled(!isAudioEnabled)}
                />
              </Grid>

              <Grid size={{ xs: "grow", lg: "grow", xl: "grow" }}>
                <Box
                  sx={{
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
                </Box>
              </Grid>

              <Grid
                size={{ xs: 12, lg: "grow", xl: "grow" }}
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: { lg: "end" },
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "#fff",
                    fontFamily: "Quicksand",
                    fontWeight: 500,
                    mr: 2,
                  }}
                >
                  Octave Range
                </Typography>

                <Box
                  sx={{
                    width: 200,
                    pr: 0.5,
                  }}
                >
                  <OctaveSlider
                    value={octaveRange}
                    onChange={handleOctaveRangeChange}
                  />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ height: 200 }}>
              <PianoKeyboard
                activeNotes={activeNotes}
                activeOctaves={activeOctaves}
                onNoteOff={releasePointerNote}
                onNoteOn={playPointerNote}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            {roomId && (
              <Box sx={{ width: "100%" }}>
                <Suspense fallback={null}>
                  <RoomChat roomId={roomId} disabled={!isSocketConnected} />
                </Suspense>
              </Box>
            )}

            <Stack direction="row" spacing={2}>
              <Chip
                color={isSocketConnected ? "success" : "error"}
                label={
                  isSocketConnected ? "Socket connected" : "Socket disconnected"
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
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
