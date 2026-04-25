'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';

import { APPS, findApp } from '@/data/os/apps';
import { osExperience } from '@/data/os/experience';
import { feedPosts } from '@/data/os/feed';
import { profile } from '@/data/os/profile';
import { osProjects } from '@/data/os/projects';
import { studioTracks } from '@/data/os/studio';
import { useHardRefreshWipe } from '@/hooks/useHardRefreshWipe';
import {
  clearDesktopSnapshot,
  loadDesktopSnapshot,
  saveDesktopSnapshot,
  type DesktopSnapshot,
  type PersistedSnapshot,
} from '@/lib/os-storage';

import { AboutWindow } from './apps/AboutWindow';
import { FeedWindow } from './apps/FeedWindow';
import { ProjectDetailModal } from './apps/ProjectDetailModal';
import { ProjectsWindow } from './apps/ProjectsWindow';
import { DesktopIcon } from './chrome/DesktopIcon';
import { DesktopNotification } from './chrome/DesktopNotification';
import { MenuBar } from './chrome/MenuBar';
import { Taskbar } from './chrome/Taskbar';
import { TrashBin } from './chrome/TrashBin';
import { Wallpaper } from './chrome/Wallpaper';
import { StudioPlayerProvider } from './studio/StudioPlayerContext';
import type {
  AccentKey,
  AppId,
  IconPos,
  OsProject,
  ThemeMode,
  WindowGeom,
} from './types';
import { Window } from './window/Window';

const ExperienceWindow = dynamic(
  () => import('./apps/ExperienceWindow').then(m => m.ExperienceWindow),
  { ssr: false }
);
const FinderWindow = dynamic(
  () => import('./apps/FinderWindow').then(m => m.FinderWindow),
  { ssr: false }
);
const StudioWindow = dynamic(
  () => import('./apps/StudioWindow').then(m => m.StudioWindow),
  { ssr: false }
);
const TerminalWindow = dynamic(
  () => import('./apps/TerminalWindow').then(m => m.TerminalWindow),
  { ssr: false }
);

const DEFAULT_OPEN: AppId[] = ['about', 'projects', 'experience'];
const DEFAULT_ACTIVE: AppId = 'about';
const DEFAULT_ACCENT: AccentKey = 'terracotta';
const DEFAULT_WALLPAPER = 'dunes' as const;
const DEFAULT_THEME: ThemeMode = 'light';

interface GeomPct {
  x: number;
  y: number;
  w: number;
  h: number;
}

const APP_GEOM_PCTS: Record<AppId, GeomPct> = {
  about: { x: 0.04, y: 0.07, w: 0.53, h: 0.64 },
  projects: { x: 0.33, y: 0.1, w: 0.56, h: 0.67 },
  experience: { x: 0, y: 0, w: 0, h: 0 },
  feed: { x: 0.61, y: 0.09, w: 0.38, h: 0.69 },
  finder: { x: 0.19, y: 0.18, w: 0.5, h: 0.51 },
  music: { x: 0.15, y: 0.11, w: 0.47, h: 0.67 },
  terminal: { x: 0.22, y: 0.2, w: 0.44, h: 0.49 },
};

const MIN_VIEWPORT_W = 800;
const MIN_VIEWPORT_H = 600;

const TIME_TICK_MS = 30_000;
const NOTIFICATION_DELAY_MS = 7000;
const NOTIFICATION_SESSION_KEY = 'freddy-os/notif-shown/v1';
const STUDIO_INITIAL_VIDEO_ID = studioTracks[0].videoId;
const ICON_RIGHT_OFFSET = 110;
const ICON_RIGHT_OFFSET_SECOND = 220;
const CAREER_RIGHT_PADDING_PCT = 0.06;
const CAREER_WIDTH_PCT = 0.4;
const CAREER_TOP_PCT = 0.48;
const CAREER_HEIGHT_PCT = 0.42;

