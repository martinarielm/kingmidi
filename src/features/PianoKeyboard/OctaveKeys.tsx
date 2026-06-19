import { Grid } from "@mui/material";
import type { State } from "../../notesReducer";
import { midiNumberToOctave } from "../../utils/midi";
import KeyButton from "./KeyButton";

function getMidiNumber(octave: number, pitchClass: number) {
  // MIDI octave math is offset by one: C4 is note 60, not 48.
  return (octave + 1) * 12 + pitchClass;
}

// Convert active MIDI note numbers into pitch classes for this single octave.
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
  onNoteOff,
  onNoteOn,
}: {
  state: State;
  octave: number;
  onNoteOn: (midiNumber: number) => void;
  onNoteOff: (midiNumber: number) => void;
}) {
  const activePitchClasses = buildActivePitchClassesForOctave(state, octave);

  return (
    <Grid container spacing={0}>
      <Grid size="grow">
        <KeyButton
          activeNote={activePitchClasses.has(0)}
          midiNumber={getMidiNumber(octave, 0)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          C
        </KeyButton>
        <KeyButton
          activeNote={activePitchClasses.has(1)}
          blackKey
          midiNumber={getMidiNumber(octave, 1)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          C#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton
          activeNote={activePitchClasses.has(2)}
          midiNumber={getMidiNumber(octave, 2)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          D
        </KeyButton>
        <KeyButton
          activeNote={activePitchClasses.has(3)}
          blackKey
          midiNumber={getMidiNumber(octave, 3)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          D#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton
          activeNote={activePitchClasses.has(4)}
          midiNumber={getMidiNumber(octave, 4)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          E
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton
          activeNote={activePitchClasses.has(5)}
          midiNumber={getMidiNumber(octave, 5)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          F
        </KeyButton>
        <KeyButton
          activeNote={activePitchClasses.has(6)}
          blackKey
          midiNumber={getMidiNumber(octave, 6)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          F#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton
          activeNote={activePitchClasses.has(7)}
          midiNumber={getMidiNumber(octave, 7)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          G
        </KeyButton>
        <KeyButton
          activeNote={activePitchClasses.has(8)}
          blackKey
          midiNumber={getMidiNumber(octave, 8)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          G#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton
          activeNote={activePitchClasses.has(9)}
          midiNumber={getMidiNumber(octave, 9)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          A
        </KeyButton>
        <KeyButton
          activeNote={activePitchClasses.has(10)}
          blackKey
          midiNumber={getMidiNumber(octave, 10)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          A#
        </KeyButton>
      </Grid>

      <Grid size="grow">
        <KeyButton
          activeNote={activePitchClasses.has(11)}
          midiNumber={getMidiNumber(octave, 11)}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
        >
          B
        </KeyButton>
      </Grid>
    </Grid>
  );
}
