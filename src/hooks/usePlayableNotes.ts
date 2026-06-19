import { useCallback, useState } from "react";
import useActiveNotes from "./useActiveNotes";
import useSynth from "./useSynth";
import { midiNumberToFrequency } from "../utils/midi";

export default function usePlayableNotes() {
  // This hook is the musical boundary: it keeps UI note state and synth playback in sync.
  const { activeNotes, handleNoteOff, handleNoteOn } = useActiveNotes();
  const {
    initializeAudio,
    isAudioInitialized,
    releaseAll,
    triggerAttack,
    triggerRelease,
  } = useSynth();
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const playPointerNote = useCallback(
    (midiNumber: number) => {
      handleNoteOn(midiNumber);
      if (!isAudioEnabled) return;

      triggerAttack(midiNumberToFrequency(midiNumber));
    },
    [handleNoteOn, isAudioEnabled, triggerAttack],
  );

  const releasePointerNote = useCallback(
    (midiNumber: number) => {
      triggerRelease(midiNumberToFrequency(midiNumber));
      handleNoteOff(midiNumber);
    },
    [handleNoteOff, triggerRelease],
  );

  const playMidiNote = useCallback(
    (midiNumber: number, velocity?: number) => {
      handleNoteOn(midiNumber);
      if (!isAudioEnabled) return;

      triggerAttack(midiNumberToFrequency(midiNumber), 0, velocity);
    },
    [handleNoteOn, isAudioEnabled, triggerAttack],
  );

  const releaseMidiNote = useCallback(
    (midiNumber: number) => {
      handleNoteOff(midiNumber);
      triggerRelease(midiNumberToFrequency(midiNumber));
    },
    [handleNoteOff, triggerRelease],
  );

  const setAudioEnabled = useCallback(
    (nextEnabled: boolean) => {
      setIsAudioEnabled(nextEnabled);

      if (!nextEnabled) {
        // Turning the switch off should silence anything already ringing.
        releaseAll();
        return;
      }

      initializeAudio().catch(() => {
        setIsAudioEnabled(false);
      });
    },
    [initializeAudio, releaseAll],
  );

  return {
    activeNotes,
    isAudioEnabled,
    isAudioInitialized,
    setAudioEnabled,
    playMidiNote,
    playPointerNote,
    releaseMidiNote,
    releasePointerNote,
  };
}
