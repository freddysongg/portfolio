'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Briefcase, User, Clock, Mail, FileText } from 'lucide-react';
import { Link } from 'react-scroll';

import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { PERSONAL_INFO } from '@/utils/constants';

const MENU_ITEMS = [
  { name: 'Projects', to: 'work', icon: Briefcase },
  { name: 'About', to: 'about', icon: User },
  { name: 'Experience', to: 'experience', icon: Clock },
  { name: 'Contact', to: 'contact', icon: Mail },
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
      <nav className='flex items-center gap-2 rounded-full border border-border bg-background/80 px-2 py-2 backdrop-blur-md sm:px-4'>
        {MENU_ITEMS.map(item => {
          const isActive = activeLink === item.to;
          const Icon = item.icon;

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
                <span className='hidden sm:block'>{item.name}</span>
                <span className='block sm:hidden'>
                  <Icon size={18} />
                </span>
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
              className='cursor-pointer rounded-full px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:px-4'
            >
              <span className='hidden sm:block'>{item.name}</span>
              <span className='block sm:hidden'>
                <Icon size={18} />
              </span>
            </Link>
          );
        })}
        <div className='mx-1 h-6 w-px bg-border' />
        <LiquidButton variant='default' size='sm' asChild>
          <a
            href={PERSONAL_INFO.resumeLink}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center'
          >
            <span className='hidden sm:block'>Resume</span>
            <span className='block sm:hidden'>
              <FileText size={18} />
            </span>
          </a>
        </LiquidButton>
      </nav>
    </motion.div>
  );
}
