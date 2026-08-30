'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Create Lenis instance optimized for desktop, tablet, and mobile iOS/Android
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    lenisRef.current = new Lenis({
      lerp: isTouch ? 0.15 : 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      infinite: false,
      smoothWheel: true,
      syncTouch: false,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenisRef.current?.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}