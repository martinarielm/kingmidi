import { Grid } from "@mui/material";
import KeyButton from "./KeyButton";
import type { State } from "../notesReducer";
import { midiNumberToOctave } from "../utils/midi";

function buildActivePitchClassesForOctave(state: State, octave: number) {
  const activePitchClasses = new Set<number>();

  state.forEach((midiNumber) => {
    if (midiNumberToOctave(midiNumber) !== octave) return;
    activePitchClasses.add(midiNumber % 12);
  });

  return activePitchClasses;
}

export default function OctaveKeys({
  state,
  octave,
}: {
  state: State;
  octave: number;
}) {
  const activePitchClasses = buildActivePitchClassesForOctave(state, octave);

  return (
    <Grid container spacing={0}>
      <Grid size="grow">
        <KeyButton activeNote={activePitchClasses.has(0)}>C</KeyButton>
        <KeyButton activeNote={activePitchClasses.has(1)} blackKey>
          C#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={activePitchClasses.has(2)}>D</KeyButton>
        <KeyButton activeNote={activePitchClasses.has(3)} blackKey>
          D#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={activePitchClasses.has(4)}>E</KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={activePitchClasses.has(5)}>F</KeyButton>
        <KeyButton activeNote={activePitchClasses.has(6)} blackKey>
          F#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={activePitchClasses.has(7)}>G</KeyButton>
        <KeyButton activeNote={activePitchClasses.has(8)} blackKey>
          G#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={activePitchClasses.has(9)}>A</KeyButton>
        <KeyButton activeNote={activePitchClasses.has(10)} blackKey>
          A#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={activePitchClasses.has(11)}>B</KeyButton>
      </Grid>
    </Grid>
  );
}
