'use client';

import React from 'react';

import { Mail, Github, Linkedin } from 'lucide-react';

import { SlideIn } from '@/components/animations/SlideIn';
import { TextReveal } from '@/components/animations/TextReveal';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { PERSONAL_INFO } from '@/utils/constants';

export function Contact() {
  return (
    <section id='contact' className='bg-muted/30 py-20'>
      <div className='container mx-auto px-6'>
        <div className='mx-auto max-w-4xl text-center'>
          <TextReveal>
            <div className='mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground'>
              GET IN TOUCH
            </div>
          </TextReveal>

          <TextReveal delay={0.2}>
            <h2 className='mb-8 text-4xl font-bold text-foreground md:text-6xl'>
              Love to connect with awesome people!
            </h2>
          </TextReveal>

          <SlideIn delay={0.6}>
            <div className='flex flex-col items-center justify-center gap-4 px-4 sm:px-0'>
              <LiquidButton
                size='lg'
                asChild
                className='w-full max-w-xs sm:w-auto'
              >
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Let's Build Something Cool&body=Hi Freddy,%0D%0A%0D%0AI'd love to connect about...`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Mail size={20} className='mr-2' />
                  Send Email
                </a>
              </LiquidButton>

              <div className='flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4'>
                <LiquidButton
                  variant='outline'
                  size='lg'
                  asChild
                  className='w-full sm:w-auto'
                >
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Linkedin size={20} className='mr-2' />
                    LinkedIn
                  </a>
                </LiquidButton>

                <LiquidButton
                  variant='outline'
                  size='lg'
                  asChild
                  className='w-full sm:w-auto'
                >
                  <a
                    href={PERSONAL_INFO.github}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Github size={20} className='mr-2' />
                    GitHub
                  </a>
                </LiquidButton>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
