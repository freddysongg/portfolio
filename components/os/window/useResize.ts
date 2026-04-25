'use client';

import { useCallback, useRef, type MouseEvent as ReactMouseEvent } from 'react';

import type { WindowGeom } from '@/components/os/types';

export type ResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface UseResizeArgs {
  geomRef: React.RefObject<WindowGeom>;
  onFocus: () => void;
  onGeom: (next: Partial<WindowGeom>) => void;
  minW: number;
  minH: number;
  isMaximized: boolean;
}

const TOP_BAR_OFFSET = 28;

interface UseResizeResult {
  startResize: (
    dir: ResizeDir
  ) => (event: ReactMouseEvent<HTMLDivElement>) => void;
}

export function useResize({
  geomRef,
  onFocus,
  onGeom,
  minW,
  minH,
  isMaximized,
}: UseResizeArgs): UseResizeResult {
  const onFocusRef = useRef(onFocus);
  const onGeomRef = useRef(onGeom);
  onFocusRef.current = onFocus;
  onGeomRef.current = onGeom;

  const startResize = useCallback(
    (dir: ResizeDir) =>
      (event: ReactMouseEvent<HTMLDivElement>): void => {
        if (isMaximized) return;
        event.preventDefault();
        event.stopPropagation();
        const geom = geomRef.current;
        if (!geom) return;
        const startX = event.clientX;
        const startY = event.clientY;
        const { x: ox, y: oy, w: ow, h: oh } = geom;
        onFocusRef.current();
        document.body.classList.add('resizing-window');

        const handleMove = (ev: MouseEvent): void => {
          let nx = ox;
          let ny = oy;
          let nw = ow;
          let nh = oh;
          const dx = ev.clientX - startX;
          const dy = ev.clientY - startY;
          if (dir.includes('e')) nw = Math.max(minW, ow + dx);
          if (dir.includes('s')) nh = Math.max(minH, oh + dy);
          if (dir.includes('w')) {
            nw = Math.max(minW, ow - dx);
            nx = ox + (ow - nw);
          }
          if (dir.includes('n')) {
            nh = Math.max(minH, oh - dy);
            ny = Math.max(TOP_BAR_OFFSET, oy + (oh - nh));
          }
          onGeomRef.current({ x: nx, y: ny, w: nw, h: nh });
        };
        const handleUp = (): void => {
          window.removeEventListener('mousemove', handleMove);
          window.removeEventListener('mouseup', handleUp);
          document.body.classList.remove('resizing-window');
        };
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleUp);
      },
    [geomRef, isMaximized, minW, minH]
  );

  return { startResize };
}
