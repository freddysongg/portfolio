'use client';

import type { CSSProperties, MouseEvent, ReactElement } from 'react';
import { useEffect, useState } from 'react';

import { useStudioPlayer } from '@/components/os/studio/StudioPlayerContext';
import type {
  AppId,
  EasterEgg,
  EasterEggKey,
  MenuEntry,
  MenuGroup,
  ThemeMode,
} from '@/components/os/types';

interface MenuBarProps {
  theme: ThemeMode;
  setTheme: (next: ThemeMode) => void;
  time: string;
  openApp: (id: AppId) => void;
  activeTitle: string;
}

type StaticEggKey = Exclude<EasterEggKey, 'battery'>;

const STATIC_EGGS: Record<StaticEggKey, EasterEgg> = {
  logo: {
    title: 'System Info',
    body: 'Hello, World. Built with React, lots of caffeine, and some creativity.',
    tag: 'v1.0 · ⌘ click around',
  },
  online: {
    title: 'Status — Online',
    body: 'Currently: shipping agentic systems · listening to bangers · probably debugging something. Last commit ~2h ago.',
    tag: '● connected',
  },
  time: {
    title: 'Local Time',
    body: 'Located in SoCal!',
    tag: 'PST · GMT-7',
  },
};

const BATTERY_BODIES: readonly string[] = [
  'Need caffeine and a charge ☕',
  '75% creative · 92% curious · 14% sleep',
  'Last full charge: a Sunday in October',
];

const BATTERY_TITLE = 'Energy Report';
const BATTERY_TAG = 'battery · 75%';

const MENUBAR_SELECTOR = '.os-menubar';

function pickBatteryBody(): string {
  return BATTERY_BODIES[Math.floor(Math.random() * BATTERY_BODIES.length)];
}

function isMenuAction(
  entry: MenuEntry
): entry is Extract<MenuEntry, { kind: 'action' }> {
  return entry.kind === 'action';
}

