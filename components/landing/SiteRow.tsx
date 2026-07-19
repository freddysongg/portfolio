import Image from 'next/image';

import styles from '@/components/sections/Landing.module.css';
import { LOGO_SRC } from '@/data/landing';
import type { ExperienceEntry } from '@/types/landing';

interface SiteRowProps {
  entry: ExperienceEntry;
}

export function SiteRow({ entry }: SiteRowProps): React.ReactElement {
  const { role, logo, co, href, roleWraps = false } = entry;
  const roleClassName = roleWraps
    ? `${styles.role} ${styles.rolewrap}`
    : styles.role;

  const rowContent = (
    <div className={styles.rowline}>
      <div className={styles.row}>
        <div className={roleClassName}>{role}</div>
        <span className={styles.ic}>
          <Image src={LOGO_SRC[logo]} alt='' width={30} height={30} />
        </span>
        <div className={styles.co}>
          <span className={styles.coMain} data-text={co}>
            {co}
          </span>
          {href ? <span className={styles.ext}>↗</span> : null}
        </div>
      </div>
    </div>
  );

  if (!href) {
    return <div className={styles.item}>{rowContent}</div>;
  }

  return (
    <a
      className={`${styles.item} ${styles.link}`}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      {rowContent}
    </a>
  );
}
