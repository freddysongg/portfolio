'use client';

import React, { useEffect, useRef, useState } from 'react';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

import type { Experience } from '@/data/experience';

interface YearGroup {
  year: number;
  experiences: Array<{
    experience: Experience;
    quarterOffset: number;
  }>;
}

interface YearTimelineProps {
  yearGroups: YearGroup[];
}

export const YearTimeline = ({ yearGroups }: YearTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 85%'],
  });

  const heightTransform = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, height]),
    { stiffness: 100, damping: 30, restDelta: 0.001 }
  );
  const opacityTransform = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [0, 1]),
    { stiffness: 100, damping: 30, restDelta: 0.001 }
  );

  return (
    <div
      className='relative w-full bg-background font-sans md:px-10'
      ref={containerRef}
    >
      <div ref={ref} className='relative mx-auto max-w-7xl pb-20'>
        {yearGroups.map(yearGroup => {
          const sortedExperiences = [...yearGroup.experiences].sort(
            (a, b) => a.quarterOffset - b.quarterOffset
          );

          return (
            <div
              key={yearGroup.year}
              className='flex justify-start pt-10 md:gap-10 md:pt-40'
            >
              <div className='sticky top-40 z-40 flex h-fit max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm'>
                <div className='absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-background md:left-3'>
                  <div className='h-4 w-4 rounded-full border border-border bg-muted p-2' />
                </div>
                <h3 className='pl-16 text-2xl font-bold text-muted-foreground md:pl-20 md:text-5xl'>
                  {yearGroup.year}
                </h3>
              </div>

              <div className='w-full space-y-32 pl-20 pr-4 md:space-y-40 md:pl-4'>
                {sortedExperiences.map(({ experience }) => (
                  <div key={experience.id} className='space-y-4'>
                    <div>
                      <h4 className='mb-2 text-2xl font-bold text-foreground md:text-3xl'>
                        {experience.position}
                      </h4>
                      <div className='mb-3 text-lg font-medium text-primary'>
                        {experience.company}
                      </div>
                    </div>

                    <p className='leading-relaxed text-muted-foreground'>
                      {experience.description}
                    </p>

                    <div className='flex flex-wrap gap-2'>
                      {experience.technologies.map(tech => (
                        <span
                          key={tech}
                          className='rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className='mt-4 space-y-3'>
                      {experience.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className='flex items-start text-sm text-muted-foreground'
                        >
                          <span className='mr-2 mt-1 text-primary'>•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div
          style={{
            height: height + 'px',
          }}
          className='absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8'
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              willChange: 'height, opacity',
            }}
            className='absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-primary from-[0%] via-primary/50 via-[10%] to-transparent'
          />
        </div>
      </div>
    </div>
  );
};
