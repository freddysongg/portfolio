'use client';

import { useEffect, useState } from 'react';

import styles from '@/components/sections/Landing.module.css';
import { PARROT_FRAMES } from '@/data/asciiParrot';

const FRAME_INTERVAL_MS = 65;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function AsciiArt(): React.ReactElement {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia(REDUCED_MOTION_QUERY).matches;
    if (PARROT_FRAMES.length <= 1 || prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setFrameIndex(previous => (previous + 1) % PARROT_FRAMES.length);
    }, FRAME_INTERVAL_MS);

    return (): void => window.clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.art} aria-hidden='true'>
      <pre>{PARROT_FRAMES[frameIndex]}</pre>
    </div>
  );
}
