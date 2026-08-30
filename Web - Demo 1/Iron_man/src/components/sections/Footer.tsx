'use client';

import React from 'react';

const suitList = [
  { name: 'Mark I', location: 'Kunar Province // Genesis' },
  { name: 'Mark III', location: 'Malibu Coast // Aerodynamic' },
  { name: 'Mark VII', location: 'Stark Tower // Rapid Transit' },
  { name: 'Mark XLIV', location: 'Veronica // Orbital Platform' },
  { name: 'Mark L', location: 'Titan // Bleeding Edge' },
  { name: 'Mark LXXXV', location: 'Memorial Hangar // Apex' },
];

export function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-white/5 bg-background px-4 py-12 sm:px-6 sm:py-14 md:px-10 md:py-16"
      style={{
        paddingBottom: 'max(3rem, calc(env(safe-area-inset-bottom, 0px) + 2rem))',
      }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 sm:gap-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          {/* Left info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground sm:text-[11px] sm:tracking-[0.32em]">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-[#d4a22f] shadow-[0_0_12px_rgba(212,162,47,0.9)] shrink-0"
              />
              STARK / ADVANCED SYSTEMS
            </div>
            <p className="max-w-[40ch] font-sans text-xs leading-relaxed text-zinc-400 sm:text-sm">
              © Stark Industries Defense &amp; Quantum Division — 10880 Malibu Point, CA. Dedicated to the vision and enduring legacy of Anthony Edward Stark.
            </p>
          </div>

          {/* Right Suit Navigation Grid */}
          <nav className="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-x-10 sm:gap-y-5 md:grid-cols-3">
            {suitList.map((suit) => (
              <a
                key={suit.name}
                href="#"
                className="group flex flex-col gap-1 p-1 -m-1 rounded-lg transition-colors hover:bg-white/[0.03] active:bg-white/[0.06]"
              >
                <span className="flex items-center gap-1 font-sans text-xs font-medium text-foreground transition-colors group-hover:text-[#d4a22f] sm:text-[13px]">
                  {suit.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    className="opacity-60 transition-opacity group-hover:opacity-100"
                  >
                    <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
                  </svg>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 sm:text-[10px] sm:tracking-[0.24em]">
                  {suit.location}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom meta row */}
        <div className="flex flex-col gap-2 border-t border-white/5 pt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500 sm:text-[10px] sm:tracking-[0.28em] md:flex-row md:items-center md:justify-between">
          <span>PROJECT INFINITY · MARK LXXXV · ONLINE</span>
          <span>PROOF THAT TONY STARK HAS A HEART · 3000</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
