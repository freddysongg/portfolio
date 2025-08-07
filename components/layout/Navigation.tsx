'use client';

import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PERSONAL_INFO } from '@/utils/constants';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Projects', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Link', href: '#contact' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='fixed right-8 top-8 z-50 hidden md:block'
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
            <Button variant='default' size='sm' asChild>
              <a
                href={PERSONAL_INFO.resumeLink}
                target='_blank'
                rel='noopener noreferrer'
              >
                Resume
              </a>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='fixed right-6 top-6 z-50 md:hidden'
      >
        <Button
          variant='outline'
          size='sm'
          onClick={() => setIsOpen(!isOpen)}
          className='bg-background/80 backdrop-blur-md'
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </motion.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-40 md:hidden'
          >
            <div className='flex h-full items-center justify-center bg-background/95 backdrop-blur-md'>
              <div className='space-y-8 text-center'>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className='block text-2xl font-medium text-foreground transition-colors hover:text-primary'
                    >
                      {item.name}
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className='pt-4'
                >
                  <Button variant='default' asChild>
                    <a
                      href={PERSONAL_INFO.resumeLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Download Resume
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
