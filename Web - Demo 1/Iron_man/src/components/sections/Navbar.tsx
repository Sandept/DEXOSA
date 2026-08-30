'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-black/75 backdrop-blur-2xl backdrop-saturate-150'
          : 'border-b border-transparent bg-gradient-to-b from-black/60 to-transparent'
      }`}
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground sm:text-[11px] sm:tracking-[0.32em]"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-[#d4a22f] shadow-[0_0_12px_rgba(212,162,47,0.9)] shrink-0"
          />
          <span className="hidden sm:inline">STARK / ADVANCED SYSTEMS</span>
          <span className="sm:hidden">STARK / SYSTEMS</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          <a
            href="#systems"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-foreground active:text-[#d4a22f]"
          >
            Telemetry
          </a>
          <a
            href="#footer"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-foreground active:text-[#d4a22f]"
          >
            Chronicles
          </a>
        </nav>

        {/* Action Button */}
        <a
          href="#systems"
          className="group inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-all duration-200 hover:bg-white/[0.12] active:scale-95 sm:min-h-[42px] sm:px-4 sm:text-[11px] sm:tracking-[0.22em]"
        >
          <span>HUD</span>
          <span className="hidden xs:inline">Sync</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:w-3.5 sm:h-3.5"
          >
            <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Navbar;
