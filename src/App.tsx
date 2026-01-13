import { Box, Container, Grid, styled } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { WebMidi } from "webmidi";
import ButtonAppBar from "./components/ButtonAppBar";
import "./App.css";

const KeyButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "activeNote",
})<{ activeNote?: boolean }>(({ activeNote }) => ({
  alignItems: "flex-end",
  backgroundColor: activeNote ? "#ffd166" : "#FFF",
  border: "2px solid #eaeaea",
  borderRadius: "10px !important",
  boxShadow: "0 6px 0 0 #9d7002",
  color: "#023047",
  display: "flex",
  fontWeight: "bold",
  height: "100%",
  justifyContent: "center",
  textAlign: "center",
  paddingBottom: "10px",
}));

type WebMidi = typeof WebMidi;

const initialState: { [key: string]: boolean } = {
  C: false,
  D: false,
  E: false,
  F: false,
  G: false,
  A: false,
  B: false,
};

function reducer(
  state: { [key: string]: boolean } = initialState,
  action: { type: string; note: string }
) {
  switch (action.type) {
    case "note_on": {
      console.log("👨‍🎤 -> note_on:", action.note);
      return { ...state, [action.note]: true };
    }

    case "note_off": {
      console.log("👨‍🎤 -> note_off:", action.note);
      return { ...state, [action.note]: false };
    }
  }

  throw Error("Unknown action: " + action.type);
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
        console.log(`Note on  :${e.note.name}${e.note.octave}`);
        handleNoteOn(e.note.name);
      });

      device.addListener("noteoff", (e) => {
        console.log(`Note off : ${e.note.name}${e.note.octave}`);
        handleNoteOff(e.note.name);
      });
    });
  }, [usbDevices]);

  return (
    <>
      <ButtonAppBar />

      <Container sx={{ pt: 5 }}>
        <Box display="flex" justifyContent="center">
          <Grid container width={500} height={100}>
            <Grid size="grow">
              <KeyButton activeNote={state.C}>C</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton activeNote={state.D}>D</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton activeNote={state.E}>E</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton activeNote={state.F}>F</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton activeNote={state.G}>G</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton activeNote={state.A}>A</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton activeNote={state.B}>B</KeyButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default App;
