'use client';

import { useState } from 'react';

import type { AppId, SkillTab } from '@/components/os/types';
import { profile, SKILL_LABELS, skills } from '@/data/os/profile';

interface AboutWindowProps {
  openApp: (id: AppId) => void;
}

const DEFAULT_TAB: SkillTab = 'languages';

export function AboutWindow({ openApp }: AboutWindowProps): React.ReactElement {
  const [tab, setTab] = useState<SkillTab>(DEFAULT_TAB);

  const {
    name,
    role,
    location,
    domain,
    bio,
    extra,
    email,
    github,
    linkedin,
    resume,
  } = profile;

  const skillKeys = Object.keys(skills) as SkillTab[];
  const totalSkillCount = skillKeys.reduce(
    (sum, key) => sum + skills[key].length,
    0
  );

  return (
    <div className='os-window-body padded'>
      <div className='profile-hero'>
        <div className='avatar-pixel' />
        <div className='profile-meta'>
          <div className='name'>{name}</div>
          <div className='role'>{role}</div>
          <div className='location'>
            {location} · {domain}
          </div>
          <div className='profile-actions'>
            <button
              type='button'
              className='os-btn primary'
              onClick={(): void => openApp('feed')}
            >
              Follow
            </button>
            <button
              type='button'
              className='os-btn'
              onClick={(): void => openApp('terminal')}
            >
              Message
            </button>
            <a
              className='os-btn'
              href={resume}
              target='_blank'
              rel='noopener noreferrer'
            >
              Resume.pdf
            </a>
          </div>
        </div>
      </div>

      <div className='about-cols'>
        <div>
          <h4>{'// ABOUT'}</h4>
          <p style={{ marginBottom: 10 }}>{bio}</p>
          <p>{extra}</p>
        </div>

        <div>
          <h4>{'// CONTACT'}</h4>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
            }}
          >
            <div>
              email · <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div>
              github ·{' '}
              <a href={github} target='_blank' rel='noopener noreferrer'>
                @freddysongg
              </a>
            </div>
            <div>
              linkedin ·{' '}
              <a href={linkedin} target='_blank' rel='noopener noreferrer'>
                /in/freddysong
              </a>
            </div>
          </div>

          <div
            className='callout'
            onClick={(): void => openApp('music')}
            style={{ cursor: 'pointer' }}
          >
            <div className='glyph'>♪</div>
            <div>
              <div
                className='mono'
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--ink-mute)',
                }}
              >
                Creative outlet
              </div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>
                aka I touch grass →
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--ink-soft)',
                  marginTop: 2,
                }}
              >
                When I&apos;m not building agentic systems you&apos;ll find me
                making mixes at my workstation.
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className='os-div' />

      <div className='section-head'>
        <h2>{'// Skill Stack'}</h2>
        <div className='meta'>{totalSkillCount} entries</div>
      </div>

      <div className='skill-tabs'>
        {skillKeys.map(k => (
          <button
            type='button'
            key={k}
            className={`skill-tab ${tab === k ? 'active' : ''}`}
            onClick={(): void => setTab(k)}
          >
            {SKILL_LABELS[k]} · {skills[k].length}
          </button>
        ))}
      </div>
      <div className='skill-grid'>
        {skills[tab].map(s => (
          <div key={s} className='skill-item'>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
