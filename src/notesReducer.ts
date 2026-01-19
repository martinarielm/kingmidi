import { NOTES, type Note } from "./types/notes";

export type State = Record<Note, boolean>;

export const initialState: State = NOTES.reduce(
  (acc, currentValue) => ({ ...acc, [currentValue]: false }),
  {} as State,
);

export default function noteReducer(
  state: State = initialState,
  action: { type: string; note: string },
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
