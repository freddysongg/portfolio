'use client';

import type { DragEvent as ReactDragEvent } from 'react';
import { useRef, useState } from 'react';

import type { OsProject } from '@/components/os/types';
import { osProjects } from '@/data/os/projects';

interface ProjectsWindowProps {
  onOpenProject: (project: OsProject) => void;
}

export function ProjectsWindow({
  onOpenProject,
}: ProjectsWindowProps): React.ReactElement {
  const [order, setOrder] = useState<string[]>(() => osProjects.map(p => p.id));
  const dragId = useRef<string | null>(null);

  const ordered: OsProject[] = order
    .map(id => osProjects.find(p => p.id === id))
    .filter((p): p is OsProject => Boolean(p));

  const handleDragStart = (
    e: ReactDragEvent<HTMLDivElement>,
    id: string
  ): void => {
    dragId.current = id;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (
    e: ReactDragEvent<HTMLDivElement>,
    id: string
  ): void => {
    e.preventDefault();
    const from = dragId.current;
    if (!from || from === id) return;
    setOrder(current => {
      const next = [...current];
      const fromIndex = next.indexOf(from);
      const toIndex = next.indexOf(id);
      next.splice(fromIndex, 1);
      next.splice(toIndex, 0, from);
      return next;
    });
  };

  return (
    <div className='os-window-body padded'>
      <div className='section-head'>
        <h2>{'// Project Board'}</h2>
        <div className='meta'>
          {osProjects.length} pinned · drag to rearrange · click to open
        </div>
      </div>
      <div className='pin-grid'>
        {ordered.map(p => (
          <div
            className='pin'
            key={p.id}
            draggable
            onDragStart={(e): void => handleDragStart(e, p.id)}
            onDragOver={(e): void => handleDragOver(e, p.id)}
            onClick={(): void => onOpenProject(p)}
          >
            <div className={`thumb ${p.thumb}`}>
              {p.wip ? (
                <span className='pin-wip-badge' aria-label='Work in progress'>
                  ▲ WIP
                </span>
              ) : null}
              <div className='thumb-inner'>
                {p.iconImage ? (
                  <div
                    className='thumb-glyph'
                    style={{
                      background: 'var(--paper)',
                      padding: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={p.iconImage}
                      alt={`${p.title} icon`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className='thumb-glyph'
                    style={{
                      background: `var(--${p.color})`,
                      color: 'var(--paper)',
                    }}
                  >
                    {p.glyph}
                  </div>
                )}
                <div className='thumb-label'>{p.cat}</div>
              </div>
            </div>
            <div className='body'>
              <div className='cat' style={{ color: `var(--${p.color})` }}>
                {p.cat}
              </div>
              <h3>
                {p.title}{' '}
                <span style={{ color: 'var(--ink-mute)', fontWeight: 400 }}>
                  · {p.sub}
                </span>
              </h3>
              <p>{p.desc}</p>
              <div className='tags'>
                {p.tags.map(t => (
                  <span key={t} className='os-chip'>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
