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
import { useEffect, useReducer, useState } from "react";
import { WebMidi } from "webmidi";
import ButtonAppBar from "./components/ButtonAppBar";
import OctaveKeys from "./components/OctaveKeys";
import noteReducer, { initialState } from "./notesReducer";
import OctaveSlider from "./components/OctaveSlider";
import "./App.css";
import KeyBedContainer from "./components/KeyBedContainer";
import useSynth from "./hooks/useSynth";
import useSocketConnection from "./hooks/useSocketConnection";
import { useParams } from "react-router";
import RoomChat from "./features/RoomChat";
import useRoomPresence from "./features/useRoomPresence";

type WebMidi = typeof WebMidi;

function App() {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const { roomId } = useParams();
  const { isSocketConnected } = useSocketConnection();
  const { roomUsers } = useRoomPresence({ roomId, isSocketConnected });
  const [midi, setMidi] = useState<WebMidi>();
  const {
    initializeAudio,
    triggerAttack,
    triggerRelease,
    triggerAttackRelease,
  } = useSynth();
  const [octaveRange, setOctaveRange] = useState<number[]>([2, 4]);
  const [minOctave, maxOctave] = octaveRange;
  const activeOctaves = Array.from(
    { length: Math.max(0, maxOctave - minOctave + 1) },
    (_, i) => minOctave + i,
  );
  const midiDevices = midi?.inputs;

  const handleEnableAudio = async () => {
    await initializeAudio();
    triggerAttackRelease("C3", "8n");
  };

  const handleOctaveRangeChange = (
    _e: Event,
    newValue: number[],
    activeThumb: number,
  ) => {
    const minOctaveDistance = 1;
    if (activeThumb === 0) {
      setOctaveRange([
        Math.min(newValue[0], octaveRange[1] - minOctaveDistance),
        octaveRange[1],
      ]);
    } else {
      setOctaveRange([
        octaveRange[0],
        Math.max(newValue[1], octaveRange[0] + minOctaveDistance),
      ]);
    }
  };

  const handleNoteOn = (midiNumber: number) => {
    dispatch({ type: "note_on", note: midiNumber });
  };

  const handleNoteOff = (midiNumber: number) => {
    dispatch({ type: "note_off", note: midiNumber });
  };

  useEffect(() => {
    const handleMidiEnabled = () => {
      setMidi(WebMidi);
    };
    WebMidi.enable({ callback: handleMidiEnabled });

    return () => {
      WebMidi.disable();
      setMidi(undefined);
    };
  }, []);

  useEffect(() => {
    midiDevices?.forEach((device) => {
      device.addListener("noteon", (e) => {
        triggerAttack(midiToFrequency(e.note.number), 0, e.note.attack);
        handleNoteOn(e.note.number);
      });

      device.addListener("noteoff", (e) => {
        triggerRelease();
        handleNoteOff(e.note.number);
      });
    });

    return () => {
      midiDevices?.forEach((device) => {
        device.removeListener("noteon");
        device.removeListener("noteoff");
      });
    };
  }, [midiDevices, triggerAttack, triggerRelease]);

  return (
    <>
      <ButtonAppBar />

      <Container maxWidth="xl" sx={{ pb: 2 }}>
        <Grid container sx={{ pt: 5, justifyContent: "center" }} spacing={4}>
          <Grid size={12}>
            <KeyBedContainer octaves={activeOctaves.length} sx={{ pb: 2 }}>
              {[...activeOctaves].map((octave) => (
                <OctaveKeys state={state} octave={octave} key={octave} />
              ))}
            </KeyBedContainer>

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

function midiToFrequency(midiNote: number) {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

export default App;
