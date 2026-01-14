import { Grid } from "@mui/material";
import KeyButton from "./KeyButton";
import type { State } from "../notesReducer";

export default function OctaveKeys({ state }: { state: State }) {
  return (
    <Grid container width={500} height={100}>
      <Grid size="grow">
        <KeyButton activeNote={state.C}>C</KeyButton>
        <KeyButton activeNote={state["C#"]} blackKey>
          C#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={state.D}>D</KeyButton>
        <KeyButton activeNote={state["D#"]} blackKey>
          D#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={state.E}>E</KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={state.F}>F</KeyButton>
        <KeyButton activeNote={state["F#"]} blackKey>
          F#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={state.G}>G</KeyButton>
        <KeyButton activeNote={state["G#"]} blackKey>
          G#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={state.A}>A</KeyButton>
        <KeyButton activeNote={state["A#"]} blackKey>
          A#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton activeNote={state.B}>B</KeyButton>
      </Grid>
    </Grid>
  );
}
