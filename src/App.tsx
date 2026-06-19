import {
  Box,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { lazy, Suspense } from "react";
import ButtonAppBar from "./components/ButtonAppBar";
import OctaveSlider from "./components/OctaveSlider";
import "./App.css";
import PianoKeyboard from "./features/PianoKeyboard/PianoKeyboard";
import useRoomPresence from "./features/useRoomPresence";
import useMidiInput from "./hooks/useMidiInput";
import useOctaveRange from "./hooks/useOctaveRange";
import usePlayableNotes from "./hooks/usePlayableNotes";
import useSocketConnection from "./hooks/useSocketConnection";
import { useParams } from "react-router";

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

  const { midiDevices } = useMidiInput({
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
              sx={{ backgroundColor: "#34373b", borderRadius: 2, p: 2 }}
            >
              <Stack direction="row" spacing={8} sx={{ mb: 3 }}>
                <Box>
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

                  <Switch
                    checked={isAudioEnabled}
                    size="small"
                    onChange={(_event, checked) => setAudioEnabled(checked)}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "#fff",
                      fontFamily: "Quicksand",
                      fontWeight: 500,
                    }}
                  >
                    Octave Range
                  </Typography>
                  <Box
                    sx={{
                      width: 200,
                      // backgroundColor: "#383c40",
                      // boxShadow: "inset 0 0 8px #242424",
                    }}
                  >
                    <OctaveSlider
                      value={octaveRange}
                      onChange={handleOctaveRangeChange}
                    />
                  </Box>
                </Box>
              </Stack>

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

        {midiDevices ? (
          <Paper elevation={2} sx={{ mt: 3, mx: "auto", width: "fit-content" }}>
            <List dense sx={{ display: "flex", gap: 1 }}>
              {midiDevices.map(({ id, name, manufacturer }) => (
                <ListItem key={id}>
                  <ListItemText primary={name} secondary={manufacturer} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Paper
            elevation={2}
            sx={{ p: 3, mx: "auto", width: "fit-content", mt: 4 }}
          >
            <Typography variant="body1">
              No MIDI devices detected, please connect a MIDI device and refresh
              the page.
            </Typography>
          </Paper>
        )}
      </Container>
    </>
  );
}

export default App;
