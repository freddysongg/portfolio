'use client';

import React from 'react';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
  delay?: number;
}

export function SlideIn({
  children,
  direction = 'up',
  className,
  delay = 0,
}: SlideInProps) {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
      y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={isVisible ? 'visible' : 'hidden'}
      initial='hidden'
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
