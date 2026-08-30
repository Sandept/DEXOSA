'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { EyebrowBadge } from '@/components/ui/EyebrowBadge';
import { HudFrame } from '@/components/ui/HudFrame';

const TOTAL_FRAMES = 169;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const getFramePath = (idx: number) =>
  `${basePath}/frames2/frame_${String(idx).padStart(4, '0')}.jpg`;

interface RevealQuote {
  id: string;
  show: number;
  hide: number;
  label: string;
  quote: string;
  speaker: string;
  film: string;
}

const revealQuotes: RevealQuote[] = [
  {
    id: 'b1',
    show: 0.1,
    hide: 0.3,
    label: '01 — Genesis',
    quote: 'Every legend begins with a spark. Ours ignited the stars.',
    speaker: 'Tony Stark',
    film: 'ORIGIN ARCHIVE // CAVE PROTOCOL',
  },
  {
    id: 'b2',
    show: 0.35,
    hide: 0.55,
    label: '02 — Convergence',
    quote: 'When the machine and the mind become one, limits become obsolete.',
    speaker: 'Tony Stark',
    film: 'NEURAL LINK INTERFACE LOG',
  },
  {
    id: 'b3',
    show: 0.6,
    hide: 0.8,
    label: '03 — Eternity',
    quote: "A legacy isn't what you leave behind for people. It's what you build inside them.",
    speaker: 'Tony Stark',
    film: 'ENDGAME MEMORIAL // RECORD 3000',
  },
];

