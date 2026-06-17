# King MIDI Frontend Notes

This repository is the client-side frontend for the sibling backend at
`../king-midi-server`.

## Project Shape

- React + TypeScript + Vite app, using ESM (`"type": "module"`).
- UI is built with Material UI and Emotion styled components.
- Audio/MIDI uses `webmidi` for hardware MIDI input and `tone` for browser audio synthesis.
- Routing uses `HashRouter` in `src/main.tsx`; keep this unless deploy routing changes, because Vite is configured with `base: "/kingmidi/"` for GitHub Pages-style static hosting.

## Commands

- `npm run dev` starts Vite.
- `npm run build` runs `tsc -b` and bundles with Vite.
- `npm run lint` runs ESLint.
- There is no test script configured yet.

## Backend Contract

The server lives one directory up at `../king-midi-server`.

- Frontend socket URL comes from `VITE_SOCKET_URL` in Vite env.
- Backend CORS origin comes from `CLIENT_ORIGIN`.
- Current socket events:
  - client emits `room:join` with `{ roomId }`
  - client emits `room:leave` with `{ roomId }`
  - server emits `room:users` with `{ roomId, users }`
  - client emits `room:message` with `{ roomId, message }`
  - server emits `room:message` with `{ roomId, message, senderId }`
- The client socket is created in `src/services/socket.ts` with `autoConnect: false`; `src/hooks/useSocketConnection.ts` owns the explicit `socket.connect()` call and connection status.

## Important Files

- `src/App.tsx`: main UI composition, MIDI setup, audio trigger wiring, room UI.
- `src/main.tsx`: app bootstrap and hash routes.
- `src/hooks/useSynth.ts`: lazy-loads Tone, calls `Tone.start()`, and guards audio initialization.
- `src/notesReducer.ts`: active MIDI notes are tracked as an immutable `Set<number>`.
- `src/utils/midi.ts`: MIDI note number conversion helpers.
- `src/features/*`: room chat, messages, and presence hooks.

## Local Conventions

- Keep browser-only/heavy audio code behind dynamic imports when practical, following `useSynth`.
- Keep socket event names namespaced with `room:*`.
- Reducers should return new `Set` instances rather than mutating state.
- Preserve the room URL shape `#/room/:roomId` unless the static hosting strategy changes.
- Prefer focused changes; the app is still an early prototype and has limited test coverage.

## Known Documentation Mismatches

- `package.json` says version `0.2.1`, while `README.md` still says `0.1.0`.
- `package.json` and `LICENSE.txt` indicate GPL-3.0, while `README.md` mentions AGPL-3.0.
- `README.md` refers to `LICENSE`, but the file present is `LICENSE.txt`.
