/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';

import { TextReveal } from '@/components/animations/TextReveal';
import { Card } from '@/components/ui/card';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { projects } from '@/data/projects';
import { ANIMATION_VARIANTS } from '@/utils/constants';

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const featuredProjects = projects.filter(project => project.featured);

  // Show 4 projects initially, then all when expanded
  const displayedProjects = showAll
    ? featuredProjects
    : featuredProjects.slice(0, 4);
  const hasMoreProjects = featuredProjects.length > 4;

  // Glassmorphism accent colors for each project - lighter pastel variants
  const accentColors = [
    {
      name: 'blue',
      rgb: '191, 219, 254',
    }, // Lighter baby blue
    {
      name: 'pink',
      rgb: '251, 207, 232',
    }, // Lighter pink
    {
      name: 'purple',
      rgb: '221, 214, 254',
    }, // Lighter lavender
    {
      name: 'emerald',
      rgb: '167, 243, 208',
    }, // Lighter mint
    {
      name: 'amber',
      rgb: '254, 240, 138',
    }, // Lighter peach
    {
      name: 'cyan',
      rgb: '207, 250, 254',
    }, // Lighter cyan
  ];

  // Dynamic layout function to create asymmetric patterns
  const getProjectLayout = (index: number, _total: number) => {
    const patterns = [
      // Pattern for different grid positions and sizes
      { colSpan: 'md:col-span-2 lg:col-span-2', marginTop: '' }, // Large card
      { colSpan: '', marginTop: 'lg:mt-8' }, // Regular card with offset
      { colSpan: '', marginTop: '' }, // Regular card
      { colSpan: 'md:col-span-2', marginTop: 'lg:mt-12' }, // Wide card with larger offset
      { colSpan: '', marginTop: 'lg:mt-4' }, // Regular card with small offset
      { colSpan: '', marginTop: 'lg:mt-16' }, // Regular card with large offset
    ];

    return patterns[index % patterns.length];
  };

  const handleViewMore = () => {
    setShowAll(true);
  };

  const handleViewLess = () => {
    setShowAll(false);
    // Smooth scroll to projects section
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id='work' className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          <TextReveal>
            <div className='mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground'>
              PROJECTS
            </div>
          </TextReveal>

          <TextReveal delay={0.2}>
            <h2 className='mb-4 text-4xl font-bold text-foreground md:text-6xl'>
              What I've Built
            </h2>
          </TextReveal>

          <TextReveal delay={0.3}>
            <p className='mb-16 text-lg text-muted-foreground'>
              Showcasing {featuredProjects.length} featured projects that
              demonstrate the intersection of fullstack development and AI/ML
              innovation.
            </p>
          </TextReveal>

          <motion.div
            variants={ANIMATION_VARIANTS.staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='grid auto-rows-max gap-8 md:grid-cols-2 lg:grid-cols-3'
          >
            <AnimatePresence mode='popLayout'>
              {displayedProjects.map((project, index) => {
                const layout = getProjectLayout(
                  index,
                  displayedProjects.length
                );

                const colors = accentColors[index % accentColors.length];

                return (
                  <motion.div
                    key={project.id}
                    variants={ANIMATION_VARIANTS.slideUp}
                    initial={showAll && index >= 4 ? 'hidden' : false}
                    animate='visible'
                    exit='hidden'
                    layout
                    className={`${layout.colSpan} ${layout.marginTop}`}
                  >
                    <Card className='group h-full overflow-hidden border-0 bg-transparent'>
                      <div
                        className='relative aspect-video overflow-hidden rounded-t-xl'
                        style={{
                          background: `rgba(${colors.rgb}, 0.15)`,
                          backdropFilter: 'blur(14px)',
                          WebkitBackdropFilter: 'blur(14px)',
                          border: `1px solid rgba(${colors.rgb}, 0.3)`,
                          boxShadow: `
                            0 8px 32px rgba(0, 0, 0, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5),
                            inset 0 -1px 0 rgba(255, 255, 255, 0.1)
                          `,
                          transition: 'all 0.5s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.boxShadow = `
                            0 8px 32px rgba(${colors.rgb}, 0.3),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5),
                            inset 0 -1px 0 rgba(255, 255, 255, 0.1)
                          `;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.boxShadow = `
                            0 8px 32px rgba(0, 0, 0, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5),
                            inset 0 -1px 0 rgba(255, 255, 255, 0.1)
                          `;
                        }}
                      >
                        {/* Top edge highlight */}
                        <div
                          className='absolute left-0 right-0 top-0 h-px'
                          style={{
                            background: `linear-gradient(
                              90deg,
                              transparent,
                              rgba(255, 255, 255, 0.8),
                              transparent
                            )`,
                          }}
                        />

                        {/* Left edge highlight */}
                        <div
                          className='absolute left-0 top-0 h-full w-px'
                          style={{
                            background: `linear-gradient(
                              180deg,
                              rgba(255, 255, 255, 0.8),
                              transparent,
                              rgba(255, 255, 255, 0.3)
                            )`,
                          }}
                        />

                        <div className='relative h-full p-8'>
                          {/* Abstract geometric shapes */}
                          <div className='absolute inset-0 overflow-hidden'>
                            {/* Animated gradient orbs */}
                            <div
                              className='absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl transition-all duration-700 group-hover:scale-125'
                              style={{
                                background: `radial-gradient(circle, rgba(${colors.rgb}, 0.6), transparent)`,
                              }}
                            />
                            <div
                              className='absolute -bottom-4 -left-4 h-24 w-24 rounded-full opacity-30 blur-xl transition-all duration-700 group-hover:scale-110'
                              style={{
                                background: `radial-gradient(circle, rgba(${colors.rgb}, 0.5), transparent)`,
                              }}
                            />

                            {/* Abstract lines */}
                            <svg
                              className='absolute bottom-0 left-0 h-full w-full opacity-20'
                              viewBox='0 0 200 200'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d={`M0,100 Q50,${50 + index * 10} 100,100 T200,100`}
                                fill='none'
                                stroke={`rgba(${colors.rgb}, 0.4)`}
                                strokeWidth='2'
                                className='transition-all duration-700 group-hover:opacity-60'
                              />
                              <circle
                                cx={150 - index * 10}
                                cy={50 + index * 15}
                                r='3'
                                fill={`rgba(${colors.rgb}, 0.6)`}
                                className='group-hover:r-5 transition-all duration-700'
                              />
                              <circle
                                cx={50 + index * 15}
                                cy={150 - index * 10}
                                r='2'
                                fill={`rgba(${colors.rgb}, 0.5)`}
                              />
                            </svg>

                            {/* Floating particles */}
                            <div
                              className='absolute right-12 top-12 h-1 w-1 rounded-full opacity-60'
                              style={{
                                background: `rgba(${colors.rgb}, 0.8)`,
                                boxShadow: `0 0 10px rgba(${colors.rgb}, 0.6)`,
                              }}
                            />
                            <div
                              className='absolute bottom-16 left-16 h-1.5 w-1.5 rounded-full opacity-50'
                              style={{
                                background: `rgba(${colors.rgb}, 0.7)`,
                                boxShadow: `0 0 8px rgba(${colors.rgb}, 0.5)`,
                              }}
                            />
                          </div>

                          {/* Small category badge */}
                          <div className='relative z-10'>
                            <div
                              className='inline-block rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider backdrop-blur-sm'
                              style={{
                                background: `rgba(${colors.rgb}, 0.2)`,
                                border: `1px solid rgba(${colors.rgb}, 0.3)`,
                              }}
                            >
                              {project.category}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='bg-background/95 p-6 backdrop-blur-sm'>
                        <h3 className='mb-3 text-xl font-bold text-foreground'>
                          {project.title}
                        </h3>
                        <p className='mb-4 leading-relaxed text-muted-foreground'>
                          {project.description}
                        </p>

                        <div className='mb-6 flex flex-wrap gap-2'>
                          {project.tags.map(tag => (
                            <span
                              key={tag}
                              className='rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground'
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className='flex gap-3'>
                          {project.link && project.id == '1' && (
                            <LiquidButton variant='outline' size='sm' asChild>
                              <a
                                href={project.link}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <ExternalLink size={16} />
                                Visit
                              </a>
                            </LiquidButton>
                          )}
                          {project.link && project.id != '1' && (
                            <LiquidButton variant='outline' size='sm' asChild>
                              <a
                                href={project.link}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <ExternalLink size={16} />
                                Link
                              </a>
                            </LiquidButton>
                          )}
                          {project.github && (
                            <LiquidButton variant='outline' size='sm' asChild>
                              <a
                                href={project.github}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <Github size={16} />
                                Code
                              </a>
                            </LiquidButton>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* View More/Less Button */}
          {hasMoreProjects && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className='mt-16 text-center'
            >
              {!showAll ? (
                <LiquidButton
                  variant='outline'
                  size='lg'
                  onClick={handleViewMore}
                  className='group'
                >
                  <span>View More Projects</span>
                  <span className='ml-2 text-muted-foreground'>
                    ({featuredProjects.length - 4} more)
                  </span>
                  <ChevronDown
                    size={16}
                    className='ml-2 transition-transform group-hover:translate-y-1'
                  />
                </LiquidButton>
              ) : (
                <LiquidButton
                  variant='outline'
                  size='lg'
                  onClick={handleViewLess}
                  className='group'
                >
                  <span>Show Less</span>
                  <ChevronDown
                    size={16}
                    className='ml-2 rotate-180 transition-transform group-hover:-translate-y-1'
                  />
                </LiquidButton>
              )}
            </motion.div>
          )}

          {/* All Projects Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className='mt-8 text-center'
          >
            <div className='font-mono text-xs uppercase tracking-wider text-muted-foreground'>
              {showAll ? 'Showing all' : 'Showing 4 of'}{' '}
              {featuredProjects.length} featured projects
              {projects.length > featuredProjects.length && (
                <span className='ml-2'>• {projects.length} total projects</span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
