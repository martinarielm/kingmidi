import { useCallback, useReducer } from "react";
import noteReducer, { initialState } from "../notesReducer";

// Keeps active MIDI notes in one place so input sources can share the same state shape.
export default function useActiveNotes() {
  const [activeNotes, dispatch] = useReducer(noteReducer, initialState);

  const handleNoteOn = useCallback((midiNumber: number) => {
    dispatch({ type: "note_on", note: midiNumber });
  }, []);

  const handleNoteOff = useCallback((midiNumber: number) => {
    dispatch({ type: "note_off", note: midiNumber });
  }, []);

  return {
    activeNotes,
    handleNoteOn,
    handleNoteOff,
  };
}
