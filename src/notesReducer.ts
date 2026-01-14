export type State = {
  [key: string]: boolean;
};

export const initialState: State = {
  C: false,
  "C#": false,
  D: false,
  "D#": false,
  E: false,
  F: false,
  "F#": false,
  G: false,
  "G#": false,
  A: false,
  "A#": false,
  B: false,
};

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

  throw Error("Unknown action: " + action.type);
}
