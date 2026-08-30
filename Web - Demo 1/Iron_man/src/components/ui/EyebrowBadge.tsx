'use client';

import React, { ReactNode } from 'react';

interface EyebrowBadgeProps {
  children: ReactNode;
  className?: string;
}

export function EyebrowBadge({ children, className = '' }: EyebrowBadgeProps) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[#d4a22f] backdrop-blur-md sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.22em] ${className}`}
      style={{
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.06), 0 0 24px -8px rgba(212,162,47,0.25)',
      }}
    >
      <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
      <span className="truncate">{children}</span>
    </span>
  );
}

export default EyebrowBadge;
