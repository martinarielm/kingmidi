import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { WebMidi } from "webmidi";
import ButtonAppBar from "./components/ButtonAppBar";
import OctaveKeys from "./components/OctaveKeys";
import "./App.css";
import noteReducer, { initialState } from "./notesReducer";

type WebMidi = typeof WebMidi;

function App() {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const [midi, setMidi] = useState<WebMidi>();
  const midiDevices = midi?.inputs;

  const handleNoteOn = (note: string) => {
    dispatch({ type: "note_on", note });
  };

  const handleNoteOff = (note: string) => {
    dispatch({ type: "note_off", note });
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
        handleNoteOn(
          `${e.note.name}${e.note.accidental ? e.note.accidental : ""}`,
        );
      });

      device.addListener("noteoff", (e) => {
        handleNoteOff(
          `${e.note.name}${e.note.accidental ? e.note.accidental : ""}`,
        );
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
          <Grid size={4}>
            <OctaveKeys state={state} />
          </Grid>
          <Grid size={4}>
            <OctaveKeys state={state} />
          </Grid>
          <Grid size={4}>
            <OctaveKeys state={state} />
          </Grid>
        </Grid>

        {midiDevices && (
          <Paper sx={{ mt: 5 }} elevation={2}>
            <List dense sx={{ display: "flex", gap: 1 }}>
              {midiDevices.map(({ id, name, manufacturer }) => (
                <ListItem key={id}>
                  <ListItemText primary={name} secondary={manufacturer} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Container>
    </>
  );
}

export default App;
