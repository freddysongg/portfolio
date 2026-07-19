import type {
  ContactLink,
  ExperienceEntry,
  LogoKey,
  ProjectEntry,
} from '@/types/landing';
import { PERSONAL_INFO } from '@/utils/constants';

export const LANDING_NAME = 'Freddy Song';

export const SECTION_HEADINGS = {
  currently: 'currently',
  previously: 'previously',
  projects: 'projects',
} as const;

export const LOGO_SRC: Record<LogoKey, string> = {
  adobe: '/icons/adobe.png',
  guitarcenter: '/icons/guitarcenter.png',
  usc: '/icons/usc.png',
  marqui: '/icons/marqui.png',
  ucr: '/icons/ucr.png',
  stealth: '/icons/stealth.png',
  blnk: '/icons/blnk.png',
};

export const CURRENTLY: readonly ExperienceEntry[] = [
  {
    role: 'ml engineer',
    logo: 'adobe',
    co: 'Adobe',
    href: 'http://adobe.com/',
  },
  {
    role: 'ai research',
    logo: 'usc',
    co: 'USC FORTIS Lab',
    href: 'https://viterbi-web.usc.edu/~yzhao010/lab.html',
  },
  {
    role: 'computer science, masters',
    logo: 'usc',
    co: 'University of Southern California',
    href: 'https://usc.edu/',
    roleWraps: true,
  },
];

export const PREVIOUSLY: readonly ExperienceEntry[] = [
  {
    role: 'software engineer',
    logo: 'guitarcenter',
    co: 'Guitar Center',
    href: 'https://korena.com/',
  },
  {
    role: 'software engineer',
    logo: 'marqui',
    co: 'Marqui Labs, NASA',
    href: 'https://marquilabs.com/',
  },
  {
    role: 'deep learning',
    logo: 'usc',
    co: 'USC ACE Lab',
    href: 'https://sites.usc.edu/jzhang/research/',
  },
  { role: 'software engineer', logo: 'blnk', co: 'BLNK' },
  { role: 'software engineer', logo: 'stealth', co: 'Stealth Startup' },
  {
    role: 'computer science, undergraduate',
    logo: 'ucr',
    co: 'University of California, Riverside',
    href: 'https://www.ucr.edu/',
    roleWraps: true,
  },
];

export const PROJECTS: readonly ProjectEntry[] = [
  {
    role: 'generative ai',
    name: 'PHiLIP',
    href: 'https://github.com/freddysongg/PHiLIP-Frontend',
    bullets: [
      'Diffusion-based personalized image generation with PixArt and ControlNet.',
      'High-quality upscaling with human-in-loop refinement.',
      'AMD ROCm accelerated inference.',
    ],
  },
  {
    role: 'fullstack + ml',
    name: 'cafeXpress',
    href: 'https://github.com/freddysongg/cafeXpress',
    bullets: [
      'Semantic search fused with PostGIS geospatial filtering.',
      'Review sentiment analysis feeding recommendations.',
      'Redis-cached hybrid ranking.',
    ],
  },
  {
    role: 'computer vision',
    name: 'MafWays',
    href: 'https://github.com/freddysongg/MafWays',
    bullets: [
      'CNN recognition of handwritten mathematical symbols.',
      'TensorFlow / Keras computer-vision pipeline.',
      'Accessibility-focused equation interpretation.',
    ],
  },
];

const { email, linkedin, github, resumeLink } = PERSONAL_INFO;

export const CONTACT_LINKS: readonly ContactLink[] = [
  { kind: 'email', label: 'email', href: `mailto:${email}` },
  { kind: 'linkedin', label: 'linkedin', href: linkedin },
  { kind: 'github', label: 'github', href: github },
  { kind: 'resume', label: 'resume', href: resumeLink },
];
