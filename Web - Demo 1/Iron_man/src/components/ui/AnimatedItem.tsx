'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedItem({
  children,
  className = '',
  delay = 0,
}: AnimatedItemProps) {
  return (
    <motion.div
      className={`${className} animate-item`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedItem;