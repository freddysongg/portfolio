'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Briefcase, User, Clock, Mail, FileText } from 'lucide-react';

import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { PERSONAL_INFO } from '@/utils/constants';

export function Navigation() {
  const menuItems = [
    { name: 'Projects', href: '#work', icon: Briefcase },
    { name: 'About', href: '#about', icon: User },
    { name: 'Experience', href: '#experience', icon: Clock },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='fixed right-8 top-8 z-50 hidden lg:block'
      >
        <div className='rounded-full border border-border bg-background/80 px-6 py-3 backdrop-blur-md'>
          <div className='flex items-center gap-6'>
            {menuItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                {item.name}
              </a>
            ))}
            <LiquidButton variant='default' size='sm' asChild>
              <a
                href={PERSONAL_INFO.resumeLink}
                target='_blank'
                rel='noopener noreferrer'
              >
                Resume
              </a>
            </LiquidButton>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Compact Icon View */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='fixed left-1/2 top-6 z-50 -translate-x-1/2 lg:hidden'
      >
        <div className='rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur-md'>
          <div className='flex items-center gap-4'>
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className='text-muted-foreground transition-colors hover:text-foreground'
                  aria-label={item.name}
                >
                  <Icon size={18} />
                </a>
              );
            })}
            <div className='h-4 w-px bg-border' />
            <a
              href={PERSONAL_INFO.resumeLink}
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground transition-colors hover:text-foreground'
              aria-label='Resume'
            >
              <FileText size={18} />
            </a>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
