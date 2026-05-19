'use client';

import { useState } from 'react';

import type {
  FinderFolder,
  FinderFolderKey,
  MiscDoc,
  OsExperience,
  OsProject,
} from '@/components/os/types';
import { osExperience } from '@/data/os/experience';
import { findMiscDoc, miscDocs } from '@/data/os/misc';
import { osProjects } from '@/data/os/projects';

interface FinderWindowProps {
  onOpenProject: (project: OsProject) => void;
  onOpenFeed: (postId: string) => void;
}

const DEFAULT_FOLDER: FinderFolderKey = 'projects';
const DEFAULT_APP_COLOR = 'terracotta';

const FOLDER_ORDER: FinderFolderKey[] = [
  'projects',
  'work',
  'music',
  'photos',
  'misc',
];

function buildFolders(): Record<FinderFolderKey, FinderFolder> {
  return {
    projects: {
      label: 'Projects',
      items: osProjects.map(p => ({
        name: `${p.id}.app`,
        kind: 'app',
        glyph: p.glyph,
        color: p.color,
        project: p,
        iconImage: p.iconImage,
      })),
    },
    work: {
      label: 'Work',
      items: osExperience.map(e => ({
        name: `${e.company.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`,
        kind: 'doc',
      })),
    },
    music: {
      label: 'Music',
      items: [
        { name: 'set_01_house.mp3', kind: 'music' },
        { name: 'set_02_break.mp3', kind: 'music' },
        { name: 'set_03_disco.mp3', kind: 'music' },
      ],
    },
    photos: {
      label: 'Photos',
      items: [
        { name: 'mammoth_24.jpg', kind: 'doc' },
        { name: 'studio.jpg', kind: 'doc' },
      ],
    },
    misc: {
      label: 'Misc',
      items: [
        ...miscDocs.map(d => ({
          name: d.fileName ?? `${d.id}.md`,
          kind: 'doc' as const,
          miscDocId: d.id,
        })),
        { name: 'reading_list.md', kind: 'doc' as const },
      ],
    },
  };
}

interface WorkListProps {
  entries: OsExperience[];
}

