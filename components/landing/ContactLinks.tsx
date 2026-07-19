import styles from '@/components/sections/Landing.module.css';
import { CONTACT_LINKS } from '@/data/landing';
import type { ContactKind } from '@/types/landing';

function ContactIcon({ kind }: { kind: ContactKind }): React.ReactElement {
  switch (kind) {
    case 'email':
      return (
        <svg viewBox='0 0 24 24'>
          <rect x='3' y='5' width='18' height='14' rx='2' />
          <path d='M3 7l9 6 9-6' />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox='0 0 24 24'>
          <rect x='3' y='3' width='18' height='18' rx='2' />
          <path d='M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7' />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox='0 0 24 24'>
          <path d='M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6 3.6 4.9 3.9 4.9 3.9a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.5 10.3c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22' />
        </svg>
      );
    case 'resume':
      return (
        <svg viewBox='0 0 24 24'>
          <path d='M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z' />
          <path d='M14 3v6h6M9 13h6M9 17h4' />
        </svg>
      );
    default: {
      const exhaustiveCheck: never = kind;
      return exhaustiveCheck;
    }
  }
}

export function ContactLinks(): React.ReactElement {
  return (
    <nav className={styles.contact}>
      {CONTACT_LINKS.map(({ kind, label, href }) => {
        const isExternal = !href.startsWith('mailto:');
        return (
          <a
            key={kind}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
          >
            <ContactIcon kind={kind} />
            {label}
          </a>
        );
      })}
    </nav>
  );
}
