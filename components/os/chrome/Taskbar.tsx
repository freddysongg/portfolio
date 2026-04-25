'use client';

import type { CSSProperties, ReactElement } from 'react';

import type { AppId } from '@/components/os/types';
import { findApp } from '@/data/os/apps';

interface TaskbarProps {
  openWindows: AppId[];
  activeWindow: AppId | null;
  minimized: Record<AppId, boolean>;
  onTaskClick: (id: AppId) => void;
}

const EMPTY_PILL_STYLE: CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 10,
  color: 'var(--ink-mute)',
  padding: '4px 8px',
  background: 'var(--paper)',
  border: '1.5px dashed var(--line-soft)',
  borderRadius: 3,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

export function Taskbar({
  openWindows,
  activeWindow,
  minimized,
  onTaskClick,
}: TaskbarProps): ReactElement {
  const hasOpenWindows = openWindows.length > 0;

  return (
    <div className='os-taskbar'>
      {openWindows.map(id => {
        const app = findApp(id);
        if (!app) return null;
        const isActive = activeWindow === id && !minimized[id];
        const className = `os-task-btn${isActive ? ' active' : ''}`;
        return (
          <button
            key={id}
            type='button'
            className={className}
            onClick={(): void => onTaskClick(id)}
          >
            <span className='dot' />
            {app.label}
          </button>
        );
      })}
      {!hasOpenWindows ? (
        <div style={EMPTY_PILL_STYLE}>no windows · double-click an icon</div>
      ) : null}
    </div>
  );
}
