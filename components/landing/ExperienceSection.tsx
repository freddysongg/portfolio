import { SiteRow } from '@/components/landing/SiteRow';
import styles from '@/components/sections/Landing.module.css';
import type { ExperienceEntry } from '@/types/landing';

interface ExperienceSectionProps {
  heading: string;
  entries: readonly ExperienceEntry[];
}

export function ExperienceSection({
  heading,
  entries,
}: ExperienceSectionProps): React.ReactElement {
  return (
    <section className={styles.section}>
      <h2 className={styles.h}>{heading}</h2>
      <div className={styles.rows}>
        {entries.map(entry => (
          <SiteRow key={entry.co} entry={entry} />
        ))}
      </div>
    </section>
  );
}
