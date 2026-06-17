# King MIDI

King MIDI is a web prototype built with React, TypeScript and Vite for playing notes and chords
using MIDI devices. The project uses `webmidi` to communicate with hardware and provides a
simple on-screen keyboard and an octave control slider.

## Current status

- Current version: `0.2.1`
- Early-stage prototype: core note and chord logic is implemented.
- Works as a prototype but is not production-ready.
- UI improvements, full MIDI-device compatibility and general polish are still needed.

## Features

- Displays an on-screen keyboard with MIDI notes.
- Allows changing the octave.
- Integrates `webmidi` for connecting to MIDI devices.
- Uses Material UI for basic components.

## How to run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the URL shown by Vite and connect your MIDI device.

## License

This project is released under the `AGPL-3.0` license.
That means any distribution or service based on the code must keep the same
license and make the source code available.

## AI notice

The author requests that this code not be used to train artificial intelligence models.
The official license is AGPL-3.0, so use must comply with its terms regarding copying and redistribution.

## Notes

- The repository can be public, but the license protects redistribution and derivative works under the same terms.
- If you plan to reuse parts of the code in another project, please review the `LICENSE.txt` file.
