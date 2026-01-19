import type { ChordDefinition } from "../types/chords";
import type { Note } from "../types/notes";

export const TRIADS: ChordDefinition[] = [
  { name: "C Mayor", root: "C", type: "Mayor", notes: ["C", "E", "G"] },
  { name: "C Minor", root: "C", type: "Minor", notes: ["C", "D#", "G"] },

  { name: "C# Mayor", root: "C#", type: "Mayor", notes: ["C#", "F", "G#"] },
  { name: "C# Minor", root: "C#", type: "Minor", notes: ["C#", "E", "G#"] },

  { name: "D Mayor", root: "D", type: "Mayor", notes: ["D", "F#", "A"] },
  { name: "D Minor", root: "D", type: "Minor", notes: ["D", "F", "A"] },

  { name: "D# Mayor", root: "D#", type: "Mayor", notes: ["D#", "G", "A#"] },
  { name: "D# Minor", root: "D#", type: "Minor", notes: ["D#", "F#", "A#"] },

  { name: "E Mayor", root: "E", type: "Mayor", notes: ["E", "G#", "B"] },
  { name: "E Minor", root: "E", type: "Minor", notes: ["E", "G", "B"] },

  { name: "F Mayor", root: "F", type: "Mayor", notes: ["F", "A", "C"] },
  { name: "F Minor", root: "F", type: "Minor", notes: ["F", "G#", "C"] },

  { name: "F# Mayor", root: "F#", type: "Mayor", notes: ["F#", "A#", "C#"] },
  { name: "F# Minor", root: "F#", type: "Minor", notes: ["F#", "A", "C#"] },

  // G
  { name: "G Mayor", root: "G", type: "Mayor", notes: ["G", "B", "D"] },
  { name: "G Minor", root: "G", type: "Minor", notes: ["G", "A#", "D"] },

  { name: "G# Mayor", root: "G#", type: "Mayor", notes: ["G#", "C", "D#"] },
  { name: "G# Minor", root: "G#", type: "Minor", notes: ["G#", "B", "D#"] },

  { name: "A Mayor", root: "A", type: "Mayor", notes: ["A", "C#", "E"] },
  { name: "A Minor", root: "A", type: "Minor", notes: ["A", "C", "E"] },

  { name: "A# Mayor", root: "A#", type: "Mayor", notes: ["A#", "D", "F"] },
  { name: "A# Minor", root: "A#", type: "Minor", notes: ["A#", "C#", "F"] },

  { name: "B Mayor", root: "B", type: "Mayor", notes: ["B", "D#", "F#"] },
  { name: "B Minor", root: "B", type: "Minor", notes: ["B", "D", "F#"] },
];

export default function useChords(notes: Note[]) {
  console.log("👨‍🎤 -> useChords -> notes:", notes);
  return false;
}
