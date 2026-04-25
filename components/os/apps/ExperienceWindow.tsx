'use client';

import { osExperience } from '@/data/os/experience';

export function ExperienceWindow(): React.ReactElement {
  return (
    <div className='os-window-body padded'>
      <div className='section-head'>
        <h2>{'// Career Log'}</h2>
        <div className='meta'>{osExperience.length} positions</div>
      </div>
      <div className='timeline'>
        {osExperience.map(e => (
          <div className={`tl-item ${e.current ? 'current' : ''}`} key={e.id}>
            <div className='tl-head'>
              <h3>{e.company}</h3>
              <div className='when'>
                {e.when}
                {e.current ? ' · ●' : ''}
              </div>
            </div>
            <div className='tl-role'>{e.role}</div>
            <div className='tl-desc'>{e.desc}</div>
            <div className='tl-tags'>
              {e.tags.map(t => (
                <span key={t} className='os-chip'>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
