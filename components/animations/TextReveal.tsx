'use client';

import React from 'react';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function TextReveal({
  children,
  className,
  delay = 0,
}: TextRevealProps) {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  const variants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
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
      style={{ willChange: 'transform, opacity' }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
