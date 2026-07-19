import { AsciiArt } from '@/components/landing/AsciiArt';
import { ContactLinks } from '@/components/landing/ContactLinks';
import { ExperienceSection } from '@/components/landing/ExperienceSection';
import { ProjectRow } from '@/components/landing/ProjectRow';
import styles from '@/components/sections/Landing.module.css';
import {
  CURRENTLY,
  LANDING_NAME,
  PREVIOUSLY,
  PROJECTS,
  SECTION_HEADINGS,
} from '@/data/landing';

import '@/components/sections/landing-globals.css';

export function Landing(): React.ReactElement {
  return (
    <div className={styles.wrap}>
      <div className={styles.page}>
        <div className={styles.grid}>
          <div>
            <h1 className={styles.name}>{LANDING_NAME}</h1>
            <hr className={styles.rule} />
            <ExperienceSection
              heading={SECTION_HEADINGS.currently}
              entries={CURRENTLY}
            />
            <ExperienceSection
              heading={SECTION_HEADINGS.previously}
              entries={PREVIOUSLY}
            />
            <section className={styles.section}>
              <h2 className={styles.h}>{SECTION_HEADINGS.projects}</h2>
              <div className={styles.rows}>
                {PROJECTS.map(project => (
                  <ProjectRow key={project.name} project={project} />
                ))}
              </div>
            </section>
            <ContactLinks />
          </div>
          <AsciiArt />
        </div>
      </div>
    </div>
  );
}
