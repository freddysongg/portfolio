import type {
  AppId,
  IconPos,
  ThemeMode,
  WindowGeom,
} from '@/components/os/types';

export interface DesktopSnapshot {
  openWindows: AppId[];
  activeWindow: AppId | null;
  geoms: Record<AppId, WindowGeom>;
  iconPos: Record<AppId, IconPos>;
  theme: ThemeMode;
  minimized: Record<AppId, boolean>;
  maxed: Record<AppId, boolean>;
}

export interface PersistedSnapshot {
  geoms: Record<AppId, WindowGeom>;
  iconPos: Record<AppId, IconPos>;
  theme: ThemeMode;
}

interface StoredEnvelope {
  v: 2;
  savedAt: number;
  data: PersistedSnapshot;
}

const STORAGE_KEY = 'freddy-os/desktop-state/v2';
const STATE_TTL_MS = 4 * 60 * 60 * 1000;
const ENVELOPE_VERSION = 2;
const LEGACY_STORAGE_KEY = 'freddy-os/desktop-state/v1';

const APP_IDS: readonly AppId[] = [
  'about',
  'projects',
  'experience',
  'feed',
  'finder',
  'music',
  'terminal',
];

const THEME_MODES: readonly ThemeMode[] = ['light', 'dark'];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === 'string' && THEME_MODES.includes(value as ThemeMode);
}

function isWindowGeom(value: unknown): value is WindowGeom {
  if (!isObject(value)) return false;
  const { x, y, w, h } = value;
  return (
    typeof x === 'number' &&
    typeof y === 'number' &&
    typeof w === 'number' &&
    typeof h === 'number'
  );
}

function isIconPos(value: unknown): value is IconPos {
  if (!isObject(value)) return false;
  const { x, y } = value;
  return typeof x === 'number' && typeof y === 'number';
}

function isAppIdRecord<T>(
  value: unknown,
  isItem: (item: unknown) => item is T
): value is Record<AppId, T> {
  if (!isObject(value)) return false;
  for (const id of APP_IDS) {
    if (!(id in value)) return false;
    if (!isItem(value[id])) return false;
  }
  return true;
}

function isPersistedSnapshot(value: unknown): value is PersistedSnapshot {
  if (!isObject(value)) return false;
  const { geoms, iconPos, theme } = value;
  if (!isAppIdRecord(geoms, isWindowGeom)) return false;
  if (!isAppIdRecord(iconPos, isIconPos)) return false;
  if (!isThemeMode(theme)) return false;
  return true;
}

function isStoredEnvelope(value: unknown): value is StoredEnvelope {
  if (!isObject(value)) return false;
  const { v, savedAt, data } = value;
  if (v !== ENVELOPE_VERSION) return false;
  if (typeof savedAt !== 'number') return false;
  return isPersistedSnapshot(data);
}

function dropLegacyStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    return;
  }
}

export function loadDesktopSnapshot(): PersistedSnapshot | null {
  if (typeof window === 'undefined') return null;
  dropLegacyStorage();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isStoredEnvelope(parsed)) {
      console.warn(
        '[os-storage] discarded snapshot: failed shape validation',
        STORAGE_KEY
      );
      return null;
    }
    if (Date.now() - parsed.savedAt > STATE_TTL_MS) {
      return null;
    }
    return parsed.data;
  } catch (error) {
    console.warn('[os-storage] failed to parse snapshot', STORAGE_KEY, error);
    return null;
  }
}

export function saveDesktopSnapshot(snapshot: PersistedSnapshot): void {
  if (typeof window === 'undefined') return;
  const envelope: StoredEnvelope = {
    v: ENVELOPE_VERSION,
    savedAt: Date.now(),
    data: snapshot,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
  } catch (error) {
    console.warn('[os-storage] failed to persist snapshot', STORAGE_KEY, error);
  }
}

export function clearDesktopSnapshot(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (error) {
    console.warn('[os-storage] failed to clear snapshot', STORAGE_KEY, error);
  }
}
