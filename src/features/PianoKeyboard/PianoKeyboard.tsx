import type { State } from "../../notesReducer";
import KeyBedContainer from "./KeyBedContainer";
import OctaveKeys from "./OctaveKeys";

interface PianoKeyboardProps {
  activeNotes: State;
  activeOctaves: number[];
  onNoteOff: (midiNumber: number) => void;
  onNoteOn: (midiNumber: number) => void;
}

export default function PianoKeyboard({
  activeNotes,
  activeOctaves,
  onNoteOff,
  onNoteOn,
}: PianoKeyboardProps) {
  return (
    <KeyBedContainer octaves={activeOctaves.length} sx={{ pb: 2 }}>
      {/* The parent owns octave selection; this component only renders the visible keys. */}
      {activeOctaves.map((octave) => (
        <OctaveKeys
          key={octave}
          onNoteOff={onNoteOff}
          onNoteOn={onNoteOn}
          state={activeNotes}
          octave={octave}
        />
      ))}
    </KeyBedContainer>
  );
}
