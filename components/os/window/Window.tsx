'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import type { WindowGeom } from '@/components/os/types';

import { useResize } from './useResize';
import { useWindowDrag } from './useWindowDrag';

let zCounter = 100;
function nextZ(): number {
  zCounter += 1;
  return zCounter;
}

interface WindowProps {
  windowId: string;
  title: string;
  geom: WindowGeom;
  active: boolean;
  minimized: boolean;
  maximized: boolean;
  status?: ReactNode;
  children: ReactNode;
  minW?: number;
  minH?: number;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onGeom: (id: string, next: Partial<WindowGeom>) => void;
}

const TOP_BAR_OFFSET = 28;
const OPEN_ANIM_MS = 280;
const CLOSE_ANIM_MS = 220;
const MAX_TRANSITION_MS = 240;

export function Window({
  windowId,
  title,
  geom,
  active,
  minimized,
  maximized,
  status,
  children,
  minW = 360,
  minH = 260,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onGeom,
}: WindowProps): React.ReactElement {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [z, setZ] = useState<number>(active ? nextZ() : 50);
  const [closing, setClosing] = useState(false);
  const [opening, setOpening] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  const geomRef = useRef<WindowGeom>(geom);
  useEffect(() => {
    geomRef.current = geom;
  }, [geom]);

  const maximizedRef = useRef<boolean>(maximized);
  const prevMaxRef = useRef<boolean>(maximized);
  const maxJustChanged = prevMaxRef.current !== maximized;
  useEffect(() => {
    maximizedRef.current = maximized;
    if (prevMaxRef.current === maximized) return;
    prevMaxRef.current = maximized;
    setTransitioning(true);
    const t = window.setTimeout(
      () => setTransitioning(false),
      MAX_TRANSITION_MS
    );
    return (): void => window.clearTimeout(t);
  }, [maximized]);

  useEffect(() => {
    const t = window.setTimeout(() => setOpening(false), OPEN_ANIM_MS);
    return (): void => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (active) setZ(nextZ());
  }, [active]);

  useWindowDrag({
    handleRef: titleRef,
    geomRef,
    maximizedRef,
    onFocus: (): void => onFocus(windowId),
    onMove: (next): void => onGeom(windowId, next),
  });

  const { startResize } = useResize({
    geomRef,
    onFocus: (): void => onFocus(windowId),
    onGeom: (next): void => onGeom(windowId, next),
    minW,
    minH,
    isMaximized: maximized,
  });

  const handleClose = (): void => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => onClose(windowId), CLOSE_ANIM_MS);
  };

  const style: React.CSSProperties = maximized
    ? {
        left: 0,
        top: TOP_BAR_OFFSET,
        width: '100vw',
        height: `calc(100vh - ${TOP_BAR_OFFSET}px)`,
        zIndex: z,
      }
    : {
        left: geom.x,
        top: geom.y,
        width: geom.w,
        height: geom.h,
        zIndex: z,
      };

  const className = [
    'os-window',
    active ? 'active' : '',
    minimized ? 'is-minimized' : '',
    maximized ? 'maximized' : '',
    transitioning || maxJustChanged ? 'transitioning' : '',
    closing ? 'closing' : '',
    opening ? 'opening' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      style={style}
      onMouseDown={(): void => onFocus(windowId)}
    >
      <div
        ref={titleRef}
        className='os-titlebar'
        onDoubleClick={(e): void => {
          const target = e.target as HTMLElement | null;
          if (target?.closest('button')) return;
          onMaximize(windowId);
        }}
      >
        <div className='traffic'>
          <button
            type='button'
            className='traffic-light close'
            onClick={(e): void => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label='Close'
          >
            <span>×</span>
          </button>
          <button
            type='button'
            className='traffic-light min'
            onClick={(e): void => {
              e.stopPropagation();
              onMinimize(windowId);
            }}
            aria-label='Minimize'
          >
            <span>−</span>
          </button>
          <button
            type='button'
            className='traffic-light max'
            onClick={(e): void => {
              e.stopPropagation();
              onMaximize(windowId);
            }}
            aria-label='Maximize'
          >
            <span>+</span>
          </button>
        </div>
        <div className='title'>{title}</div>
        <div className='spacer' />
      </div>
      {children}
      {status ? <div className='os-window-status'>{status}</div> : null}

      {!maximized ? (
        <>
          <div className='rh rh-n' onMouseDown={startResize('n')} />
          <div className='rh rh-s' onMouseDown={startResize('s')} />
          <div className='rh rh-e' onMouseDown={startResize('e')} />
          <div className='rh rh-w' onMouseDown={startResize('w')} />
          <div className='rh rh-ne' onMouseDown={startResize('ne')} />
          <div className='rh rh-nw' onMouseDown={startResize('nw')} />
          <div className='rh rh-se' onMouseDown={startResize('se')} />
          <div className='rh rh-sw' onMouseDown={startResize('sw')} />
        </>
      ) : null}
    </div>
  );
}
