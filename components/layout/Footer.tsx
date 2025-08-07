'use client';

import React from 'react';

import { motion } from 'framer-motion';

import Image from 'next/image';

export function Footer() {
  return (
    <footer className='relative overflow-hidden border-t border-border bg-background py-16'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='relative flex min-h-[120px] flex-col justify-center text-center'
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground'
            >
              Current Vibe
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className='text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl'
            >
              Wishing it was
              <br />
              snowboarding season
            </motion.h2>
          </motion.div>

          <motion.div
            className='pointer-events-none absolute top-1/2 -translate-y-1/2'
            animate={{
              x: ['-20vw', '90vw'],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <motion.div
              animate={{
                rotate: [0, -5, 5, -3, 3, 0],
                y: [0, -25, 15, -30, 20, -15, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className='h-16 w-16 md:h-20 md:w-20'
            >
              <Image
                src='/images/snowboarding.png'
                alt='Snowboarding across'
                width={80}
                height={80}
                className='h-full w-full object-contain'
                priority={false}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 md:flex-row'
          >
            <div className='font-mono text-xs text-muted-foreground'>
              © 2025 FREDDY SONG. ALL RIGHTS RESERVED.
            </div>
            <div className='font-mono text-xs text-muted-foreground'>
              BUILT WITH A TON OF CAFFEINE IN MY SYSTEM...
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
