'use client';

import React, { useMemo } from 'react';

import { TextReveal } from '@/components/animations/TextReveal';
import { YearTimeline } from '@/components/ui/year-timeline';
import { experiences, type Experience } from '@/data/experience';

interface YearGroup {
  year: number;
  experiences: Array<{
    experience: Experience;
    quarterOffset: number;
  }>;
}

function parseStartDate(duration: string): { year: number; month: number } {
  const monthMap: Record<string, number> = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUN: 6,
    JUL: 7,
    AUG: 8,
    SEP: 9,
    SEPT: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12,
  };

  const parts = duration.split(' - ')[0].split(' ');
  const monthStr = parts[0].toUpperCase();
  const yearStr = parts[1];

  return {
    month: monthMap[monthStr] || 1,
    year: parseInt(yearStr, 10),
  };
}

function getQuarterOffset(month: number): number {
  if (month >= 1 && month <= 3) return 75;
  if (month >= 4 && month <= 6) return 50;
  if (month >= 7 && month <= 9) return 25;
  return 0;
}

export function Experience() {
  const yearGroups: YearGroup[] = useMemo(() => {
    const grouped = new Map<number, YearGroup>();

    experiences.forEach(experience => {
      const { year, month } = parseStartDate(experience.duration);
      const quarterOffset = getQuarterOffset(month);

      if (!grouped.has(year)) {
        grouped.set(year, { year, experiences: [] });
      }

      grouped.get(year)!.experiences.push({
        experience,
        quarterOffset,
      });
    });

    return Array.from(grouped.values()).sort((a, b) => b.year - a.year);
  }, []);

  return (
    <section id='experience' className='py-20'>
      <div className='container mx-auto px-6'>
        <div className='mx-auto max-w-7xl'>
          <TextReveal>
            <div className='mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground'>
              EXPERIENCE
            </div>
          </TextReveal>

          <TextReveal delay={0.2}>
            <h2 className='mb-4 text-4xl font-bold text-foreground md:text-5xl'>
              Professional Journey
            </h2>
          </TextReveal>

          <TextReveal delay={0.3}>
            <p className='mb-16 max-w-2xl text-base text-muted-foreground md:text-lg'>
              A timeline of my professional experiences, from research to
              production engineering.
            </p>
          </TextReveal>

          <YearTimeline yearGroups={yearGroups} />
        </div>
      </div>
    </section>
  );
}