function formatClock(d: Date): string {
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

function buildInitialIconPositions(): Record<AppId, IconPos> {
  const right = window.innerWidth - ICON_RIGHT_OFFSET;
  const right2 = window.innerWidth - ICON_RIGHT_OFFSET_SECOND;
  return {
    about: { x: right, y: 50 },
    projects: { x: right, y: 170 },
    experience: { x: right, y: 290 },
    feed: { x: right, y: 410 },
    finder: { x: right2, y: 50 },
    music: { x: right2, y: 170 },
    terminal: { x: right2, y: 290 },
  };
}

function buildBooleanFlagMap(): Record<AppId, boolean> {
  return APPS.reduce(
    (acc, app) => ({ ...acc, [app.id]: false }),
    {} as Record<AppId, boolean>
  );
}

function buildCareerGeom(vw: number, vh: number): WindowGeom {
  const careerW = Math.round(vw * CAREER_WIDTH_PCT);
  const careerRight = Math.round(vw * (1 - CAREER_RIGHT_PADDING_PCT));
  return {
    x: careerRight - careerW,
    y: Math.round(vh * CAREER_TOP_PCT),
    w: careerW,
    h: Math.round(vh * CAREER_HEIGHT_PCT),
  };
}

function pctToGeom(pct: GeomPct, vw: number, vh: number): WindowGeom {
  return {
    x: Math.round(vw * pct.x),
    y: Math.round(vh * pct.y),
    w: Math.round(vw * pct.w),
    h: Math.round(vh * pct.h),
  };
}

function buildResponsiveGeoms(): Record<AppId, WindowGeom> {
  const vw = Math.max(MIN_VIEWPORT_W, window.innerWidth);
  const vh = Math.max(MIN_VIEWPORT_H, window.innerHeight);
  const result = {} as Record<AppId, WindowGeom>;
  for (const id of Object.keys(APP_GEOM_PCTS) as AppId[]) {
    result[id] = pctToGeom(APP_GEOM_PCTS[id], vw, vh);
  }
  result.experience = buildCareerGeom(vw, vh);
  return result;
}

function buildDefaultSnapshot(): DesktopSnapshot {
  return {
    openWindows: DEFAULT_OPEN,
    activeWindow: DEFAULT_ACTIVE,
    geoms: buildResponsiveGeoms(),
    iconPos: buildInitialIconPositions(),
    theme: DEFAULT_THEME,
    minimized: buildBooleanFlagMap(),
    maxed: buildBooleanFlagMap(),
  };
}

function reconcileSnapshot(persisted: PersistedSnapshot): DesktopSnapshot {
  return {
    openWindows: DEFAULT_OPEN,
    activeWindow: DEFAULT_ACTIVE,
    geoms: { ...buildResponsiveGeoms(), ...persisted.geoms },
    iconPos: { ...buildInitialIconPositions(), ...persisted.iconPos },
    theme: persisted.theme,
    minimized: buildBooleanFlagMap(),
    maxed: buildBooleanFlagMap(),
  };
}

function toPersisted(snapshot: DesktopSnapshot): PersistedSnapshot {
  return {
    geoms: snapshot.geoms,
    iconPos: snapshot.iconPos,
    theme: snapshot.theme,
  };
}

interface StatusContext {
  activeWindow: AppId | null;
}

function statusFor(id: AppId, _ctx: StatusContext): React.ReactNode {
  switch (id) {
    case 'feed':
      return (
        <>
          <span>FEED</span>
          <span style={{ marginLeft: 'auto' }}>
            {feedPosts.length} posts · live
          </span>
        </>
      );
    case 'projects':
      return (
        <>
          <span>PROJECTS</span>
          <span style={{ marginLeft: 'auto' }}>
            {osProjects.length} pinned · drag to reorder
          </span>
        </>
      );
    case 'about':
      return (
        <>
          <span>READY</span>
          <span style={{ marginLeft: 'auto' }}>v1.0 · {profile.domain}</span>
        </>
      );
    case 'experience':
      return (
        <>
          <span>CAREER</span>
          <span style={{ marginLeft: 'auto' }}>
            {osExperience.length} roles
          </span>
        </>
      );
    case 'finder':
      return (
        <>
          <span>FINDER</span>
          <span style={{ marginLeft: 'auto' }}>~/Freddy</span>
        </>
      );
    case 'music':
      return (
        <>
          <span>STUDIO</span>
          <span style={{ marginLeft: 'auto' }}>2 decks loaded</span>
        </>
      );
    case 'terminal':
      return (
        <>
          <span>TTY</span>
          <span style={{ marginLeft: 'auto' }}>bash · 80x24</span>
        </>
      );
    default:
      return <span>{id}</span>;
  }
}

export function Shell(): React.ReactElement {
  const [snapshot, setSnapshot] = useState<DesktopSnapshot | null>(null);
  const [time, setTime] = useState<string>('');
  const [detailProject, setDetailProject] = useState<OsProject | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [feedTargetPostId, setFeedTargetPostId] = useState<string | null>(null);

  useHardRefreshWipe(clearDesktopSnapshot);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.sessionStorage.getItem(NOTIFICATION_SESSION_KEY)) return;
    const t = window.setTimeout(() => {
      setIsNotificationOpen(true);
      window.sessionStorage.setItem(NOTIFICATION_SESSION_KEY, '1');
    }, NOTIFICATION_DELAY_MS);
    return (): void => window.clearTimeout(t);
  }, []);

  const dismissNotification = useCallback((): void => {
    setIsNotificationOpen(false);
  }, []);

  useEffect(() => {
    const persisted = loadDesktopSnapshot();
    setSnapshot(
      persisted ? reconcileSnapshot(persisted) : buildDefaultSnapshot()
    );
  }, []);

  useEffect(() => {
    if (!snapshot) return;
    saveDesktopSnapshot(toPersisted(snapshot));
  }, [snapshot]);

  const theme = snapshot?.theme ?? DEFAULT_THEME;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', DEFAULT_ACCENT);
  }, [theme]);

  useEffect(() => {
    const tick = (): void => setTime(formatClock(new Date()));
    tick();
    const id = window.setInterval(tick, TIME_TICK_MS);
    return (): void => window.clearInterval(id);
  }, []);

  const updateSnapshot = useCallback(
    (updater: (current: DesktopSnapshot) => DesktopSnapshot): void => {
      setSnapshot(current => (current ? updater(current) : current));
    },
    []
  );

  const setTheme = useCallback(
    (next: ThemeMode): void => {
      updateSnapshot(current => ({ ...current, theme: next }));
    },
    [updateSnapshot]
  );

  const openApp = useCallback(
    (id: AppId): void => {
      if (!findApp(id)) return;
      updateSnapshot(current => ({
        ...current,
        openWindows: current.openWindows.includes(id)
          ? current.openWindows
          : [...current.openWindows, id],
        minimized: { ...current.minimized, [id]: false },
        activeWindow: id,
      }));
    },
    [updateSnapshot]
  );

  const openFeedAtPost = useCallback(
    (postId: string): void => {
      openApp('feed');
      setFeedTargetPostId(postId);
    },
    [openApp]
  );

  const handleFeedTargetHandled = useCallback((): void => {
    setFeedTargetPostId(null);
  }, []);

  const closeApp = useCallback(
    (id: string): void => {
      const appId = id as AppId;
      updateSnapshot(current => {
        const remaining = current.openWindows.filter(x => x !== appId);
        const nextActive =
          current.activeWindow === appId
            ? (remaining[remaining.length - 1] ?? null)
            : current.activeWindow;
        return {
          ...current,
          openWindows: remaining,
          maxed: { ...current.maxed, [appId]: false },
          activeWindow: nextActive,
        };
      });
    },
    [updateSnapshot]
  );

  const minimizeApp = useCallback(
    (id: string): void => {
      const appId = id as AppId;
      updateSnapshot(current => ({
        ...current,
        minimized: {
          ...current.minimized,
          [appId]: !current.minimized[appId],
        },
      }));
    },
    [updateSnapshot]
  );

  const maximizeApp = useCallback(
    (id: string): void => {
      const appId = id as AppId;
      updateSnapshot(current => ({
        ...current,
        maxed: { ...current.maxed, [appId]: !current.maxed[appId] },
      }));
    },
    [updateSnapshot]
  );

  const focusApp = useCallback(
    (id: string): void => {
      const appId = id as AppId;
      updateSnapshot(current => ({ ...current, activeWindow: appId }));
    },
    [updateSnapshot]
  );

  const setGeom = useCallback(
    (id: string, next: Partial<WindowGeom>): void => {
      const appId = id as AppId;
      updateSnapshot(current => ({
        ...current,
        geoms: {
          ...current.geoms,
          [appId]: { ...current.geoms[appId], ...next },
        },
      }));
    },
    [updateSnapshot]
  );

  const moveIcon = useCallback(
    (id: AppId, next: IconPos): void => {
      updateSnapshot(current => ({
        ...current,
        iconPos: { ...current.iconPos, [id]: next },
      }));
    },
    [updateSnapshot]
  );

  const handleTaskClick = useCallback(
    (id: AppId): void => {
      updateSnapshot(current => {
        const isMinimized = current.minimized[id];
        if (isMinimized) {
          return {
            ...current,
            minimized: { ...current.minimized, [id]: false },
            activeWindow: id,
          };
        }
        if (current.activeWindow === id) {
          return {
            ...current,
            minimized: { ...current.minimized, [id]: true },
          };
        }
        return { ...current, activeWindow: id };
      });
    },
    [updateSnapshot]
  );

  const handleClickAway = useCallback((): void => {
    updateSnapshot(current => ({ ...current, activeWindow: null }));
  }, [updateSnapshot]);

  const renderContent = (id: AppId): React.ReactNode => {
    switch (id) {
      case 'about':
        return <AboutWindow openApp={openApp} />;
      case 'projects':
        return <ProjectsWindow onOpenProject={setDetailProject} />;
      case 'experience':
        return <ExperienceWindow />;
      case 'feed':
        return (
          <FeedWindow
            targetPostId={feedTargetPostId}
            onTargetHandled={handleFeedTargetHandled}
          />
        );
      case 'finder':
        return (
          <FinderWindow
            onOpenProject={setDetailProject}
            onOpenFeed={openFeedAtPost}
          />
        );
      case 'music':
        return <StudioWindow />;
      case 'terminal':
        return (
          <TerminalWindow openApp={openApp} onOpenProject={setDetailProject} />
        );
      default:
        return null;
    }
  };

  const activeWindow = snapshot?.activeWindow ?? null;

  const activeTitle = useMemo<string>(() => {
    if (!activeWindow) return '';
    return findApp(activeWindow)?.title ?? '';
  }, [activeWindow]);

  return (
    <StudioPlayerProvider initialVideoId={STUDIO_INITIAL_VIDEO_ID}>
      <div className='os-root'>
        <Wallpaper wallpaper={DEFAULT_WALLPAPER} onClickAway={handleClickAway}>
          {snapshot ? (
            <>
              <div className='os-desktop-icons'>
                {APPS.map(app => (
                  <DesktopIcon
                    key={app.id}
                    app={app}
                    pos={snapshot.iconPos[app.id] ?? { x: 0, y: 0 }}
                    onMove={moveIcon}
                    onOpen={openApp}
                  />
                ))}
              </div>

              {snapshot.openWindows.map(id => {
                const geom = snapshot.geoms[id] ?? {
                  x: 100,
                  y: 80,
                  w: 700,
                  h: 540,
                };
                const def = findApp(id);
                if (!def) return null;
                return (
                  <Window
                    key={id}
                    windowId={id}
                    title={def.title}
                    geom={geom}
                    active={snapshot.activeWindow === id}
                    minimized={snapshot.minimized[id]}
                    maximized={snapshot.maxed[id]}
                    onClose={closeApp}
                    onMinimize={minimizeApp}
                    onMaximize={maximizeApp}
                    onFocus={focusApp}
                    onGeom={setGeom}
                    status={statusFor(id, { activeWindow })}
                  >
                    {renderContent(id)}
                  </Window>
                );
              })}
            </>
          ) : null}
        </Wallpaper>

        <MenuBar
          theme={theme}
          setTheme={setTheme}
          time={time}
          openApp={openApp}
          activeTitle={activeTitle}
        />

        <DesktopNotification
          open={isNotificationOpen}
          appName='LinkedIn'
          title='Freddy Song posted an update'
          body='Actively recruiting for Fall 2026 positions. Hit me up!'
          onDismiss={dismissNotification}
        />

        <Taskbar
          openWindows={snapshot?.openWindows ?? []}
          activeWindow={activeWindow}
          minimized={snapshot?.minimized ?? buildBooleanFlagMap()}
          onTaskClick={handleTaskClick}
        />

        <TrashBin />

        {detailProject ? (
          <ProjectDetailModal
            project={detailProject}
            onClose={(): void => setDetailProject(null)}
          />
        ) : null}
      </div>
    </StudioPlayerProvider>
  );
}
