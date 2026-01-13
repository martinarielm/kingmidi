import { Box, Container, Grid, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { WebMidi } from "webmidi";
import ButtonAppBar from "./components/ButtonAppBar";
import "./App.css";

const KeyButton = styled(
  Box,
  { shouldForwardProp: (prop) => prop !== "note" && prop !== "activeNote" }
)<{ note?: string; activeNote?: string }>(({ note, activeNote }) => ({
  alignItems: "flex-end",
  backgroundColor: activeNote && note === activeNote ? "#ffd166" : "#FFF",
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

function App() {
  const [midi, setMidi] = useState<WebMidi>();
  const usbDevice = midi?.inputs[3];
  console.log("👨‍🎤 -> App -> midi?.inputs:", midi?.inputs);
  const [noteOn, setNoteOn] = useState<string>();
  console.log("👨‍🎤 -> App -> noteOn:", noteOn);
  const [notesOn, setNotesOn] = useState<string[]>([]);

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
    usbDevice?.channels[1].addListener("noteon", (e) => {
      console.log("👨‍🎤 -> e.note.name:", e.note.name);
      setNotesOn((prevNotes) => [...prevNotes, e.note.name]);
      setNoteOn(e.note.name);
    });

    return () => {
      usbDevice?.channels[1].removeListener("noteon", (e) => {
        setNotesOn((prev = []) => [...prev, e.note.name]);
        setNoteOn(e.note.name);
      });
    };
  }, [usbDevice?.channels]);

  return (
    <>
      <ButtonAppBar />

      <Container sx={{ pt: 5 }}>
        <Box display="flex" justifyContent="center">
          <Grid container width={500} height={100}>
            <Grid size="grow">
              <KeyButton note="C" activeNote={noteOn}>C</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton note="D" activeNote={noteOn}>D</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton note="E" activeNote={noteOn}>E</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton note="F" activeNote={noteOn}>F</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton note="G" activeNote={noteOn}>G</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton note="A" activeNote={noteOn}>A</KeyButton>
            </Grid>
            <Grid size="grow">
              <KeyButton note="B" activeNote={noteOn}>B</KeyButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default App;
