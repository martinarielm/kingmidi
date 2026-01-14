import { Box, Container } from "@mui/material";
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
  const usbDevices = midi?.inputs;

  const handleNoteOn = (note: string) => {
    dispatch({ type: "note_on", note });
  };

  const handleNoteOff = (note: string) => {
    dispatch({ type: "note_off", note });
  };

  const enableWebMidi = async () => {
    WebMidi.enable()
      .then(() => {
        setMidi(WebMidi);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    enableWebMidi();
  }, []);

  useEffect(() => {
    usbDevices?.forEach((device) => {
      device.addListener("noteon", (e) => {
        handleNoteOn(
          `${e.note.name}${e.note.accidental ? e.note.accidental : ""}`
        );
      });

      device.addListener("noteoff", (e) => {
        handleNoteOff(
          `${e.note.name}${e.note.accidental ? e.note.accidental : ""}`
        );
      });
    });
  }, [usbDevices]);

  return (
    <>
      <ButtonAppBar />

      <Container sx={{ pt: 5 }}>
        <Box display="flex" justifyContent="center">
          <OctaveKeys state={state} />
        </Box>
      </Container>
    </>
  );
}

export default App;
