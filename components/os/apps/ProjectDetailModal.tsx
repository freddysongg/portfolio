'use client';

import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';

import type { OsProject } from '@/components/os/types';

interface ProjectDetailModalProps {
  project: OsProject | null;
  onClose: () => void;
}

const STOP_LINK = '#';

const ACTION_ROW_STYLE: CSSProperties = {
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  marginTop: 16,
};

export function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps): React.ReactElement | null {
  if (!project) return null;

  const {
    title,
    color,
    glyph,
    sub,
    cat,
    desc,
    tags,
    link,
    github,
    wip,
    iconImage,
  } = project;

  const visitHref = link && link !== STOP_LINK ? link : STOP_LINK;
  const githubHref = github && github !== STOP_LINK ? github : STOP_LINK;
  const isVisitDisabled = visitHref === STOP_LINK;
  const isGithubDisabled = githubHref === STOP_LINK;
  const isLive = !wip && !isVisitDisabled;
  const isSourceOnly = !wip && isVisitDisabled;

  const stopPropagation = (e: ReactMouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const handleDisabledClick =
    (isDisabled: boolean) =>
    (e: ReactMouseEvent<HTMLAnchorElement>): void => {
      if (isDisabled) e.preventDefault();
    };

  return (
    <div className='os-modal-overlay' onClick={onClose}>
      <div className='os-detail-modal' onClick={stopPropagation}>
        <div className='os-titlebar'>
          <div className='traffic'>
            <button
              type='button'
              className='traffic-light close'
              onClick={onClose}
              aria-label='Close'
            >
              <span>×</span>
            </button>
            <button
              type='button'
              className='traffic-light min'
              aria-label='Minimize'
            >
              <span>−</span>
            </button>
            <button
              type='button'
              className='traffic-light max'
              aria-label='Maximize'
            >
              <span>+</span>
            </button>
          </div>
          <div className='title'>{title}.app · INFO</div>
          <div className='spacer' />
        </div>
        <div className='body'>
          <div className='detail-hero'>
            {iconImage ? (
              <div
                className='icon-big'
                style={{
                  background: 'var(--paper)',
                  padding: 0,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={iconImage}
                  alt={`${title} icon`}
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
                className='icon-big'
                style={{ background: `var(--${color})` }}
              >
                {glyph}
              </div>
            )}
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 2 }}>{title}</h2>
              <div
                className='mono'
                style={{ fontSize: 12, color: 'var(--ink-soft)' }}
              >
                {sub}
              </div>
              <div
                className='mono'
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: `var(--${color})`,
                  marginTop: 6,
                }}
              >
                {cat}
              </div>
            </div>
          </div>
          <p style={{ marginBottom: 14, color: 'var(--ink-soft)' }}>{desc}</p>

          <h4>{'// Stack'}</h4>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              marginTop: 6,
              marginBottom: 16,
            }}
          >
            {tags.map(t => (
              <span key={t} className='os-chip'>
                {t}
              </span>
            ))}
          </div>

          <h4>{'// Status'}</h4>
          <div className='stats-grid' style={{ marginTop: 6 }}>
            <div className='stat-cell'>
              <div className='num'>{wip ? 'v0.1' : 'v1.0'}</div>
              <div className='lbl'>Build</div>
            </div>
            <div className='stat-cell'>
              <div className='num'>
                {wip ? (
                  '◐'
                ) : isLive ? (
                  <span className='live-dot' aria-hidden='true' />
                ) : (
                  '◌'
                )}
              </div>
              <div className='lbl'>
                {wip ? 'In Progress' : isLive ? 'Live · 200' : 'Source Only'}
              </div>
            </div>
            <div className='stat-cell'>
              <div className='num'>
                {wip ? 'WIP' : isSourceOnly ? '</>' : 'MIT'}
              </div>
              <div className='lbl'>
                {wip ? 'Status' : isSourceOnly ? 'Repo' : 'License'}
              </div>
            </div>
          </div>

          <hr className='os-div' />
          <div style={ACTION_ROW_STYLE}>
            <a
              className='os-btn primary'
              href={visitHref}
              target='_blank'
              rel='noopener noreferrer'
              onClick={handleDisabledClick(isVisitDisabled)}
            >
              Visit ↗
            </a>
            <a
              className='os-btn'
              href={githubHref}
              target='_blank'
              rel='noopener noreferrer'
              onClick={handleDisabledClick(isGithubDisabled)}
            >
              GitHub ↗
            </a>
            <button type='button' className='os-btn' onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        <div className='os-window-status'>
          <span>READY</span>
          <span style={{ marginLeft: 'auto' }}>{tags.length} dependencies</span>
        </div>
      </div>
    </div>
  );
}
