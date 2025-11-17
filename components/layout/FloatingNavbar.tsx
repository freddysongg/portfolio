'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { PERSONAL_INFO } from '@/utils/constants';

const MENU_ITEMS = [
  { name: 'Projects', to: 'work' },
  { name: 'About', to: 'about' },
  { name: 'Experience', to: 'experience' },
  { name: 'Contact', to: 'contact' },
] as const;

export function FloatingNavbar() {
  const [activeLink, setActiveLink] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className='fixed left-0 right-0 top-6 z-50 flex justify-center'
    >
      <nav className='flex items-center gap-2 rounded-full border border-border bg-background/80 px-2 py-2 backdrop-blur-md'>
        {MENU_ITEMS.map(item => {
          const isActive = activeLink === item.to;

          return isActive ? (
            <LiquidButton key={item.name} variant='default' size='sm' asChild>
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                offset={-100}
                duration={800}
                onSetActive={() => setActiveLink(item.to)}
                className='cursor-pointer text-sm font-medium'
              >
                {item.name}
              </Link>
            </LiquidButton>
          ) : (
            <Link
              key={item.name}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-100}
              duration={800}
              onSetActive={() => setActiveLink(item.to)}
              className='cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
            >
              {item.name}
            </Link>
          );
        })}
        <div className='mx-1 h-6 w-px bg-border' />
        <LiquidButton variant='default' size='sm' asChild>
          <a
            href={PERSONAL_INFO.resumeLink}
            target='_blank'
            rel='noopener noreferrer'
          >
            Resume
          </a>
        </LiquidButton>
      </nav>
    </motion.div>
  );
}
