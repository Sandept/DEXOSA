'use client';

import React from 'react';

interface HudFrameProps {
  corner: 'tl' | 'tr' | 'bl' | 'br';
  size?: number;
  className?: string;
}

export function HudFrame({ corner, size = 26, className = '' }: HudFrameProps) {
  const paths = {
    tl: `M 2 ${size} L 2 2 L ${size} 2`,
    tr: `M ${size - 20} 2 L ${size} 2 L ${size} ${size}`,
    bl: `M 2 ${size - 20} L 2 ${size} L ${size} ${size}`,
    br: `M ${size - 20} ${size} L ${size} ${size} L ${size} ${size - 20}`,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
    >
      <path
        d={paths[corner]}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default HudFrame;
