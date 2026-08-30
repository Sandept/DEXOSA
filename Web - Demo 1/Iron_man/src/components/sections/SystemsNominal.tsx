'use client';

import React from 'react';
import { EyebrowBadge } from '@/components/ui/EyebrowBadge';

const specs = [
  {
    label: 'Quantum Plating Purity',
    value: '99.98%',
    sub: 'Self-healing Vibranium-Titanium lattice',
  },
  {
    label: 'Arc Plasma Density',
    value: '4.85 GW/s',
    sub: 'Cold-fused quantum compression core',
  },
  {
    label: 'Vector Propulsion',
    value: 'Mach 9.4',
    sub: 'Atmospheric & deep-space micro-thrusters',
  },
  {
    label: 'Synaptic Uplink Latency',
    value: '0.004 ms',
    sub: 'J.A.R.V.I.S. neural-tactile bridge',
  },
];

export function SystemsNominal() {
  return (
    <section
      id="systems"
      className="relative z-20 border-t border-white/5 bg-background px-4 py-16 sm:px-6 sm:py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column Description */}
          <div className="flex flex-col items-start gap-4 sm:gap-6 lg:col-span-6">
            <EyebrowBadge>STARK ADVANCED DEFENSE // TACTICAL TELEMETRY</EyebrowBadge>
            <h2 className="font-sans text-3xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              “The apex armor for the{' '}
              <span className="text-[#d4a22f]">ultimate protection.</span>”
            </h2>
            <p className="max-w-[48ch] font-sans text-sm leading-relaxed text-zinc-400 sm:text-base">
              Forged with sub-atomic Vibranium weave, the Mark LXXXV converted cosmic-tier gamma flux into stabilized kinetic energy. Every telemetry metric below preserves the live diagnostic stream recorded during humanity&apos;s definitive hour.
            </p>
            <div className="pt-2">
              <a
                href="#footer"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-all duration-200 hover:bg-white/[0.1] active:scale-95 sm:px-6 sm:text-[11px] sm:tracking-[0.22em]"
              >
                Access Hall of Armor
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column Specs List */}
          <div className="flex flex-col justify-center divide-y divide-white/5 lg:col-span-6">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex flex-col justify-between gap-1.5 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:py-6 md:py-7"
              >
                <div className="flex flex-col gap-0.5 sm:gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4a22f] sm:text-[11px] sm:tracking-[0.28em]">
                    {s.label}
                  </span>
                  <span className="font-sans text-[11px] text-zinc-500 sm:text-xs">
                    {s.sub}
                  </span>
                </div>
                <span className="font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SystemsNominal;
