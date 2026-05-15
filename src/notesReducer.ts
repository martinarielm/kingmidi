export type State = Set<number>;

export const initialState: State = new Set();

type MidiAction =
  | { type: "note_on"; note: number }
  | { type: "note_off"; note: number };

export default function noteReducer(
  state: State = initialState,
  action: MidiAction,
) {
  switch (action.type) {
    case "note_on": {
      const nextState = new Set(state);
      nextState.add(action.note);
      return nextState;
    }

    case "note_off": {
      const nextState = new Set(state);
      nextState.delete(action.note);
      return nextState;
    }

    default: {
      const _exhaustiveCheck: never = action;
      throw new Error("Unknown action: " + JSON.stringify(_exhaustiveCheck));
    }
  }
}
