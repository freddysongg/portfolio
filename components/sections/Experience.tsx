'use client';

import React from 'react';

import { SlideIn } from '@/components/animations/SlideIn';
import { TextReveal } from '@/components/animations/TextReveal';
import { experiences } from '@/data/experience';

export function Experience() {
  return (
    <section id='experience' className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-4xl'>
          <TextReveal>
            <div className='mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground'>
              EXPERIENCE
            </div>
          </TextReveal>

          <TextReveal delay={0.2}>
            <h2 className='mb-16 text-4xl font-bold text-foreground md:text-5xl'>
              Professional Journey
            </h2>
          </TextReveal>

          <div className='space-y-12'>
            {experiences.map((experience, index) => (
              <SlideIn key={experience.id} delay={0.3 + index * 0.1}>
                <div className='relative border-l-2 border-primary/20 pl-8'>
                  <div className='absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary'></div>

                  <div className='grid gap-6 md:grid-cols-3'>
                    <div>
                      <h3 className='mb-2 text-xl font-bold text-foreground'>
                        {experience.position}
                      </h3>
                      <div className='mb-2 font-medium text-primary'>
                        {experience.company}
                      </div>
                      <div className='font-mono text-sm text-muted-foreground'>
                        {experience.duration}
                      </div>
                    </div>

                    <div className='md:col-span-2'>
                      <p className='mb-4 leading-relaxed text-muted-foreground'>
                        {experience.description}
                      </p>

                      <div className='mb-4 flex flex-wrap gap-2'>
                        {experience.technologies.map(tech => (
                          <span
                            key={tech}
                            className='rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground'
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <ul className='space-y-2'>
                        {experience.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className='flex items-start text-sm text-muted-foreground'
                          >
                            <span className='mr-2 text-primary'>•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
