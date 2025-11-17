/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { SlideIn } from '@/components/animations/SlideIn';
import { TextReveal } from '@/components/animations/TextReveal';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { PERSONAL_INFO } from '@/utils/constants';

export function Hero() {
  return (
    <AuroraBackground className='py-20'>
      <div className='container relative z-10 mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          <TextReveal>
            <div className='mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground'></div>
          </TextReveal>

          <TextReveal delay={0.2}>
            <h1 className='relative mb-8 text-6xl font-bold leading-none tracking-tight text-foreground md:text-8xl lg:text-9xl'>
              Freddy
              <br />
              Song
            </h1>
          </TextReveal>

          <div className='mt-16 grid gap-8 md:grid-cols-5'>
            <div className='md:col-span-3'>
              <SlideIn delay={0.4}>
                <p className='mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl'>
                  Building what's next in technology. I engineer
                  high-performance systems that deliver, whether it's spinning
                  up a dynamic agent to handle multi-intent workflows or
                  training a deep learning model to classify images for object
                  detection. No fluff, just solid code and real results.
                </p>
              </SlideIn>

              <SlideIn delay={0.6}>
                <div className='flex flex-col gap-4 sm:flex-row'>
                  <LiquidButton size='lg' asChild>
                    <a href='#work'>Curious?</a>
                  </LiquidButton>
                  <LiquidButton variant='outline' size='lg' asChild>
                    <a
                      href={PERSONAL_INFO.resumeLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Resume
                    </a>
                  </LiquidButton>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 transform'
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className='flex flex-col items-center gap-2 text-muted-foreground'
        >
          <div className='font-mono text-xs uppercase tracking-wider'>
            SCROLL
          </div>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </AuroraBackground>
  );
}
