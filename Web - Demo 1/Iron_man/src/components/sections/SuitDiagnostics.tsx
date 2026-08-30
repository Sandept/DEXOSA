'use client';

import React, { useState } from 'react';
import { useSound } from '@/components/providers/SoundProvider';

interface Subsystem {
  id: string;
  name: string;
  code: string;
  category: 'OFFENSIVE' | 'DEFENSIVE' | 'PROPULSION' | 'COMPUTING';
  powerDraw: string;
  status: string;
  description: string;
  specs: { label: string; value: string }[];
}

const subsystems: Subsystem[] = [
  {
    id: 'nanotech',
    name: 'Nanoparticle Matrix Plating',
    code: 'STARK-NANO-85',
    category: 'DEFENSIVE',
    powerDraw: '140 MW',
    status: 'OPTIMAL (100%)',
    description: 'Direct cellular-level nanite manipulation allowing instant weapon synthesis, self-repair, and aerodynamic morphing in less than 40 milliseconds.',
    specs: [
      { label: 'Tensile Strength', value: '185 GPa' },
      { label: 'Reconfiguration Speed', value: '0.038s' },
      { label: 'Regeneration Rate', value: '45,000 nanites/sec' },
      { label: 'Thermal Resistance', value: '10,000°C' },
    ],
  },
  {
    id: 'lightning',
    name: 'Nano-Lightning Refocuser',
    code: 'MK-85-NLR',
    category: 'OFFENSIVE',
    powerDraw: '850 MW',
    status: 'CHARGED (READY)',
    description: 'Back-mounted aerodynamic dorsal petals that channel ambient lightning and Thor-level electrical discharge directly into focused particle beams.',
    specs: [
      { label: 'Energy Multiplier', value: '8.4x Input' },
      { label: 'Beam Range', value: '4.8 Kilometers' },
      { label: 'Convergence Time', value: '0.12s' },
      { label: 'Discharge Potential', value: '1.2 Trillion Volts' },
    ],
  },
  {
    id: 'unibeam',
    name: 'Chest Unibeam Emitter',
    code: 'ARC-CORE-LXXXV',
    category: 'OFFENSIVE',
    powerDraw: '1.21 GW',
    status: 'STANDBY',
    description: 'Direct full-power plasma discharge routed straight from the central Arc Reactor. Capable of disintegrating bunker structures and slicing starship hulls.',
    specs: [
      { label: 'Core Temp', value: '15,000,000 K' },
      { label: 'Blast Radius', value: '350 Meters' },
      { label: 'Pulse Frequency', value: '120 THz' },
      { label: 'Armor Penetration', value: 'Class 10 Heavy' },
    ],
  },
  {
    id: 'thrusters',
    name: 'Micro-Repulsor Thrusters',
    code: 'AERO-THRUST-V8',
    category: 'PROPULSION',
    powerDraw: '320 MW',
    status: 'CRUISING',
    description: 'Hypersonic vector-thrust repulsor nodes located in the boots, palms, and stabilizing winglets for seamless sub-orbital and deep-space flight.',
    specs: [
      { label: 'Max Speed', value: 'Mach 8.5 (10,500 km/h)' },
      { label: 'Atmospheric Ceiling', value: 'Deep Space Orbital' },
      { label: 'G-Force Dampener', value: 'Up to 90G' },
      { label: 'Flight Stability', value: 'Active AI Vectored' },
    ],
  },
  {
    id: 'shield',
    name: 'Holographic Energy Shield',
    code: 'HOLO-DEF-SHIELD',
    category: 'DEFENSIVE',
    powerDraw: '450 MW',
    status: 'ACTIVE',
    description: 'Solid-light and nanite composite barrier capable of deflecting high-caliber kinetic shells, energy blasts, and cosmic radiation.',
    specs: [
      { label: 'Barrier Thickness', value: 'Solid Light 40mm' },
      { label: 'Deflection Index', value: '99.4%' },
      { label: 'Impact Tolerance', value: '500 Kilotons' },
      { label: 'Coverage Angle', value: '360° Adaptive' },
    ],
  },
  {
    id: 'friday',
    name: 'F.R.I.D.A.Y. Tactical Neural Core',
    code: 'AI-CORE-FRIDAY',
    category: 'COMPUTING',
    powerDraw: '25 MW',
    status: 'ONLINE',
    description: 'Next-generation heuristic combat analysis engine calculating enemy trajectories, structural weak points, and real-time countermeasure routines.',
    specs: [
      { label: 'Compute Power', value: '450 PFLOPS' },
      { label: 'Tactical Latency', value: '< 0.001 ms' },
      { label: 'Target Lock Capacity', value: '10,000+ simultaneous' },
      { label: 'Language Protocol', value: 'Global Polyglot' },
    ],
  },
];

