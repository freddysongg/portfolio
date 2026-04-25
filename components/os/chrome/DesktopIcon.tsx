'use client';

import type { CSSProperties, ReactElement, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

import type { AppDef, AppId, IconPos } from '@/components/os/types';
import { useIconDrag } from '@/components/os/window/useIconDrag';

import { PixelIcon } from './PixelIcon';

interface DesktopIconProps {
  app: AppDef;
  pos: IconPos;
  onMove: (id: AppId, next: IconPos) => void;
  onOpen: (id: AppId) => void;
}

const BOUNCE_DURATION_MS = 420;

export function DesktopIcon({
  app,
  pos,
  onMove,
  onOpen,
}: DesktopIconProps): ReactElement {
  const [bouncing, setBouncing] = useState(false);
  const bounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return (): void => {
      if (bounceTimerRef.current !== null) {
        window.clearTimeout(bounceTimerRef.current);
      }
    };
  }, []);

  const { ref, dragging } = useIconDrag({
    x: pos.x,
    y: pos.y,
    onMove: (next): void => onMove(app.id, next),
    onRejected: (): void => {
      setBouncing(true);
      if (bounceTimerRef.current !== null) {
        window.clearTimeout(bounceTimerRef.current);
      }
      bounceTimerRef.current = window.setTimeout(() => {
        setBouncing(false);
        bounceTimerRef.current = null;
      }, BOUNCE_DURATION_MS);
    },
  });

  const handleDoubleClick = (): void => onOpen(app.id);

  const classes = ['os-desktop-icon'];
  if (dragging) classes.push('dragging');
  if (bouncing) classes.push('bouncing');
  const className = classes.join(' ');
  const style: CSSProperties = { left: pos.x, top: pos.y };
  const divRef = ref as RefObject<HTMLDivElement>;

  return (
    <div
      ref={divRef}
      className={className}
      style={style}
      onDoubleClick={handleDoubleClick}
    >
      <div className='glyph'>
        <PixelIcon kind={app.iconKind} color={app.color} glyph={app.glyph} />
      </div>
      <div className='label'>{app.label}</div>
    </div>
  );
}
