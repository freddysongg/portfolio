/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';

import { Mail, Github, Linkedin } from 'lucide-react';

import { SlideIn } from '@/components/animations/SlideIn';
import { TextReveal } from '@/components/animations/TextReveal';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO } from '@/utils/constants';

export function Contact() {
  return (
    <section id='contact' className='bg-muted/30 py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-4xl text-center'>
          <TextReveal>
            <div className='mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground'>
              GET IN TOUCH
            </div>
          </TextReveal>

          <TextReveal delay={0.2}>
            <h2 className='mb-8 text-4xl font-bold text-foreground md:text-6xl'>
              Down To Build?
            </h2>
          </TextReveal>

          <SlideIn delay={0.4}>
            <p className='mb-12 text-xl leading-relaxed text-muted-foreground'>
              If you're looking to add some AI/ML intelligence to your project,
              let's connect. I'm always down to talk about building cool stuff.
            </p>
          </SlideIn>

          <SlideIn delay={0.6}>
            <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
              <Button size='lg' asChild>
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Let's Build Something Cool&body=Hi Freddy,%0D%0A%0D%0AI'd love to connect about...`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Mail size={20} className='mr-2' />
                  Send Email
                </a>
              </Button>

              <div className='flex gap-4'>
                <Button variant='outline' size='lg' asChild>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Linkedin size={20} className='mr-2' />
                    LinkedIn
                  </a>
                </Button>

                <Button variant='outline' size='lg' asChild>
                  <a
                    href={PERSONAL_INFO.github}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Github size={20} className='mr-2' />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
