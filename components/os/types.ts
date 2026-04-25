export type AppId =
  | 'about'
  | 'projects'
  | 'experience'
  | 'feed'
  | 'finder'
  | 'music'
  | 'terminal';

export type AccentKey = 'terracotta' | 'phosphor' | 'amber' | 'sky';

export type ThemeMode = 'light' | 'dark';

export type DensityMode = 'compact' | 'cozy' | 'spacious';

export type WallpaperKind = 'dunes' | 'grid' | 'phosphor' | 'noise';

export type ChromeKind = 'mac' | 'win98' | 'hybrid';

export type ProjectColor =
  | 'terracotta'
  | 'phosphor'
  | 'amber'
  | 'sky'
  | 'rose'
  | 'plum';

export type ThumbAspect = 'tall' | 'wide' | 'square';

export type IconKind =
  | 'pix-folder'
  | 'pix-doc'
  | 'pix-app'
  | 'pix-disk'
  | 'pix-mail'
  | 'pix-music'
  | 'pix-terminal';

export interface AppDef {
  id: AppId;
  label: string;
  glyph: string;
  iconKind: IconKind;
  color: ProjectColor | 'ink';
  title: string;
}

export interface WindowGeom {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface IconPos {
  x: number;
  y: number;
}

export type ReactionKey = 'fire' | 'spark' | 'heart' | 'coffee' | 'disk';

export interface ReactionDef {
  key: ReactionKey;
  label: string;
  glyph: string;
}

export type ReactionCounts = Partial<Record<ReactionKey, number>>;

export interface FeedComment {
  who: string;
  text: string;
  when: string;
}

export interface FeedImageItem {
  src: string;
  label?: string;
  objectPosition?: string;
}

export interface FeedPost {
  id: string;
  who: string;
  what: string;
  when: string;
  avatar: string;
  body: string;
  hasImage?: boolean;
  imgLabel?: string;
  imgSrc?: string;
  imgHref?: string;
  imgObjectPosition?: string;
  imgGallery?: FeedImageItem[];
  reactions: ReactionCounts;
  total: number;
  comments: FeedComment[];
}

export interface StudioTrack {
  id: number;
  name: string;
  videoId: string;
  dur: string;
}

export interface OsProfile {
  name: string;
  role: string;
  location: string;
  domain: string;
  bio: string;
  extra: string;
  email: string;
  github: string;
  linkedin: string;
  resume: string;
}

export interface OsSkills {
  languages: string[];
  frameworks: string[];
  tools: string[];
  ml: string[];
}

export type SkillTab = keyof OsSkills;

export interface OsProject {
  id: string;
  title: string;
  sub: string;
  cat: string;
  desc: string;
  tags: string[];
  glyph: string;
  thumb: ThumbAspect;
  color: ProjectColor;
  link: string;
  github?: string;
  wip?: boolean;
}

export interface OsExperience {
  id: string;
  company: string;
  role: string;
  when: string;
  current?: boolean;
  desc: string;
  tags: string[];
}

export type TerminalLineKind = 'cmd' | 'out' | 'err' | 'info' | 'matrix';

export interface TerminalLine {
  type: TerminalLineKind;
  text: string;
  prompt?: string;
}

export type FinderItemKind = 'app' | 'doc' | 'music';

export interface FinderItem {
  name: string;
  kind: FinderItemKind;
  glyph?: string;
  color?: ProjectColor;
  project?: OsProject;
  miscDocId?: string;
}

export type FinderFolderKey = 'projects' | 'work' | 'music' | 'photos' | 'misc';

export interface MiscDocSection {
  heading: string;
  items: string[];
}

export interface MiscDoc {
  id: string;
  title: string;
  subtitle?: string;
  intro?: string;
  sections: MiscDocSection[];
  outro?: string;
  linkedFeedId?: string;
  linkedFeedLabel?: string;
  fileName?: string;
}

export interface FinderFolder {
  label: string;
  items: FinderItem[];
}

export type EasterEggKey = 'logo' | 'online' | 'time' | 'battery';

export interface EasterEgg {
  title: string;
  body: string;
  tag: string;
}

export interface MenuAction {
  kind: 'action';
  lbl: string;
  run: () => void;
}

export interface MenuSeparator {
  kind: 'sep';
}

export type MenuEntry = MenuAction | MenuSeparator;

export interface MenuGroup {
  label: string;
  actions: MenuEntry[];
}
