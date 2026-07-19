export type LogoKey =
  | 'adobe'
  | 'guitarcenter'
  | 'usc'
  | 'marqui'
  | 'ucr'
  | 'stealth'
  | 'blnk';

export interface ExperienceEntry {
  role: string;
  logo: LogoKey;
  co: string;
  href?: string;
  roleWraps?: boolean;
}

export interface ProjectEntry {
  role: string;
  name: string;
  href: string;
  bullets: readonly string[];
}

export type ContactKind = 'email' | 'linkedin' | 'github' | 'resume';

export interface ContactLink {
  kind: ContactKind;
  label: string;
  href: string;
}
