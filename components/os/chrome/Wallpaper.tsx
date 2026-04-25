'use client';

import type { MouseEvent, ReactElement, ReactNode } from 'react';

import type { WallpaperKind } from '@/components/os/types';

interface WallpaperProps {
  wallpaper: WallpaperKind;
  onClickAway?: () => void;
  children: ReactNode;
}

const DESKTOP_CLASS = 'os-desktop';

export function Wallpaper({
  wallpaper,
  onClickAway,
  children,
}: WallpaperProps): ReactElement {
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
    if (!onClickAway) return;
    const target = event.target as HTMLElement | null;
    if (target?.classList.contains(DESKTOP_CLASS)) onClickAway();
  };

  return (
    <div
      className={`${DESKTOP_CLASS} wp-${wallpaper}`}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
}
