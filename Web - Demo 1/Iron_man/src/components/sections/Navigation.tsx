'use client';

import React, { useState, useEffect } from 'react';
import { useSound } from '@/components/providers/SoundProvider';

export default function Navigation() {
  const { soundEnabled, toggleSound, playHover, playClick } = useSound();
  const [time, setTime] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'MISSION HUD', href: '#hero' },
    { name: 'NANO DIAGNOSTICS', href: '#diagnostics' },
    { name: 'ARC REACTOR', href: '#reactor' },
    { name: 'J.A.R.V.I.S.', href: '#protocols' },
    { name: 'ARMOR VAULT', href: '#vault' },
    { name: 'LEGACY', href: '#legacy' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05070c]/90 backdrop-blur-md border-b border-[#00f0ff]/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Stark Industries Branding */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/40 arc-pulse">
            <span className="text-[#00f0ff] font-mono font-black text-sm tracking-tighter">STARK</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-white/90 font-bold tracking-widest uppercase">
                STARK INDUSTRIES
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#e11d48]/20 text-[#ff4b72] border border-[#e11d48]/40">
                MK-85
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              <span>J.A.R.V.I.S. V8.5 // {time || '00:00:00'}</span>
            </div>
          </div>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden lg:flex items-center space-x-1 hud-panel px-3 py-1.5 rounded-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={playHover}
              onClick={playClick}
              className="px-3 py-1.5 text-[11px] font-mono tracking-wider text-zinc-300 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 rounded transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Telemetry + Audio Switch */}
        <div className="flex items-center space-x-3">
          {/* Sound Synthesizer Switch */}
          <button
            onClick={() => {
              toggleSound();
              playClick();
            }}
            onMouseEnter={playHover}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 ${
              soundEnabled
                ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-zinc-900/60 border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
            title="Toggle Synthesized Stark HUD Audio SFX"
          >
            <div className="flex items-end space-x-0.5 h-3.5">
              <span
                className={`w-0.5 rounded-full transition-all duration-150 ${
                  soundEnabled ? 'bg-[#00f0ff] h-3 animate-pulse' : 'bg-zinc-500 h-1.5'
                }`}
              />
              <span
                className={`w-0.5 rounded-full transition-all duration-150 ${
                  soundEnabled ? 'bg-[#00f0ff] h-4 animate-bounce' : 'bg-zinc-500 h-2'
                }`}
              />
              <span
                className={`w-0.5 rounded-full transition-all duration-150 ${
                  soundEnabled ? 'bg-[#00f0ff] h-2 animate-pulse' : 'bg-zinc-500 h-1'
                }`}
              />
            </div>
            <span className="hidden sm:inline">{soundEnabled ? 'AUDIO: ON' : 'AUDIO: MUTED'}</span>
          </button>

          {/* Armor Status Capsule */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#00f0ff]/5 border border-[#00f0ff]/20 text-[11px] font-mono text-[#00f0ff]">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span>REACTOR: 100%</span>
          </div>
        </div>
      </div>
    </header>
  );
}
