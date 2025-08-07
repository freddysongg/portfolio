/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { SlideIn } from '@/components/animations/SlideIn';
import { TextReveal } from '@/components/animations/TextReveal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PERSONAL_INFO } from '@/utils/constants';

export function Hero() {
  return (
    <section className='relative flex min-h-screen items-center bg-white py-20 dark:bg-black'>
      <div
        className={cn(
          'absolute bottom-0 right-0 top-0 w-[65%]',
          '[background-size:40px_40px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]'
        )}
      />
      <div className='pointer-events-none absolute bottom-0 right-0 top-0 flex w-[65%] items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black'></div>
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
                  Building what's next in AI and fullstack. I engineer
                  high-performance systems that deliver, whether it's spinning
                  up a RAG system to make search smarter or integrating an LLM
                  to power a conversation. No fluff, just solid code and real
                  results.
                </p>
              </SlideIn>

              <SlideIn delay={0.6}>
                <div className='flex flex-col gap-4 sm:flex-row'>
                  <Button size='lg' asChild>
                    <a href='#work'>Curious?</a>
                  </Button>
                  <Button variant='outline' size='lg' asChild>
                    <a
                      href={PERSONAL_INFO.resumeLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Download Resume
                    </a>
                  </Button>
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
    </section>
  );
}
