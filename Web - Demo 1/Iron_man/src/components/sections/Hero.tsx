'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { EyebrowBadge } from '@/components/ui/EyebrowBadge';
import { HudFrame } from '@/components/ui/HudFrame';

const TOTAL_FRAMES = 169;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const getFramePath = (idx: number) =>
  `${basePath}/frames/frame_${String(idx).padStart(4, '0')}.jpg`;

interface QuoteItem {
  id: string;
  show: number;
  hide: number;
  quote: string;
  speaker: string;
  film: string;
}

const quotes: QuoteItem[] = [
  {
    id: 'd1',
    show: 0.1,
    hide: 0.3,
    quote: 'Heroes are not born in comfort. They are forged in the fires of crisis.',
    speaker: 'Tony Stark',
    film: 'STARK DEFENSE ARCHIVE — 2008',
  },
  {
    id: 'd2',
    show: 0.35,
    hide: 0.55,
    quote: 'We do not build armor to hide our humanity; we build it to shield the cosmos.',
    speaker: 'Tony Stark',
    film: 'AVENGERS TACTICAL DISPATCH — 2012',
  },
  {
    id: 'd3',
    show: 0.6,
    hide: 0.8,
    quote: "True greatness is measured not by surviving the battle, but by what you sacrifice to end it.",
    speaker: 'Tony Stark',
    film: 'FINAL LOG ENTRY // CLASSIFIED',
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leftBlockRef = useRef<HTMLDivElement>(null);
  const secondBlockRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLSpanElement>(null);
  const seqRef = useRef<HTMLSpanElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isTickingRef = useRef(false);
  const isLoadedRef = useRef(false);
  const lastIndexRef = useRef(-1);
  const activeQuotesStrRef = useRef('');

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activeQuotes, setActiveQuotes] = useState<Set<string>>(new Set());

  // Preload frames progressively (mobile-optimized)
  useEffect(() => {
    let isCancelled = false;
    let loaded = 0;
    const list: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      img.onload = () => {
        if (isCancelled) return;
        loaded++;
        setLoadingProgress(loaded / TOTAL_FRAMES);
        if (loaded >= Math.min(15, TOTAL_FRAMES)) {
          setIsReady(true);
          isLoadedRef.current = true;
        }
      };

      img.onerror = () => {
        if (isCancelled) return;
        loaded++;
        setLoadingProgress(loaded / TOTAL_FRAMES);
        if (loaded >= Math.min(15, TOTAL_FRAMES)) {
          setIsReady(true);
          isLoadedRef.current = true;
        }
      };

      list.push(img);
    }

    imagesRef.current = list;
    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw frame with precision focal-point centering on mobile portrait
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvasW / canvasH;

    let drawW: number;
    let drawH: number;

    if (canvasAspect > imgAspect) {
      drawW = canvasW;
      drawH = canvasW / imgAspect;
    } else {
      drawH = canvasH;
      drawW = canvasH * imgAspect;
    }

    let offsetX: number;
    let offsetY: number;

    // Mobile / vertical screens: Iron Man helmet is at ~30% from the left of the landscape frame
    if (canvasAspect < 1) {
      // Scale slightly to make the helmet fill nicely
      drawW *= 1.2;
      drawH *= 1.2;

      // Center horizontally on the helmet/face (focalX ~ 0.32)
      const focalX = 0.32;
      offsetX = (canvasW / 2) - (drawW * focalX);

      // Keep within bounds
      if (offsetX > 0) offsetX = 0;
      if (offsetX + drawW < canvasW) offsetX = canvasW - drawW;

      // Position vertically slightly above center (focalY ~ 0.35)
      const focalY = 0.35;
      offsetY = (canvasH * 0.42) - (drawH * focalY);
      if (offsetY > 0) offsetY = 0;
      if (offsetY + drawH < canvasH) offsetY = canvasH - drawH;
    } else {
      offsetX = (canvasW - drawW) / 2;
      offsetY = (canvasH - drawH) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // Handle Resize with DPR cap
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    drawFrame(lastIndexRef.current >= 0 ? lastIndexRef.current : 0);
  }, [drawFrame]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [handleResize]);

  // Initial draw
  useEffect(() => {
    if (isReady) {
      drawFrame(0);
      lastIndexRef.current = 0;
    }
  }, [isReady, drawFrame]);

  // Scroll sync loop
  useEffect(() => {
    const handleScroll = () => {
      if (isTickingRef.current) return;
      isTickingRef.current = true;

      requestAnimationFrame(() => {
        isTickingRef.current = false;
        const section = sectionRef.current;
        if (!section || !isLoadedRef.current) return;

        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress =
          scrollable <= 0
            ? 0
            : Math.min(1, Math.max(0, -rect.top / scrollable));

        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(TOTAL_FRAMES * progress)
        );

        if (targetFrame !== lastIndexRef.current) {
          lastIndexRef.current = targetFrame;
          drawFrame(targetFrame);
        }

        // Hero text fade out
        if (leftBlockRef.current) {
          const opacity = Math.max(0, 1 - progress / 0.08);
          leftBlockRef.current.style.opacity = String(opacity);
          leftBlockRef.current.style.transform = `translateY(${(1 - opacity) * 12}px)`;
        }

        // Second block fade in
        if (secondBlockRef.current) {
          const opacity = Math.min(1, Math.max(0, (progress - 0.1) / 0.08));
          secondBlockRef.current.style.opacity = String(opacity);
          secondBlockRef.current.style.transform = `translateY(${(1 - opacity) * 14}px)`;
        }

        // Progress bar scale
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progress})`;
        }

        // Arc reactor readout
        if (arcRef.current) {
          const arcVal = 94.2 + 5.6 * Math.sin(progress * Math.PI * 2);
          arcRef.current.textContent = `${arcVal.toFixed(1)}%`;
        }

        // Frame number
        if (seqRef.current) {
          seqRef.current.textContent = `CHRONO ${String(targetFrame + 1).padStart(3, '0')} / ${TOTAL_FRAMES}`;
        }

        // Active Quotes Calculation
        const currentSet = new Set<string>();
        for (const q of quotes) {
          if (progress >= q.show && progress <= q.hide) {
            currentSet.add(q.id);
          }
        }
        const activeStr = [...currentSet].sort().join(',');
        if (activeStr !== activeQuotesStrRef.current) {
          activeQuotesStrRef.current = activeStr;
          setActiveQuotes(currentSet);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [drawFrame]);

  return (
    <section ref={sectionRef} className="scroll-animation relative">
      <div
        className="sticky top-0 h-[100vh] h-[100dvh] w-full overflow-hidden bg-background"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ willChange: 'contents', transform: 'translateZ(0)' }}
        />

        {/* Radial Dark Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 20%, transparent 20%, rgba(10,10,11,0.5) 60%, rgba(10,10,11,0.92) 100%)',
          }}
        />

        {/* 4 Corner HUD Frames */}
        <div className="pointer-events-none absolute left-4 top-16 text-[#d4a22f] sm:left-6 sm:top-20 md:left-10 md:top-28">
          <HudFrame corner="tl" size={18} className="sm:h-6 sm:w-6" />
        </div>
        <div className="pointer-events-none absolute right-4 top-16 text-[#d4a22f] sm:right-6 sm:top-20 md:right-10 md:top-28">
          <HudFrame corner="tr" size={18} className="sm:h-6 sm:w-6" />
        </div>
        <div className="pointer-events-none absolute bottom-14 left-4 text-[#d4a22f] sm:bottom-16 sm:left-6 md:left-10">
          <HudFrame corner="bl" size={18} className="sm:h-6 sm:w-6" />
        </div>
        <div className="pointer-events-none absolute bottom-14 right-4 text-[#d4a22f] sm:bottom-16 sm:right-6 md:right-10">
          <HudFrame corner="br" size={18} className="sm:h-6 sm:w-6" />
        </div>

        {/* Hero Left Content */}
        <div
          ref={leftBlockRef}
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-2.5 px-5 pb-16 sm:gap-4 sm:px-8 sm:pb-24 md:gap-5 md:px-12 md:pb-28"
          style={{
            transition: 'opacity 80ms linear',
            paddingBottom: 'max(4.5rem, calc(env(safe-area-inset-bottom, 0px) + 3.75rem))',
          }}
        >
          <EyebrowBadge>MARK LXXXV // APEX DEFENSE // ONLINE</EyebrowBadge>
          <h1 className="max-w-[14ch] font-sans text-3xl font-semibold leading-[0.95] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            I am<br />
            <span className="text-[#d4a22f]">Iron man.</span>
          </h1>
          <p className="max-w-[34ch] font-sans text-[11px] leading-relaxed text-zinc-400 sm:max-w-[42ch] sm:text-sm md:text-base">
            Quantum-stabilized nanoparticle chassis. Scroll to calibrate neural sync — J.A.R.V.I.S. is standing by.
          </p>
        </div>

        {/* Second Message (Visible on Scroll) */}
        <div
          ref={secondBlockRef}
          className="pointer-events-none absolute bottom-20 left-5 z-10 hidden max-w-[85%] flex-col gap-3 sm:left-8 sm:max-w-[70%] sm:gap-4 md:flex md:bottom-28 md:left-12 md:max-w-[58%] md:gap-5"
          style={{ opacity: 0, transition: 'opacity 80ms linear' }}
        >
          <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.26em] text-[#d4a22f] sm:text-[10px] sm:tracking-[0.3em]">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)]"
            />
            Tactical Protocol — Alpha 85
          </span>
          <h2 className="font-sans font-semibold leading-[0.88] tracking-tighter text-foreground text-[clamp(2.5rem,7.5vw,9rem)]">
            Armor<br />
            of <span className="text-[#d4a22f]">Legends</span>
          </h2>
          <p className="max-w-[36ch] font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 sm:text-[11px] sm:tracking-[0.22em]">
            Engineered beyond human limits. Powered by pure cosmic resolve.
          </p>
        </div>

        {/* Telemetry Top Bar */}
        <div
          className="pointer-events-none absolute left-4 top-14 z-10 flex items-center gap-2 sm:left-6 sm:top-18 md:left-10 md:top-24"
          style={{ top: 'max(3.5rem, calc(env(safe-area-inset-top, 0px) + 2.5rem))' }}
        >
          <div className="h-px w-4 bg-[#d4a22f]/60 sm:w-8" />
          <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-zinc-400 sm:text-[10px] sm:tracking-[0.32em]">
            Quantum Uplink
          </span>
        </div>

        <div
          className="pointer-events-none absolute right-4 top-14 z-10 flex items-center gap-2 sm:right-6 sm:top-18 md:right-10 md:top-24 sm:gap-3"
          style={{ top: 'max(3.5rem, calc(env(safe-area-inset-top, 0px) + 2.5rem))' }}
        >
          <span ref={arcRef} className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#d4a22f] sm:text-[10px] sm:tracking-[0.22em]">
            94.2%
          </span>
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)]"
          />
        </div>

        {/* Bottom Telemetry Bar */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="mx-4 mb-2 h-px bg-white/10 sm:mx-6 sm:mb-3 md:mx-10">
            <div
              ref={progressBarRef}
              className="h-full origin-left bg-[#d4a22f]"
              style={{ transform: 'scaleX(0)', transition: 'transform 80ms linear' }}
            />
          </div>
          <div className="mx-4 flex items-center justify-between pb-3 font-mono text-[8.5px] uppercase tracking-[0.2em] text-zinc-500 sm:mx-6 sm:pb-4 sm:text-[10px] sm:tracking-[0.28em] md:mx-10">
            <span ref={seqRef}>CHRONO 001 / {TOTAL_FRAMES}</span>
            <span className="hidden sm:inline">J.A.R.V.I.S. // CALIBRATION MATRIX</span>
            <span className="flex items-center gap-1 text-[#d4a22f]">
              Scroll <span className="animate-bounce">↓</span>
            </span>
          </div>
        </div>

        {/* Desktop & Tablet Quote Cards */}
        {quotes.map((q) => {
          const isActive = activeQuotes.has(q.id);
          const posClass =
            q.id === 'd1'
              ? 'top-[22%] right-6 md:right-12'
              : q.id === 'd2'
              ? 'top-1/2 -translate-y-1/2 right-6 md:right-12'
              : 'bottom-24 right-6 md:bottom-28 md:right-12';

          return (
            <div
              key={q.id}
              className={`pointer-events-none absolute ${posClass} z-20 hidden w-[380px] max-w-[45vw] md:block lg:w-[420px]`}
            >
              <figure
                className={`card-surface pointer-events-auto p-5 transition-all duration-400 ease-out md:p-6 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
              >
                <blockquote className="font-sans text-lg font-medium leading-snug tracking-tight text-foreground lg:text-xl">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-3.5 flex items-center justify-between">
                  <span className="font-sans text-xs text-zinc-300 md:text-sm">{q.speaker}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#d4a22f] md:text-[10px] md:tracking-[0.24em]">
                    {q.film}
                  </span>
                </figcaption>
              </figure>
            </div>
          );
        })}

        {/* Mobile Floating Quote Banner */}
        <div className="pointer-events-none absolute inset-x-0 bottom-14 z-20 flex flex-col gap-2 px-4 md:hidden">
          {quotes.map((q) => {
            const isActive = activeQuotes.has(q.id);
            return (
              <figure
                key={q.id}
                className={`card-surface pointer-events-auto p-3.5 transition-all duration-400 ease-out ${
                  isActive
                    ? 'translate-y-0 opacity-100 pointer-events-auto'
                    : 'pointer-events-none absolute translate-y-3 opacity-0'
                }`}
              >
                <blockquote className="font-sans text-xs font-medium leading-snug text-foreground sm:text-sm">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-2 flex items-center justify-between border-t border-white/5 pt-1.5">
                  <span className="font-sans text-[10px] text-zinc-300">{q.speaker}</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#d4a22f]">
                    {q.film}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Loading Screen */}
        {!isReady && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-background px-6">
            <EyebrowBadge>QUANTUM MATRIX // INITIALIZING</EyebrowBadge>
            <div className="h-px w-52 bg-white/10 sm:w-72 md:w-80">
              <div
                className="h-full bg-[#d4a22f] transition-[width] duration-150 ease-out"
                style={{ width: `${Math.round(100 * loadingProgress)}%` }}
              />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-[11px] sm:tracking-[0.28em]">
              Synthesizing Mark LXXXV · {Math.round(100 * loadingProgress)}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;