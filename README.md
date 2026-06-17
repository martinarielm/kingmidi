# King MIDI

King MIDI is a browser-based MIDI playground built with React, TypeScript and
Vite. It connects to hardware MIDI devices, plays notes through browser audio,
renders an on-screen piano keyboard, and includes an early room/chat workflow for
shared sessions.

## Current features

- Hardware MIDI input through `webmidi`.
- Browser audio playback through `tone`.
- Visual piano keyboard that highlights active MIDI notes.
- Octave range slider for changing the visible keyboard range.
- Room route support with `#/room/:roomId`.
- Socket connection status and room presence display.
- Basic room chat using Socket.IO events.

## Tech stack

- **React 19** for UI composition.
- **TypeScript** for application types and safer refactors.
- **Vite** for local development and production builds.
- **Material UI** for layout and interface primitives.
- **Emotion styled components** for custom keyboard styling.
- **WebMidi** for hardware MIDI device access.
- **Tone.js** for browser-based synthesis.
- **Socket.IO client** for realtime room communication.
- **React Router** with `HashRouter` for static-hosting-friendly routes.
- **ESLint** for code quality checks.

## Architecture notes

`App.tsx` acts as the page composer. It wires together the main UI sections and
delegates behavior to focused hooks and feature components.

Important pieces:

- `src/features/PianoKeyboard/` contains the visual keyboard feature. The folder
  is named after its main component, and internal pieces such as `OctaveKeys` and
  `KeyButton` stay colocated with it.
- `src/hooks/useMidiInput.ts` owns the WebMidi lifecycle and maps hardware MIDI
  events into audio triggers and active-note updates.
- `src/hooks/useSynth.ts` lazy-loads Tone.js and starts browser audio only after
  a user gesture.
- `src/hooks/useActiveNotes.ts` owns active MIDI note state using an immutable
  `Set<number>` reducer.
- `src/hooks/useOctaveRange.ts` owns the visible octave window used by the
  keyboard and slider.
- `src/features/RoomChat.tsx`, `useRoomMessages.ts` and `useRoomPresence.ts`
  contain the current room/chat workflow.
- `src/services/socket.ts` centralizes Socket.IO client creation and keeps
  `autoConnect: false`, so connection ownership stays in React hooks.

This organization keeps browser APIs and side effects out of presentation
components while still avoiding premature global state management.

## Backend integration

Room and chat features are backed by a small Socket.IO server. The frontend keeps
that integration behind `src/services/socket.ts` and reads the server URL from:

```text
VITE_SOCKET_URL
```

Current socket events:

- `room:join` with `{ roomId }`
- `room:leave` with `{ roomId }`
- `room:users` with `{ roomId, users }`
- `room:message` with `{ roomId, message }`
- `room:message` with `{ roomId, message, senderId }`

## How to run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run quality checks:

```bash
npm run lint
npm run build
```

For room/chat features, configure the socket URL before starting Vite:

```bash
VITE_SOCKET_URL=http://localhost:3000 npm run dev
```

On Windows PowerShell:

```powershell
$env:VITE_SOCKET_URL="http://localhost:3000"
npm run dev
```

Then open the URL shown by Vite and connect a MIDI device. Room routes use hash
routing, for example:

```text
#/room/demo-room
```

## Project status

- Current version: `0.2.1`
- Early-stage prototype.
- Core MIDI input, synth playback, keyboard visualization and room messaging are
  in place.
- The next likely improvements are clickable on-screen keys, stronger room UX,
  better device handling and more polished visual states.

## License

This project is released under the `AGPL-3.0` license.

That means any distribution or service based on this code must keep the same
license and make the source code available. See `LICENSE.txt` for details.

## AI notice

The author requests that this code not be used to train artificial intelligence
models. The official license is AGPL-3.0, so use must comply with its terms
regarding copying and redistribution.