export function CinematicReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inevHeadingRef = useRef<HTMLHeadingElement>(null);
  const ironHeadingRef = useRef<HTMLHeadingElement>(null);
  const nextCtaRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLSpanElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isTickingRef = useRef(false);
  const isLoadedRef = useRef(false);
  const lastIndexRef = useRef(-1);
  const activeQuotesStrRef = useRef('');

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activeQuotes, setActiveQuotes] = useState<Set<string>>(new Set());

  // Preload frames progressively
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

  // Draw frame with aspect cover & responsive portrait centering
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

    // Mobile portrait: Center Tony's face and Infinity Gauntlet
    if (canvasAspect < 1) {
      drawW *= 1.2;
      drawH *= 1.2;

      const focalX = 0.50;
      offsetX = (canvasW / 2) - (drawW * focalX);
      if (offsetX > 0) offsetX = 0;
      if (offsetX + drawW < canvasW) offsetX = canvasW - drawW;

      const focalY = 0.38;
      offsetY = (canvasH * 0.45) - (drawH * focalY);
      if (offsetY > 0) offsetY = 0;
      if (offsetY + drawH < canvasH) offsetY = canvasH - drawH;
    } else {
      offsetX = (canvasW - drawW) / 2;
      offsetY = (canvasH - drawH) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // Handle Resize with DPR cap for mobile
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

        // Morphing Destiny -> Iron Man headline
        if (inevHeadingRef.current) {
          const opacity = Math.min(1, Math.max(0, (0.52 - progress) / 0.1));
          inevHeadingRef.current.style.opacity = String(opacity);
        }

        if (ironHeadingRef.current) {
          const opacity = Math.min(1, Math.max(0, (progress - 0.48) / 0.1));
          ironHeadingRef.current.style.opacity = String(opacity);
        }

        // Next CTA button fade in at bottom (progress >= 0.84)
        if (nextCtaRef.current) {
          const opacity = Math.min(1, Math.max(0, (progress - 0.84) / 0.08));
          nextCtaRef.current.style.opacity = String(opacity);
          nextCtaRef.current.style.transform = `translateY(${(1 - opacity) * 14}px)`;
        }

        // Progress bar scale
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progress})`;
        }

        // Frame number
        if (seqRef.current) {
          seqRef.current.textContent = `PULSE ${String(targetFrame + 1).padStart(3, '0')} / ${TOTAL_FRAMES}`;
        }

        // Active Quotes Calculation
        const currentSet = new Set<string>();
        for (const q of revealQuotes) {
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
    <section
      ref={sectionRef}
      id="cinematic"
      className="scroll-animation relative border-t border-white/5 bg-background"
    >
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

        {/* Radial Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 80%, transparent 20%, rgba(10,10,11,0.5) 60%, rgba(10,10,11,0.92) 100%)',
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

        {/* Top-Right Morphing Headline */}
        <div
          className="pointer-events-none absolute right-4 top-20 z-10 flex max-w-[85%] flex-col items-end gap-2.5 text-right sm:right-8 sm:top-24 sm:max-w-[70%] sm:gap-4 md:right-12 md:top-32 md:max-w-[46ch] md:gap-5"
          style={{ top: 'max(4.5rem, calc(env(safe-area-inset-top, 0px) + 3.5rem))' }}
        >
          <EyebrowBadge>OMEGA PROTOCOL // FINAL STAND</EyebrowBadge>
          <div className="relative self-stretch">
            <h2
              ref={inevHeadingRef}
              className="font-sans text-3xl font-semibold leading-[0.98] tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ transition: 'opacity 240ms ease-out' }}
            >
              Fate is<br />
              <span className="text-[#d4a22f]">Inescapable.</span>
            </h2>
            <h2
              ref={ironHeadingRef}
              className="absolute inset-0 font-sans text-3xl font-semibold leading-[0.98] tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ opacity: 0, transition: 'opacity 240ms ease-out' }}
            >
              And I am<br />
              <span className="text-[#d4a22f]">The Shield.</span>
            </h2>
          </div>
          <p className="max-w-[34ch] font-sans text-[11px] leading-relaxed text-zinc-400 sm:max-w-[40ch] sm:text-sm md:text-base">
            The cosmic singularities harnessed into nanotech. The decisive snap that protected humanity.
          </p>
        </div>

        {/* Top Telemetry Links */}
        <div
          className="pointer-events-none absolute left-4 top-14 z-10 flex items-center gap-2 sm:left-6 sm:top-18 md:left-10 md:top-24"
          style={{ top: 'max(3.5rem, calc(env(safe-area-inset-top, 0px) + 2.5rem))' }}
        >
          <div className="h-px w-4 bg-[#d4a22f]/60 sm:w-8" />
          <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-zinc-400 sm:text-[10px] sm:tracking-[0.32em]">
            Chronicle Matrix
          </span>
        </div>

        <div
          className="pointer-events-none absolute right-4 top-14 z-10 flex items-center gap-2 sm:right-6 sm:top-18 md:right-10 md:top-24 sm:gap-3"
          style={{ top: 'max(3.5rem, calc(env(safe-area-inset-top, 0px) + 2.5rem))' }}
        >
          <span ref={seqRef} className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#d4a22f] sm:text-[10px] sm:tracking-[0.28em]">
            PULSE 001 / {TOTAL_FRAMES}
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
            <span>CHRONO APEX // VALOR</span>
            <span className="hidden sm:inline">F.R.I.D.A.Y. // PLAYBACK</span>
            <span className="flex items-center gap-1 text-[#d4a22f]">
              Scroll <span className="animate-bounce">↓</span>
            </span>
          </div>
        </div>

        {/* Desktop Quote Cards (Left Side) */}
        {revealQuotes.map((q, idx) => {
          const isActive = activeQuotes.has(q.id);
          const posClass =
            idx === 0
              ? 'top-[24%] left-6 md:left-12'
              : idx === 1
              ? 'top-1/2 -translate-y-1/2 left-6 md:left-12'
              : 'bottom-24 left-6 md:bottom-28 md:left-12';

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
                <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#d4a22f] md:text-[10px] md:tracking-[0.3em]">
                  {q.label}
                </span>
                <blockquote className="mt-2.5 font-sans text-lg font-medium leading-snug tracking-tight text-foreground lg:text-xl">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-3.5 flex items-center justify-between">
                  <span className="font-sans text-xs text-zinc-300 md:text-sm">{q.speaker}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 md:text-[10px] md:tracking-[0.24em]">
                    {q.film}
                  </span>
                </figcaption>
              </figure>
            </div>
          );
        })}

        {/* Mobile Quote Cards */}
        <div className="pointer-events-none absolute inset-x-0 bottom-14 z-20 flex flex-col gap-2 px-4 md:hidden">
          {revealQuotes.map((q) => {
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
                <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#d4a22f]">
                  {q.label}
                </span>
                <blockquote className="mt-1 font-sans text-xs font-medium leading-snug text-foreground sm:text-sm">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-2 flex items-center justify-between border-t border-white/5 pt-1.5">
                  <span className="font-sans text-[10px] text-zinc-300">{q.speaker}</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-400">
                    {q.film}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Next Engage Action */}
        <div
          ref={nextCtaRef}
          className="pointer-events-none absolute bottom-18 right-4 z-20 flex flex-col items-end gap-2 sm:bottom-24 sm:right-6 md:bottom-32 md:right-12 md:gap-4"
          style={{
            opacity: 0,
            transition: 'opacity 80ms linear',
            bottom: 'max(4.5rem, calc(env(safe-area-inset-bottom, 0px) + 3.5rem))',
          }}
        >
          <span className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-[#d4a22f] sm:text-[10px] sm:tracking-[0.3em]">
            Telemetry Analysis
          </span>
          <a
            href="#systems"
            className="pointer-events-auto inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground shadow-lg backdrop-blur-xl transition-all duration-200 hover:bg-white/[0.15] active:scale-95 sm:px-5 sm:text-[11px] sm:tracking-[0.22em]"
          >
            <span>Access Telemetry</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        {/* Boot Overlay */}
        {!isReady && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-background px-6">
            <EyebrowBadge>CHRONO ARCHIVE // DECRYPTING</EyebrowBadge>
            <div className="h-px w-52 bg-white/10 sm:w-72 md:w-80">
              <div
                className="h-full bg-[#d4a22f] transition-[width] duration-150 ease-out"
                style={{ width: `${Math.round(100 * loadingProgress)}%` }}
              />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-[11px] sm:tracking-[0.28em]">
              Decrypting Infinity Matrix · {Math.round(100 * loadingProgress)}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CinematicReveal;
