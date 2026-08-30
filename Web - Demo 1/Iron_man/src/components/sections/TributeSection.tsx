'use client';

import React, { useState } from 'react';
import { useSound } from '@/components/providers/SoundProvider';

export default function TributeSection() {
  const [tributeCount, setTributeCount] = useState(3000);
  const [hasTributed, setHasTributed] = useState(false);
  const { playHover, playClick, playRepulsor } = useSound();

  const handleTribute = () => {
    if (!hasTributed) {
      setTributeCount((prev) => prev + 1);
      setHasTributed(true);
      playRepulsor();
    }
  };

  const quotes = [
    {
      quote: "I told you, I don't want to join your super-secret boy band.",
      context: "Iron Man 2 (2010)",
    },
    {
      quote: "Genius, billionaire, playboy, philanthropist.",
      context: "The Avengers (2012)",
    },
    {
      quote: "If we can't protect the Earth, you can be damn well sure we'll avenge it.",
      context: "The Avengers (2012)",
    },
    {
      quote: "Part of the journey is the end.",
      context: "Avengers: Endgame (2019)",
    },
    {
      quote: "I love you 3000.",
      context: "Morgan Stark & Tony Stark",
    },
    {
      quote: "I am Iron Man.",
      context: "Iron Man (2008) & Avengers: Endgame (2019)",
    },
  ];

  return (
    <footer id="legacy" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030407] relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Memorial Hero Card */}
        <div className="hud-panel p-8 sm:p-14 rounded-3xl border border-[#00f0ff]/30 text-center relative overflow-hidden mb-20 hud-bracket">
          {/* Subtle Arc Reactor Glow in Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/50 flex items-center justify-center arc-pulse">
              <span className="text-[#00f0ff] font-mono text-xl font-bold">♥</span>
            </div>

            <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase">
              PROOF THAT TONY STARK HAS A HEART
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black text-white uppercase tracking-tight">
              WE LOVE YOU <span className="text-[#f6c845] glow-text-gold">3000</span>
            </h2>

            <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
              "Everybody wants a happy ending, right? But it doesn't always roll that way. 
              Maybe this time. I'm hoping if you play this back... it's in celebration."
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleTribute}
                onMouseEnter={playHover}
                className={`hud-btn-gold px-8 py-3.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  hasTributed ? 'opacity-80' : ''
                }`}
              >
                {hasTributed ? 'TRIBUTE RECORDED ♥' : `SALUTE TONY STARK (${tributeCount})`}
              </button>
            </div>
          </div>
        </div>

        {/* Famous Quotes Grid */}
        <div className="mb-20">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest text-center mb-8">
            MEMORABLE DIRECTIVES & ARCHIVES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((q, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-[#00f0ff]/30 transition-all space-y-3"
              >
                <div className="text-[#00f0ff] font-mono text-lg font-bold">“</div>
                <p className="text-zinc-200 font-sans text-sm italic leading-relaxed">
                  {q.quote}
                </p>
                <div className="text-[10px] font-mono text-[#f6c845] tracking-wider pt-2 border-t border-zinc-800/60">
                  // {q.context}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stark Industries Footer */}
        <div className="pt-10 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-500">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-zinc-300">STARK INDUSTRIES</span>
            <span>•</span>
            <span>ADVANCED TACTICAL DIVISION</span>
            <span>•</span>
            <span>MALIBU // NEW YORK</span>
          </div>

          <div className="text-center md:text-right">
            <span>ENGINEERED FOR ANTHONY EDWARD STARK</span>
            <div className="text-[10px] text-zinc-600 mt-1">
              ALL RIGHT RESERVED // EARTH-616 DEFENSE INITIATIVE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