export default function SuitDiagnostics() {
  const [selectedSubsystem, setSelectedSubsystem] = useState<Subsystem>(subsystems[0]);
  const { playHover, playClick, playRepulsor } = useSound();

  return (
    <section id="diagnostics" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#05070c] relative hud-grid-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs font-mono text-[#00f0ff] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span>STARK SUIT TELEMETRY // MK-85</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight uppercase text-white mb-4">
            NANO-ARMOR <span className="text-[#00f0ff] glow-text-cyan">ANATOMY</span>
          </h2>
          <p className="text-zinc-400 font-sans max-w-2xl mx-auto text-sm sm:text-base">
            Select a suit subsystem to analyze real-time nanite configurations, energy dissipation curves, and tactical metrics.
          </p>
        </div>

        {/* Interactive Diagnostics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Subsystem Selector Buttons (Left Column) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest px-2 mb-2">
              AVAILABLE SUBSYSTEMS [{subsystems.length}]
            </div>
            {subsystems.map((sub) => {
              const isSelected = selectedSubsystem.id === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubsystem(sub);
                    playClick();
                    if (sub.category === 'OFFENSIVE') playRepulsor();
                  }}
                  onMouseEnter={playHover}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border relative ${
                    isSelected
                      ? 'hud-panel border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                      : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-mono font-bold tracking-wider ${
                        isSelected ? 'text-[#00f0ff] glow-text-cyan' : 'text-zinc-300'
                      }`}
                    >
                      {sub.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                        sub.category === 'OFFENSIVE'
                          ? 'bg-[#e11d48]/20 text-[#ff4b72] border border-[#e11d48]/30'
                          : sub.category === 'DEFENSIVE'
                          ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30'
                          : 'bg-[#f6c845]/20 text-[#f6c845] border border-[#f6c845]/30'
                      }`}
                    >
                      {sub.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>{sub.code}</span>
                    <span className="text-zinc-400">{sub.powerDraw}</span>
                  </div>
                  {isSelected && (
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#00f0ff] rounded-r shadow-[0_0_10px_#00f0ff]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Subsystem Detail Telemetry Card (Right Column) */}
          <div className="lg:col-span-7">
            <div className="hud-panel p-6 sm:p-8 rounded-2xl border border-[#00f0ff]/30 hud-bracket relative">
              {/* Header Status */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    ACTIVE TELEMETRY MODULE
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight">
                    {selectedSubsystem.name}
                  </h3>
                  <div className="text-xs font-mono text-[#00f0ff] mt-1">
                    SYS-ID: {selectedSubsystem.code}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-zinc-500">OPERATIONAL STATE</div>
                  <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-400 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{selectedSubsystem.status}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="py-6">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  TACTICAL CAPABILITY BRIEF:
                </div>
                <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
                  {selectedSubsystem.description}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {selectedSubsystem.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-[#00f0ff]/30 transition-all"
                  >
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {spec.label}
                    </div>
                    <div className="text-base sm:text-lg font-mono font-bold text-white mt-1 text-[#f6c845]">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Holographic Radar Simulation Visualizer */}
              <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400">
                  <div className="w-3 h-3 rounded-full border border-[#00f0ff] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#00f0ff]" />
                  </div>
                  <span>POWER DRAW: {selectedSubsystem.powerDraw}</span>
                </div>
                <button
                  onClick={() => {
                    playRepulsor();
                  }}
                  onMouseEnter={playHover}
                  className="hud-btn px-4 py-2 rounded-lg text-xs"
                >
                  TEST DISCHARGE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
