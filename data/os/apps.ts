import type { AppDef, AppId } from '@/components/os/types';

export const APPS: AppDef[] = [
  {
    id: 'about',
    label: 'About.me',
    glyph: 'FS',
    iconKind: 'pix-app',
    color: 'terracotta',
    title: 'About — Freddy.app',
  },
  {
    id: 'projects',
    label: 'Projects',
    glyph: '✦',
    iconKind: 'pix-app',
    color: 'phosphor',
    title: 'Projects — Pin Board',
  },
  {
    id: 'experience',
    label: 'Career.log',
    glyph: '📜',
    iconKind: 'pix-doc',
    color: 'amber',
    title: 'Career — log.txt',
  },
  {
    id: 'feed',
    label: 'Field Notes',
    glyph: '❒',
    iconKind: 'pix-app',
    color: 'sky',
    title: 'Field Notes — Feed',
  },
  {
    id: 'finder',
    label: 'Finder',
    glyph: '▤',
    iconKind: 'pix-folder',
    color: 'amber',
    title: 'Finder',
  },
  {
    id: 'music',
    label: 'Studio',
    glyph: '♪',
    iconKind: 'pix-music',
    color: 'plum',
    title: 'Studio — Set Decks',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    glyph: '>_',
    iconKind: 'pix-terminal',
    color: 'ink',
    title: 'Terminal — bash',
  },
];

export function findApp(id: AppId): AppDef | undefined {
  return APPS.find(a => a.id === id);
}
