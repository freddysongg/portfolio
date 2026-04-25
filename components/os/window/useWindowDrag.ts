'use client';

import { useEffect, useRef, type RefObject } from 'react';

interface DragGeom {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface UseWindowDragArgs {
  handleRef: RefObject<HTMLElement | null>;
  geomRef: RefObject<DragGeom>;
  maximizedRef: RefObject<boolean>;
  onFocus: () => void;
  onMove: (next: { x: number; y: number }) => void;
}

const TOP_BAR_OFFSET = 28;

export function useWindowDrag({
  handleRef,
  geomRef,
  maximizedRef,
  onFocus,
  onMove,
}: UseWindowDragArgs): void {
  const onFocusRef = useRef(onFocus);
  const onMoveRef = useRef(onMove);

  useEffect(() => {
    onFocusRef.current = onFocus;
  }, [onFocus]);
  useEffect(() => {
    onMoveRef.current = onMove;
  }, [onMove]);

  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;

    let startX = 0;
    let startY = 0;
    let originX = 0;
    let originY = 0;
    let dragging = false;

    const handleMouseDown = (event: MouseEvent): void => {
      if (maximizedRef.current) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, .traffic, .no-drag')) return;
      event.preventDefault();
      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      const geom = geomRef.current;
      if (!geom) return;
      originX = geom.x;
      originY = geom.y;
      onFocusRef.current();
      document.body.classList.add('dragging-window');
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent): void => {
      if (!dragging) return;
      const geom = geomRef.current;
      if (!geom) return;
      const { w } = geom;
      const nextX = Math.max(
        -w + 100,
        Math.min(window.innerWidth - 60, originX + (event.clientX - startX))
      );
      const nextY = Math.max(
        TOP_BAR_OFFSET,
        Math.min(window.innerHeight - 60, originY + (event.clientY - startY))
      );
      onMoveRef.current({ x: nextX, y: nextY });
    };

    const handleMouseUp = (): void => {
      dragging = false;
      document.body.classList.remove('dragging-window');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    handle.addEventListener('mousedown', handleMouseDown);
    return (): void => {
      handle.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('dragging-window');
    };
  }, [handleRef, geomRef, maximizedRef]);
}
