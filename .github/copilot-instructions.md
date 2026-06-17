# Copilot instructions for king-midi

Purpose: guidance for future Copilot sessions to quickly understand, build, run, and modify this repository.

---

## Quick commands (npm)

- Install dependencies:
  npm install

- Start dev server (Vite + React):
  npm run dev

- Build (type-check + bundle):
  npm run build

- Preview production build locally:
  npm run preview

- Lint whole repo:
  npm run lint

- Deploy (gh-pages):
  npm run deploy

Notes on running the same commands for a single file/tool:
- Lint a single file:
  npx eslint src/components/KeyButton.tsx

- Tests: there are no test scripts or test runner configured in this repository currently.
  If tests are added, include a `test` script in package.json (e.g. jest or vitest) and add guidance here for running a single test.

---

## High-level architecture

- Tech stack: React + TypeScript + Vite. UI components use Material UI (MUI) and Emotion for styled components.
- Audio & MIDI:
  - webmidi is used to access hardware MIDI devices (Web MIDI API wrapper).
  - tone is loaded dynamically in `useSynth` (dynamic import + Tone.start()) and used to synthesize audio.
- Networking / collaboration:
  - socket.io-client (socket) is used for simple room presence and chat features.
  - Socket URL comes from Vite env: `import.meta.env.VITE_SOCKET_URL` (see `src/services/socket.ts`).
- App entry: `src/main.tsx` uses a HashRouter. Routes: index -> App, `/room/:roomId` -> App.
- UI composition:
  - `App.tsx` composes top-level features: KeyBed, OctaveSlider, Enable Audio button, and optional Room chat.
  - `src/components/*` holds presentational components (KeyButton, OctaveKeys, KeyBedContainer, etc.).
- State and logic:
  - Active notes: `src/notesReducer.ts` — State is a Set<number> representing MIDI note numbers. Reducer actions are `note_on` and `note_off`.
  - MIDI utilities: `src/utils/midi.ts` provides mapping helpers (midiNumberToOctave, midiNumberToPitchClass, midiNumberToLabel).
  - Audio synth hook: `src/hooks/useSynth.ts` returns initializeAudio, triggerAttack, triggerRelease, triggerAttackRelease. It lazily loads the Tone module and guards concurrent initialization via an initialization promise ref.
  - Socket hooks: `src/hooks/useSocketConnection.ts`, `src/features/useRoomPresence.ts`, `src/features/useRoomMessages.ts` and `src/features/RoomChat.tsx` implement simple room-based messaging/presence.

---

## Key conventions and patterns (repo-specific)

- TypeScript + ESM: package.json sets `type: "module"` and code uses `import`/`export` everywhere; prefer `export default` for React components.

- Dynamic imports for heavy browser-only libs:
  - `tone` is imported dynamically inside `useSynth` (`await import("tone")`) and `Tone.start()` is called to satisfy browser audio policies.
  - This prevents server-side or build-time errors and defers heavy work until user interaction.

- Audio initialization pattern:
  - `useSynth` uses an `initializedRef` boolean and `initializationPromiseRef` to avoid duplicated initialization attempts and to allow idempotent calls to initializeAudio.
  - Always call `initializeAudio()` (or interact with the UI "Enable Audio" button) before calling trigger functions.

- MIDI state representation:
  - Notes are represented as MIDI note numbers in a Set<number>. When rendering per-octave, the code maps MIDI numbers to pitch classes (mod 12) and octave (floor/12 - 1).
  - Reducer is pure and returns new Set instances to preserve immutability semantics for React.

- Routing and rooms:
  - Rooms are encoded in the URL as `/room/:roomId` using HashRouter. Room features are optional — App renders chat/presence only when `roomId` exists.

- Socket behavior:
  - Socket client is configured in `src/services/socket.ts`. The client is configured `autoConnect: false` and `useSocketConnection` explicitly connects and listens to connect/disconnect.
  - Room join/leave lifecycle is implemented in `useRoomPresence` using `socket.emit('room:join', { roomId })` and `room:leave` in cleanup.

- Styling/layout:
  - Combination of MUI components and Emotion styled components (see `KeyButton`, `KeyBedContainer`).
  - KeyBed uses a CSS grid where columns are sized per-octave.

- Files of interest (fast lookup):
  - App entry: `src/main.tsx`
  - Top-level UI: `src/App.tsx`
  - Audio hook: `src/hooks/useSynth.ts`
  - MIDI utils: `src/utils/midi.ts`
  - Notes reducer: `src/notesReducer.ts`
  - Socket services/hooks: `src/services/socket.ts`, `src/hooks/useSocketConnection.ts`, `src/features/*`
  - Components: `src/components/*`

---

## Environment variables

- VITE_SOCKET_URL — must be provided at runtime (e.g., `.env.local`) when using the socket features. Example in `.env` or environment for `vite`:
  VITE_SOCKET_URL=http://localhost:3000

If VITE_SOCKET_URL is not set, socket.io will attempt to connect to an undefined URL and fail; UI handles disconnected state but room features will be disabled.

---

## Linting / TypeScript notes

- Type-checking is part of `npm run build` via `tsc -b` (project build).
- ESLint is configured via the devDependencies (see package.json). If adding rules/configs, place them at repo root as `.eslintrc.*` or `eslint.config.*`.

---

## Other AI assistant configs checked

- Searched for common assistant files (CLAUDE.md, AGENTS.md, CONVENTIONS.md, .cursorrules, .windsurfrules, .clinerules, etc.). None were present.

---

## When editing or extending

- Follow the dynamic-import pattern for browser-only heavy libs (Tone, Web MIDI helpers) to keep dev/build simple.
- If adding persistent state or more complex collaboration, prefer namespaced socket events (`room:message`, `room:users`, etc.) to keep compatibility with existing handlers.
- If adding tests, include a `test` script in package.json and update this file to document the test runner and how to run a single test file.

---

If anything in this file needs to be adjusted (more detail, more files referenced, or a section added), say which area to expand and Copilot sessions will update this file.
