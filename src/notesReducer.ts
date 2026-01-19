export const NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type Note = (typeof NOTES)[number];

export type State = Record<Note, boolean>;

const initialState = NOTES.reduce(
  (acc, currentValue) => ({ ...acc, [currentValue]: false }),
  {} as State
);

export default function noteReducer(
  state: { [key: string]: boolean } = initialState,
  action: { type: string; note: string }
) {
  switch (action.type) {
    case "note_on": {
      return { ...state, [action.note]: true };
    }

    case "note_off": {
      return { ...state, [action.note]: false };
    }
  }

  throw new Error("Unknown action: " + action.type);
}
