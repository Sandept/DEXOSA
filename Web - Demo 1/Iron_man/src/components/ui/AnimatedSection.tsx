'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}

export function AnimatedSection({
  children,
  className = '',
  delayChildren = 0,
  staggerChildren = 0.1,
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={`opacity-0 animate-in section ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { staggerChildren, delayChildren } }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

export default AnimatedSection;