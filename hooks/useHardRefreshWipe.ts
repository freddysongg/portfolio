'use client';

import { useEffect } from 'react';

const REFRESH_KEY = 'r';

export function useHardRefreshWipe(onWipe: () => void): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const isHardRefresh =
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === REFRESH_KEY;
      if (!isHardRefresh) return;
      onWipe();
    };
    document.addEventListener('keydown', handleKeyDown);
    return (): void => document.removeEventListener('keydown', handleKeyDown);
  }, [onWipe]);
}
