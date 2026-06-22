import { useMemo, useState } from "react";

const MIN_OCTAVE_DISTANCE = 1;

// Owns the visible octave window while keeping the range handles from crossing.
export default function useOctaveRange() {
  const [octaveRange, setOctaveRange] = useState<number[]>([2, 5]);
  const [minOctave, maxOctave] = octaveRange;

  const activeOctaves = useMemo(
    () =>
      Array.from(
        { length: Math.max(0, maxOctave - minOctave + 1) },
        (_, i) => minOctave + i,
      ),
    [maxOctave, minOctave],
  );

  const handleOctaveRangeChange = (
    _e: Event,
    newValue: number[],
    activeThumb: number,
  ) => {
    if (activeThumb === 0) {
      setOctaveRange([
        Math.min(newValue[0], octaveRange[1] - MIN_OCTAVE_DISTANCE),
        octaveRange[1],
      ]);
    } else {
      setOctaveRange([
        octaveRange[0],
        Math.max(newValue[1], octaveRange[0] + MIN_OCTAVE_DISTANCE),
      ]);
    }
  };

  return {
    activeOctaves,
    handleOctaveRangeChange,
    octaveRange,
  };
}
