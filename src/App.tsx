import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ButtonAppBar from "./components/ButtonAppBar";
import OctaveSlider from "./components/OctaveSlider";
import "./App.css";
import useActiveNotes from "./hooks/useActiveNotes";
import useMidiInput from "./hooks/useMidiInput";
import useOctaveRange from "./hooks/useOctaveRange";
import useSynth from "./hooks/useSynth";
import useSocketConnection from "./hooks/useSocketConnection";
import { useParams } from "react-router";
import RoomChat from "./features/RoomChat";
import useRoomPresence from "./features/useRoomPresence";
import PianoKeyboard from "./features/PianoKeyboard/PianoKeyboard";

function App() {
  const { roomId } = useParams();
  const { isSocketConnected } = useSocketConnection();
  const { roomUsers } = useRoomPresence({ roomId, isSocketConnected });
  const { activeNotes, handleNoteOff, handleNoteOn } = useActiveNotes();
  const {
    initializeAudio,
    triggerAttack,
    triggerRelease,
    triggerAttackRelease,
  } = useSynth();
  const { activeOctaves, handleOctaveRangeChange, octaveRange } =
    useOctaveRange();
  const { midiDevices } = useMidiInput({
    onNoteOn: handleNoteOn,
    onNoteOff: handleNoteOff,
    triggerAttack,
    triggerRelease,
  });

  const handleEnableAudio = async () => {
    await initializeAudio();
    triggerAttackRelease("C3", "8n");
  };

  return (
    <>
      <ButtonAppBar />

      <Container maxWidth="xl" sx={{ pb: 2 }}>
        <Grid container sx={{ pt: 5, justifyContent: "center" }} spacing={4}>
          <Grid size={12}>
            <PianoKeyboard
              activeNotes={activeNotes}
              activeOctaves={activeOctaves}
            />

            <Paper
              elevation={2}
              sx={{ width: 300, mt: 5, mx: "auto", px: 3, py: 1 }}
            >
              <OctaveSlider
                value={octaveRange}
                onChange={handleOctaveRangeChange}
              />
            </Paper>

            <Button
              onClick={handleEnableAudio}
              variant="contained"
              sx={{ mx: "auto", display: "block", mt: 1 }}
            >
              Enable Audio
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1} sx={{ alignItems: "center" }}>
              {roomId && (
                <Box sx={{ width: "100%" }}>
                  <RoomChat roomId={roomId} disabled={!isSocketConnected} />
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
