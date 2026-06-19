import { useEffect, useState } from "react";

type WebMidiModule = typeof import("webmidi").WebMidi;
type MidiDevices = WebMidiModule["inputs"];

interface UseMidiInputParams {
  onNoteOn: (midiNumber: number, velocity?: number) => void;
  onNoteOff: (midiNumber: number) => void;
}

export default function useMidiInput({
  onNoteOn,
  onNoteOff,
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
        // Keep the MIDI layer thin: it only forwards the note and velocity upstream.
        onNoteOn(e.note.number, e.note.attack);
      });

      device.addListener("noteoff", (e) => {
        onNoteOff(e.note.number);
      });
    });

    return () => {
      midiDevices?.forEach((device) => {
        device.removeListener("noteon");
        device.removeListener("noteoff");
      });
    };
  }, [midiDevices, onNoteOff, onNoteOn]);

  return { midiDevices };
}
