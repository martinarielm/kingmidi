import type { Note } from "./notes";

export type ChordType = "Mayor" | "Minor";

export type ChordDefinition = {
  name: string;
  root: Note;
  type: ChordType;
  notes: readonly [Note, Note, Note];
};
