import { useEffect, useState } from "react";
import { midiNumberToFrequency } from "../utils/midi";

type WebMidiModule = typeof import("webmidi").WebMidi;
type MidiDevices = WebMidiModule["inputs"];

interface UseMidiInputParams {
  onNoteOn: (midiNumber: number) => void;
  onNoteOff: (midiNumber: number) => void;
  triggerAttack: (note: number, time?: number, velocity?: number) => void;
  triggerRelease: () => void;
}

export default function useMidiInput({
  onNoteOn,
  onNoteOff,
  triggerAttack,
  triggerRelease,
}: UseMidiInputParams) {
  const [midi, setMidi] = useState<WebMidiModule>();
  const midiDevices: MidiDevices | undefined = midi?.inputs;

  // WebMidi owns browser MIDI access, so this hook owns its enable/disable lifecycle.
  useEffect(() => {
    let isMounted = true;
    let enabledMidi: WebMidiModule | undefined;

    const handleMidiEnabled = () => {
      if (!isMounted || !enabledMidi) return;

      setMidi(enabledMidi);
    };

    import("webmidi").then(({ WebMidi }) => {
      if (!isMounted) return;

      enabledMidi = WebMidi;
      WebMidi.enable({ callback: handleMidiEnabled });
    });

    return () => {
      isMounted = false;
      enabledMidi?.disable();
      setMidi(undefined);
    };
  }, []);

  // Hardware MIDI events update both the synth and the visual active-note state.
  useEffect(() => {
    midiDevices?.forEach((device) => {
      device.addListener("noteon", (e) => {
        triggerAttack(midiNumberToFrequency(e.note.number), 0, e.note.attack);
        onNoteOn(e.note.number);
      });

      device.addListener("noteoff", (e) => {
        triggerRelease();
        onNoteOff(e.note.number);
      });
    });

    return () => {
      midiDevices?.forEach((device) => {
        device.removeListener("noteon");
        device.removeListener("noteoff");
      });
    };
  }, [midiDevices, onNoteOff, onNoteOn, triggerAttack, triggerRelease]);

  return { midiDevices };
}
