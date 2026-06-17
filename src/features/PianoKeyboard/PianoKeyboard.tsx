import type { State } from "../../notesReducer";
import KeyBedContainer from "./KeyBedContainer";
import OctaveKeys from "./OctaveKeys";

interface PianoKeyboardProps {
  activeNotes: State;
  activeOctaves: number[];
}

export default function PianoKeyboard({
  activeNotes,
  activeOctaves,
}: PianoKeyboardProps) {
  return (
    <KeyBedContainer octaves={activeOctaves.length} sx={{ pb: 2 }}>
      {activeOctaves.map((octave) => (
        <OctaveKeys state={activeNotes} octave={octave} key={octave} />
      ))}
    </KeyBedContainer>
  );
}