function WorkList({ entries }: WorkListProps): React.ReactElement {
  return (
    <div className='finder-work'>
      {entries.map(e => (
        <article className='work-row' key={e.id}>
          <header className='work-row-head'>
            <div className='work-row-title'>
              <span className='company'>{e.company}</span>
              {e.current ? <span className='now-pill'>NOW</span> : null}
            </div>
            <div className='work-row-meta'>
              <span className='role'>{e.role}</span>
              <span className='dot'>·</span>
              <span className='when'>{e.when}</span>
            </div>
          </header>
          <p className='work-row-desc'>{e.desc}</p>
          <div className='work-row-tags'>
            {e.tags.map(t => (
              <span className='tag' key={t}>
                {t}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

interface DocViewerProps {
  doc: MiscDoc;
  onBack: () => void;
  onOpenFeed: (postId: string) => void;
}

function DocViewer({
  doc,
  onBack,
  onOpenFeed,
}: DocViewerProps): React.ReactElement {
  const ctaLabel = doc.linkedFeedLabel ?? 'Open in Field Notes';
  return (
    <div className='doc-viewer'>
      <div className='doc-viewer-bar'>
        <button type='button' className='doc-back' onClick={onBack}>
          ← Misc
        </button>
      </div>
      <div className='doc-viewer-body'>
        <header className='doc-head'>
          <h2>{doc.title}</h2>
          {doc.subtitle ? (
            <div className='doc-subtitle'>{doc.subtitle}</div>
          ) : null}
        </header>
        {doc.linkedFeedId ? (
          <button
            type='button'
            className='doc-feed-link'
            onClick={(): void => onOpenFeed(doc.linkedFeedId as string)}
          >
            <span className='doc-feed-link-glyph'>✦</span>
            <span>{ctaLabel}</span>
            <span className='doc-feed-link-arrow'>→</span>
          </button>
        ) : null}
        {doc.intro ? <p className='doc-intro'>{doc.intro}</p> : null}
        <div className='doc-sections'>
          {doc.sections.map(s => (
            <section className='doc-section' key={s.heading}>
              <h3 className='doc-section-heading'>{s.heading}</h3>
              <ul className='doc-section-list'>
                {s.items.map((item, i) => (
                  <li key={`${s.heading}-${i}`}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        {doc.outro ? <p className='doc-outro'>{doc.outro}</p> : null}
      </div>
    </div>
  );
}

export function FinderWindow({
  onOpenProject,
  onOpenFeed,
}: FinderWindowProps): React.ReactElement {
  const [folder, setFolder] = useState<FinderFolderKey>(DEFAULT_FOLDER);
  const [openMiscDocId, setOpenMiscDocId] = useState<string | null>(null);
  const folders = buildFolders();
  const current = folders[folder];
  const openMiscDoc =
    folder === 'misc' && openMiscDocId ? findMiscDoc(openMiscDocId) : null;

  const switchFolder = (next: FinderFolderKey): void => {
    setFolder(next);
    setOpenMiscDocId(null);
  };

  const renderRightPane = (): React.ReactElement => {
    if (openMiscDoc) {
      return (
        <DocViewer
          doc={openMiscDoc}
          onBack={(): void => setOpenMiscDocId(null)}
          onOpenFeed={onOpenFeed}
        />
      );
    }
    if (folder === 'work') {
      return <WorkList entries={osExperience} />;
    }
    return (
      <div className='finder-grid'>
        {current.items.map((f, i) => (
          <div
            className='file-icon'
            key={`${folder}-${f.name}-${i}`}
            onDoubleClick={(): void => {
              if (f.project) {
                onOpenProject(f.project);
                return;
              }
              if (f.miscDocId) {
                setOpenMiscDocId(f.miscDocId);
              }
            }}
          >
            <div className='fi-glyph'>
              {f.kind === 'app' ? (
                f.iconImage ? (
                  <div
                    className='pix-icon pix-app'
                    style={{
                      background: 'var(--paper)',
                      padding: 0,
                      overflow: 'hidden',
                      borderRadius: 8,
                    }}
                  >
                    <img
                      src={f.iconImage}
                      alt={`${f.name} icon`}
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
                    className='pix-icon pix-app'
                    style={{
                      background: `var(--${f.color ?? DEFAULT_APP_COLOR})`,
                    }}
                  >
                    {f.glyph}
                  </div>
                )
              ) : null}
              {f.kind === 'doc' ? <div className='pix-icon pix-doc' /> : null}
              {f.kind === 'music' ? (
                <div className='pix-icon pix-music'>♪</div>
              ) : null}
            </div>
            <div className='fi-label' title={f.name}>
              {f.name}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const crumbTail = openMiscDoc
    ? `${current.label} / ${openMiscDoc.fileName ?? `${openMiscDoc.id}.md`}`
    : current.label;
  const itemCount = openMiscDoc
    ? '1 doc open'
    : `${current.items.length} items`;

  return (
    <div className='finder'>
      <div className='finder-side'>
        <div className='group'>Favorites</div>
        {FOLDER_ORDER.map(k => (
          <div
            key={k}
            className={`item ${folder === k ? 'active' : ''}`}
            onClick={(): void => switchFolder(k)}
          >
            ▤ {folders[k].label}
          </div>
        ))}
        <div className='group'>Devices</div>
        <div className='item'>▣ freddy_macbook</div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div className='finder-toolbar'>
          <span>‹</span>
          <span>›</span>
          <div className='crumb'>
            <span>~ /</span> {crumbTail}
          </div>
          <span>{itemCount}</span>
        </div>
        {renderRightPane()}
      </div>
    </div>
  );
}