export function MenuBar({
  theme,
  setTheme,
  time,
  openApp,
  activeTitle,
}: MenuBarProps): ReactElement {
  const studio = useStudioPlayer();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openEgg, setOpenEgg] = useState<EasterEggKey | null>(null);
  const [batteryBody, setBatteryBody] = useState<string>(BATTERY_BODIES[0]);

  useEffect(() => {
    const handleClose = (event: globalThis.MouseEvent): void => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(MENUBAR_SELECTOR)) {
        setOpenMenu(null);
        setOpenEgg(null);
      }
    };
    document.addEventListener('mousedown', handleClose);
    return (): void => document.removeEventListener('mousedown', handleClose);
  }, []);

  const groups: MenuGroup[] = [
    {
      label: 'File',
      actions: [
        {
          kind: 'action',
          lbl: 'New Field Note',
          kbd: '⌘N',
          run: (): void => openApp('feed'),
        },
        {
          kind: 'action',
          lbl: 'Open Finder',
          kbd: '⌘O',
          run: (): void => openApp('finder'),
        },
        {
          kind: 'action',
          lbl: 'Open Terminal',
          kbd: '⌘T',
          run: (): void => openApp('terminal'),
        },
        { kind: 'sep' },
        {
          kind: 'action',
          lbl: 'Print Resume',
          kbd: '⌘P',
          run: (): void => {
            if (typeof window !== 'undefined' && window.print) window.print();
          },
        },
      ],
    },
    {
      label: 'View',
      actions: [
        { kind: 'action', lbl: 'About', run: (): void => openApp('about') },
        {
          kind: 'action',
          lbl: 'Projects',
          run: (): void => openApp('projects'),
        },
        {
          kind: 'action',
          lbl: 'Career.log',
          run: (): void => openApp('experience'),
        },
        {
          kind: 'action',
          lbl: 'Field Notes',
          run: (): void => openApp('feed'),
        },
        { kind: 'action', lbl: 'Finder', run: (): void => openApp('finder') },
      ],
    },
    {
      label: 'Window',
      actions: [
        { kind: 'action', lbl: 'Studio', run: (): void => openApp('music') },
        {
          kind: 'action',
          lbl: 'Terminal',
          run: (): void => openApp('terminal'),
        },
      ],
    },
    {
      label: 'Help',
      actions: [
        {
          kind: 'action',
          lbl: 'About this Site',
          run: (): void => openApp('about'),
        },
        {
          kind: 'action',
          lbl: 'Send Feedback',
          run: (): void => openApp('feed'),
        },
      ],
    },
  ];

  const toggleEgg = (key: EasterEggKey): void => {
    const next = openEgg === key ? null : key;
    if (next === 'battery') setBatteryBody(pickBatteryBody());
    setOpenEgg(next);
    setOpenMenu(null);
  };

  const handleMenuClick = (
    event: MouseEvent<HTMLDivElement>,
    label: string
  ): void => {
    event.stopPropagation();
    setOpenMenu(openMenu === label ? null : label);
    setOpenEgg(null);
  };

  const eggForKey = (key: EasterEggKey): EasterEgg => {
    if (key === 'battery') {
      return { title: BATTERY_TITLE, body: batteryBody, tag: BATTERY_TAG };
    }
    return STATIC_EGGS[key];
  };

  const renderEgg = (
    key: EasterEggKey,
    overrideStyle?: CSSProperties
  ): ReactElement | null => {
    if (openEgg !== key) return null;
    const egg = eggForKey(key);
    return (
      <div className='os-egg-pop' style={overrideStyle}>
        <div className='egg-title'>{`// ${egg.title}`}</div>
        <div className='egg-body'>{egg.body}</div>
        <div className='egg-tag'>{egg.tag}</div>
      </div>
    );
  };

  const logoStyle: CSSProperties = { position: 'relative' };
  const indicatorStyle: CSSProperties = { position: 'relative' };
  const activeTitleStyle: CSSProperties = {
    color: 'var(--ink-mute)',
    marginLeft: 8,
    fontSize: 11,
    cursor: 'default',
  };
  const eggLeftStyle: CSSProperties = { left: 0, right: 'auto' };
  const volumeFillStyle = {
    ['--vol-pct' as string]: `${studio.volume}%`,
  } as CSSProperties;

  return (
    <div className='os-menubar'>
      <div
        className='menu-item logo-item'
        style={logoStyle}
        onClick={(event): void => {
          event.stopPropagation();
          toggleEgg('logo');
        }}
      >
        <div className='logo' />
        {renderEgg('logo', eggLeftStyle)}
      </div>

      <div className='menu-item bold' onClick={(): void => openApp('about')}>
        Freddy
      </div>

      {groups.map(group => {
        const isOpen = openMenu === group.label;
        const itemStyle: CSSProperties = {
          background: isOpen ? 'var(--ink)' : '',
          color: isOpen ? 'var(--paper)' : '',
        };
        return (
          <div
            key={group.label}
            className='menu-item'
            style={itemStyle}
            onClick={(event): void => handleMenuClick(event, group.label)}
          >
            {group.label}
            {isOpen ? (
              <div
                className='os-menu-dropdown'
                onClick={(event): void => event.stopPropagation()}
              >
                {group.actions.map((entry, index) => {
                  if (!isMenuAction(entry)) {
                    return <div key={`sep-${index}`} className='mi sep' />;
                  }
                  return (
                    <div
                      key={`${group.label}-${entry.lbl}`}
                      className='mi'
                      onClick={(event): void => {
                        event.stopPropagation();
                        entry.run();
                        setOpenMenu(null);
                      }}
                    >
                      <span>{entry.lbl}</span>
                      {entry.kbd ? (
                        <span className='kbd'>{entry.kbd}</span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}

      {activeTitle ? (
        <div className='menu-item' style={activeTitleStyle}>
          · {activeTitle}
        </div>
      ) : null}

      <div className='right'>
        <div
          className='indicator mono'
          style={indicatorStyle}
          onClick={(event): void => {
            event.stopPropagation();
            toggleEgg('online');
          }}
        >
          ⚡ Online
          {renderEgg('online')}
        </div>

        <div
          className='indicator mono'
          style={indicatorStyle}
          onClick={(event): void => {
            event.stopPropagation();
            toggleEgg('time');
          }}
        >
          {time}
          {renderEgg('time')}
        </div>

        <div
          className='indicator'
          style={indicatorStyle}
          onClick={(event): void => {
            event.stopPropagation();
            toggleEgg('battery');
          }}
        >
          <div className='os-battery'>
            <div className='fill' />
          </div>
          {renderEgg('battery')}
        </div>

        <div
          className='os-volume'
          onClick={(event): void => event.stopPropagation()}
        >
          <button
            type='button'
            className='os-volume-mute'
            onClick={studio.toggleMute}
            title={studio.isMuted ? 'Unmute' : 'Mute'}
            aria-label={studio.isMuted ? 'Unmute' : 'Mute'}
          >
            {studio.isMuted ? '×' : '♪'}
          </button>
          <input
            type='range'
            min={0}
            max={100}
            step={1}
            value={studio.volume}
            onChange={(event): void =>
              studio.setVolume(Number(event.target.value))
            }
            style={volumeFillStyle}
            aria-label='Studio volume'
          />
        </div>

        <button
          type='button'
          className='os-theme-toggle'
          onClick={(): void => setTheme(theme === 'light' ? 'dark' : 'light')}
          title='Toggle theme'
        >
          <div className='knob' />
        </button>
      </div>
    </div>
  );
}
