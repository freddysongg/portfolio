'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIconDragArgs {
  x: number;
  y: number;
  onMove: (next: { x: number; y: number }) => void;
  onSingleClick?: () => void;
  onRejected?: () => void;
}

interface UseIconDragResult {
  ref: React.RefObject<HTMLDivElement | null>;
  dragging: boolean;
}

const DRAG_THRESHOLD_PX = 4;
const TOP_BAR_OFFSET = 28;
const ICON_RIGHT_LIMIT = 100;
const ICON_BOTTOM_LIMIT = 60;
const TRASH_ZONE_SELECTOR = '[data-trash-zone]';
const TRASH_REJECT_EVENT = 'os-trash-reject';
const TRASH_HOVER_EVENT = 'os-trash-hover';

function isPointInside(
  rect: DOMRect,
  clientX: number,
  clientY: number
): boolean {
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}

export function useIconDrag({
  x,
  y,
  onMove,
  onSingleClick,
  onRejected,
}: UseIconDragArgs): UseIconDragResult {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const posRef = useRef({ x, y });
  const onMoveRef = useRef(onMove);
  const onClickRef = useRef(onSingleClick);
  const onRejectedRef = useRef(onRejected);

  useEffect(() => {
    posRef.current = { x, y };
  }, [x, y]);
  useEffect(() => {
    onMoveRef.current = onMove;
  }, [onMove]);
  useEffect(() => {
    onClickRef.current = onSingleClick;
  }, [onSingleClick]);
  useEffect(() => {
    onRejectedRef.current = onRejected;
  }, [onRejected]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let startX = 0;
    let startY = 0;
    let originX = 0;
    let originY = 0;
    let moved = false;
    let isDown = false;
    let lastTrashHover = false;

    const handleDown = (event: MouseEvent): void => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, a')) return;
      event.preventDefault();
      isDown = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      originX = posRef.current.x;
      originY = posRef.current.y;
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
    };

    const handleMove = (event: MouseEvent): void => {
      if (!isDown) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD_PX) {
        moved = true;
        setDragging(true);
        const nx = Math.max(
          0,
          Math.min(window.innerWidth - ICON_RIGHT_LIMIT, originX + dx)
        );
        const ny = Math.max(
          TOP_BAR_OFFSET,
          Math.min(window.innerHeight - ICON_BOTTOM_LIMIT, originY + dy)
        );
        onMoveRef.current({ x: nx, y: ny });

        const trashEl =
          document.querySelector<HTMLElement>(TRASH_ZONE_SELECTOR);
        const isOver = trashEl
          ? isPointInside(
              trashEl.getBoundingClientRect(),
              event.clientX,
              event.clientY
            )
          : false;
        if (isOver !== lastTrashHover) {
          lastTrashHover = isOver;
          window.dispatchEvent(
            new CustomEvent<boolean>(TRASH_HOVER_EVENT, { detail: isOver })
          );
        }
      }
    };

    const handleUp = (event: MouseEvent): void => {
      isDown = false;
      setDragging(false);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      if (lastTrashHover) {
        lastTrashHover = false;
        window.dispatchEvent(
          new CustomEvent<boolean>(TRASH_HOVER_EVENT, { detail: false })
        );
      }
      if (!moved) {
        onClickRef.current?.();
        return;
      }
      const trashEl = document.querySelector<HTMLElement>(TRASH_ZONE_SELECTOR);
      if (
        trashEl &&
        isPointInside(
          trashEl.getBoundingClientRect(),
          event.clientX,
          event.clientY
        )
      ) {
        onMoveRef.current({ x: originX, y: originY });
        window.dispatchEvent(new CustomEvent(TRASH_REJECT_EVENT));
        onRejectedRef.current?.();
      }
    };

    node.addEventListener('mousedown', handleDown);
    return (): void => {
      node.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return { ref, dragging };
}
