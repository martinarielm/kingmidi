import * as Tone from "tone";
import { useEffect, useRef, useCallback, useState } from "react";

type UseSynthReturn = {
  initializeAudio: () => Promise<void>;
  isAudioInitialized: boolean;
  triggerAttack: (
    note: string | number,
    time?: Tone.Unit.Time,
    velocity?: number,
  ) => void;
  triggerRelease: (time?: Tone.Unit.Time) => void;
  triggerAttackRelease: (
    note: string | number,
    duration: Tone.Unit.Time,
    time?: Tone.Unit.Time,
    velocity?: number,
  ) => void;
};

export default function useSynth(): UseSynthReturn {
  const synthRef = useRef<Tone.Synth | null>(null);
  const initializedRef = useRef(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  useEffect(() => {
    synthRef.current = new Tone.Synth().toDestination();
    return () => {
      synthRef.current?.dispose();
      synthRef.current = null;
    };
  }, []);

  const initializeAudio = useCallback(async () => {
    if (initializedRef.current) return;
    await Tone.start();
    initializedRef.current = true;
    setIsAudioInitialized(true);
  }, []);

  const triggerAttack = useCallback(
    (note: string | number, time?: Tone.Unit.Time, velocity?: number) => {
      if (!initializedRef.current) return;
      synthRef.current?.triggerAttack(note, time, velocity);
    },
    [],
  );

  const triggerRelease = useCallback((time?: Tone.Unit.Time) => {
    if (!initializedRef.current) return;
    synthRef.current?.triggerRelease(time);
  }, []);

  const triggerAttackRelease = useCallback(
    (
      note: string | number,
      duration: Tone.Unit.Time,
      time?: Tone.Unit.Time,
      velocity?: number,
    ) => {
      if (!initializedRef.current) return;
      synthRef.current?.triggerAttackRelease(note, duration, time, velocity);
    },
    [],
  );

  return {
    initializeAudio,
    isAudioInitialized,
    triggerAttack,
    triggerRelease,
    triggerAttackRelease,
  };
}
