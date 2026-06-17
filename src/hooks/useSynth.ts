import { useCallback, useEffect, useRef, useState } from "react";

type Time = string | number;

type ToneModule = typeof import("tone");
type Synth = InstanceType<ToneModule["Synth"]>;

type UseSynthReturn = {
  initializeAudio: () => Promise<void>;
  isAudioInitialized: boolean;
  triggerAttack: (
    note: string | number,
    time?: Time,
    velocity?: number,
  ) => void;
  triggerRelease: (time?: Time) => void;
  triggerAttackRelease: (
    note: string | number,
    duration: Time,
    time?: Time,
    velocity?: number,
  ) => void;
};

export default function useSynth(): UseSynthReturn {
  const toneRef = useRef<ToneModule | null>(null);
  const synthRef = useRef<Synth | null>(null);

  const initializedRef = useRef(false);
  const initializationPromiseRef = useRef<Promise<void> | null>(null);

  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  useEffect(() => {
    return () => {
      synthRef.current?.dispose();
      synthRef.current = null;
    };
  }, []);

  const initializeAudio = useCallback(async () => {
    if (initializedRef.current) return;

    // Browser audio must start from a user gesture; cache the setup promise to avoid duplicate synths.
    if (initializationPromiseRef.current) {
      return initializationPromiseRef.current;
    }

    initializationPromiseRef.current = (async () => {
      const Tone = await import("tone");

      await Tone.start();

      synthRef.current = new Tone.Synth().toDestination();
      toneRef.current = Tone;

      initializedRef.current = true;
      setIsAudioInitialized(true);
    })();

    return initializationPromiseRef.current;
  }, []);

  const triggerAttack = useCallback(
    (note: string | number, time?: Time, velocity?: number) => {
      if (!initializedRef.current) return;

      synthRef.current?.triggerAttack(note, time, velocity);
    },
    [],
  );

  const triggerRelease = useCallback((time?: Time) => {
    if (!initializedRef.current) return;

    synthRef.current?.triggerRelease(time);
  }, []);

  const triggerAttackRelease = useCallback(
    (note: string | number, duration: Time, time?: Time, velocity?: number) => {
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
