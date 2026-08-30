'use client';

import React, { useState } from 'react';
import { useSound } from '@/components/providers/SoundProvider';

export default function ArcReactorMatrix() {
  const [powerOutput, setPowerOutput] = useState<number>(85);
  const { playHover, playClick, playRepulsor, playAlert } = useSound();

  const isOverdrive = powerOutput > 100;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPowerOutput(val);
    if (val > 100 && powerOutput <= 100) {
      playAlert();
    } else if (val % 20 === 0) {
      playHover();
    }
  };

  const calculatedGW = (powerOutput * 0.0142).toFixed(2);
  const calculatedTemp = (powerOutput * 12500).toLocaleString();
  const calculatedFlux = (powerOutput * 8.4).toFixed(1);

  return (
    <section id="reactor" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#05070c] relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs font-mono text-[#00f0ff] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span>STARK THERMONUCLEAR POWER CORE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight uppercase text-white mb-4">
            ARC REACTOR <span className="text-[#00f0ff] glow-text-cyan">MATRIX</span>
          </h2>
          <p className="text-zinc-400 font-sans max-w-2xl mx-auto text-sm sm:text-base">
            Adjust core magnetic confinement flux and regulate power distribution across Mark LXXXV battle systems.
          </p>
        </div>

        {/* Main Reactor Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Arc Reactor Holographic Ring (Left) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Outer Decorative Ring */}
              <div
                className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-300 ${
                  isOverdrive ? 'border-[#e11d48] animate-spin' : 'border-[#00f0ff]/40 animate-spin-slow'
                }`}
                style={{
                  animationDuration: `${Math.max(2, 20 - (powerOutput / 100) * 16)}s`,
                }}
              />

              {/* Middle Magnetic Coils Ring */}
              <div
                className={`absolute inset-6 rounded-full border-2 border-dotted transition-all duration-300 ${
                  isOverdrive ? 'border-[#e11d48]/70 animate-spin-reverse' : 'border-[#f6c845]/50 animate-spin-reverse'
                }`}
                style={{
                  animationDuration: `${Math.max(1.5, 14 - (powerOutput / 100) * 11)}s`,
                }}
              />

              {/* Glowing Core Orb */}
              <div
                className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all duration-300 relative ${
                  isOverdrive
                    ? 'bg-radial from-[#ff2a4b] via-[#e11d48]/50 to-transparent shadow-[0_0_80px_rgba(225,29,72,0.8)]'
                    : 'bg-radial from-white via-[#00f0ff]/60 to-transparent shadow-[0_0_70px_rgba(0,240,255,0.7)] arc-pulse'
                }`}
              >
                {/* Center Readout */}
                <span className="text-[10px] font-mono tracking-widest text-black/80 font-bold uppercase">
                  OUTPUT
                </span>
                <span className="text-3xl sm:text-4xl font-mono font-black text-black">
                  {powerOutput}%
                </span>
                <span className="text-[9px] font-mono text-black/70 font-semibold">
                  {calculatedGW} GW
                </span>
              </div>

              {/* 10 Radiating Coils Simulation */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-1 pointer-events-none"
                  style={{
                    transform: `rotate(${i * 36}deg)`,
                  }}
                >
                  <div
                    className={`w-4 h-2 rounded-sm mx-auto transition-all duration-200 ${
                      isOverdrive ? 'bg-[#ff2a4b] shadow-[0_0_10px_#ff2a4b]' : 'bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Overdrive Warning Badge */}
            {isOverdrive && (
              <div className="mt-6 px-4 py-1.5 rounded-lg bg-[#e11d48]/20 border border-[#e11d48] text-xs font-mono text-[#ff4b72] animate-bounce flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#ff2a4b] animate-ping" />
                <span>WARNING: CORE TEMPERATURE AT CRITICAL THRESHOLD</span>
              </div>
            )}
          </div>

          {/* Core Controls & Power Routing (Right) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Interactive Output Slider Panel */}
            <div className="hud-panel p-6 rounded-2xl border border-[#00f0ff]/30 hud-bracket">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  THROTTLE ARC CORE OUTPUT
                </span>
                <span
                  className={`text-sm font-mono font-bold ${
                    isOverdrive ? 'text-[#ff4b72] glow-text-red' : 'text-[#00f0ff] glow-text-cyan'
                  }`}
                >
                  {powerOutput}% {isOverdrive ? '(OVERDRIVE)' : '(STABLE)'}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="10"
                max="120"
                value={powerOutput}
                onChange={handleSliderChange}
                className="w-full h-3 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#00f0ff] border border-zinc-700"
              />

              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-2">
                <span>10% IDLE</span>
                <span>50% CRUISE</span>
                <span>100% NOMINAL</span>
                <span className="text-[#ff4b72]">120% OVERDRIVE</span>
              </div>
            </div>

            {/* Live Core Telemetry Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl hud-panel border border-zinc-800 text-center">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">CORE OUTPUT</div>
                <div className="text-base sm:text-lg font-mono font-bold text-[#00f0ff] mt-1">
                  {calculatedGW} GW
                </div>
              </div>
              <div className="p-4 rounded-xl hud-panel border border-zinc-800 text-center">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">CORE TEMP</div>
                <div className="text-base sm:text-lg font-mono font-bold text-[#f6c845] mt-1">
                  {calculatedTemp} K
                </div>
              </div>
              <div className="p-4 rounded-xl hud-panel border border-zinc-800 text-center">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">MAG FLUX</div>
                <div className="text-base sm:text-lg font-mono font-bold text-white mt-1">
                  {calculatedFlux} T
                </div>
              </div>
            </div>

            {/* Power Distribution System Bars */}
            <div className="hud-panel p-6 rounded-2xl border border-zinc-800 space-y-4">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                POWER GRID DISTRIBUTION ROUTING
              </div>

              {[
                { name: 'REPULSOR CANNONS & UNIBEAM', pct: Math.min(100, Math.floor(powerOutput * 0.9)) },
                { name: 'HYPERSONIC FLIGHT THRUSTERS', pct: Math.min(100, Math.floor(powerOutput * 0.8)) },
                { name: 'NANO SHIELD & DEFLECTION BARRIER', pct: Math.min(100, Math.floor(powerOutput * 0.75)) },
                { name: 'LIFE SUPPORT & INERTIAL DAMPENERS', pct: 100 },
              ].map((grid) => (
                <div key={grid.name}>
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-zinc-300">{grid.name}</span>
                    <span className="text-[#00f0ff]">{grid.pct}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                    <div
                      className="h-full bg-gradient-to-r from-[#00f0ff] to-[#f6c845] transition-all duration-150"
                      style={{ width: `${grid.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setPowerOutput(100);
                  playClick();
                }}
                onMouseEnter={playHover}
                className="flex-1 hud-btn py-2.5 rounded-xl text-xs"
              >
                NORMALIZE (100%)
              </button>
              <button
                onClick={() => {
                  setPowerOutput(120);
                  playRepulsor();
                  playAlert();
                }}
                onMouseEnter={playHover}
                className="flex-1 hud-btn-crimson py-2.5 rounded-xl text-xs font-mono"
              >
                OVERDRIVE (120%)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
