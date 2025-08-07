/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';

import Image from 'next/image';

import { TextReveal } from '@/components/animations/TextReveal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
              FEATURED WORK
            </div>
          </TextReveal>

          <TextReveal delay={0.2}>
            <h2 className='mb-4 text-4xl font-bold text-foreground md:text-6xl'>
              What's UP
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
                    <Card className='group h-full overflow-hidden'>
                      <div className='relative aspect-video overflow-hidden bg-muted'>
                        <Image
                          src={
                            project.image ||
                            '/placeholder.svg?height=400&width=600&query=project showcase'
                          }
                          alt={project.title}
                          width={600}
                          height={400}
                          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                          priority={index < 2}
                        />
                        <div className='absolute inset-0 bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                      </div>

                      <div className='p-6'>
                        <div className='mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground'>
                          {project.category}
                        </div>
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
                            <Button variant='outline' size='sm' asChild>
                              <a
                                href={project.link}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <ExternalLink size={16} className='mr-2' />
                                Visit
                              </a>
                            </Button>
                          )}
                          {project.link && project.id != '1' && (
                            <Button variant='outline' size='sm' asChild>
                              <a
                                href={project.link}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <ExternalLink size={16} className='mr-2' />
                                Link
                              </a>
                            </Button>
                          )}
                          {project.github && (
                            <Button variant='ghost' size='sm' asChild>
                              <a
                                href={project.github}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <Github size={16} className='mr-2' />
                                Code
                              </a>
                            </Button>
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
                <Button
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
                </Button>
              ) : (
                <Button
                  variant='ghost'
                  size='lg'
                  onClick={handleViewLess}
                  className='group'
                >
                  <span>Show Less</span>
                  <ChevronDown
                    size={16}
                    className='ml-2 rotate-180 transition-transform group-hover:-translate-y-1'
                  />
                </Button>
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
