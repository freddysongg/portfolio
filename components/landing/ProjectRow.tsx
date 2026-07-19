import styles from '@/components/sections/Landing.module.css';
import type { ProjectEntry } from '@/types/landing';

interface ProjectRowProps {
  project: ProjectEntry;
}

export function ProjectRow({ project }: ProjectRowProps): React.ReactElement {
  const { role, name, href, bullets } = project;

  return (
    <a
      className={`${styles.item} ${styles.link}`}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className={styles.rowline}>
        <div className={styles.prow}>
          <div className={styles.role}>{role}</div>
          <div className={styles.co}>
            <span className={styles.coMain} data-text={name}>
              {name}
            </span>
            <span className={styles.ext}>↗</span>
          </div>
        </div>
      </div>
      <div className={styles.detail}>
        <div>
          <ul>
            {bullets.map(bullet => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </a>
  );
}
