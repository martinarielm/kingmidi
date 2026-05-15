import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Skeleton,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { WebMidi } from "webmidi";
import ButtonAppBar from "./components/ButtonAppBar";
import OctaveKeys from "./components/OctaveKeys";
import noteReducer, { initialState } from "./notesReducer";
import OctaveSlider from "./components/OctaveSlider";
import "./App.css";

type WebMidi = typeof WebMidi;

function App() {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const [midi, setMidi] = useState<WebMidi>();
  const [octaveRange, setOctaveRange] = useState<number[]>([2, 4]);
  const [minOctave, maxOctave] = octaveRange;
  const activeOctaves = Array.from(
    { length: Math.max(0, maxOctave - minOctave + 1) },
    (_, i) => minOctave + i,
  );
  const midiDevices = midi?.inputs;

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
        handleNoteOn(e.note.number);
      });

      device.addListener("noteoff", (e) => {
        handleNoteOff(e.note.number);
      });
    });

    return () => {
      midiDevices?.forEach((device) => {
        device.removeListener("noteon");
        device.removeListener("noteoff");
      });
    };
  }, [midiDevices]);

  return (
    <>
      <ButtonAppBar />

      <Container sx={{ pt: 5 }}>
        <Grid container spacing={1}>
          {[...activeOctaves].map((octave) => (
            <Grid size={4} key={octave}>
              <OctaveKeys state={state} octave={octave} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ width: 300, mt: 5 }}>
          <OctaveSlider
            value={octaveRange}
            onChange={handleOctaveRangeChange}
          />
        </Box>

        <Box sx={{ mt: 5 }}>
          {midiDevices ? (
            <Paper elevation={2}>
              <List dense sx={{ display: "flex", gap: 1 }}>
                {midiDevices.map(({ id, name, manufacturer }) => (
                  <ListItem key={id}>
                    <ListItemText primary={name} secondary={manufacturer} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ) : (
            <Skeleton variant="rounded" width="100%" height={75} />
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;
