export const NOTE_NAMES = [
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

export type NoteName = (typeof NOTE_NAMES)[number];

export function midiNumberToOctave(midiNumber: number) {
  return Math.floor(midiNumber / 12) - 1;
}

export function midiNumberToPitchClass(midiNumber: number): NoteName {
  return NOTE_NAMES[midiNumber % 12];
}

export function midiNumberToLabel(midiNumber: number) {
  return `${midiNumberToPitchClass(midiNumber)}${midiNumberToOctave(midiNumber)}`;
}

export function midiNumberToFrequency(midiNumber: number) {
  return 440 * Math.pow(2, (midiNumber - 69) / 12);
}
