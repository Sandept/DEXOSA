'use client';

import React, { useState } from 'react';
import { useSound } from '@/components/providers/SoundProvider';

interface LogEntry {
  type: 'USER' | 'JARVIS' | 'SYSTEM';
  text: string;
  time: string;
}

const presetProtocols = [
  {
    name: 'HOUSE PARTY PROTOCOL',
    cmd: 'EXECUTE_HOUSE_PARTY',
    response: 'Initiating House Party Protocol. All 34 automated Iron Legion suits dispatched from the subterranean hangar. Formations locked.',
  },
  {
    name: 'DEPLOY VERONICA',
    cmd: 'DEPLOY_VERONICA_ORBITAL',
    response: 'Orbital service pod Veronica synced. Hulkbuster expansion armor tracking your coordinates. Atmospheric re-entry in 4.2 seconds.',
  },
  {
    name: 'CLEAN SLATE PROTOCOL',
    cmd: 'TRIGGER_CLEAN_SLATE',
    response: 'Clean Slate Protocol armed. Overloading secondary micro-reactors across the fleet. It is quite a fireworks display, Mr. Stark.',
  },
  {
    name: 'BARF AUGMENTED REALITY',
    cmd: 'ENGAGE_BARF_SYSTEM',
    response: 'Binocular Augmented Retro-Fixation initialized. Neuro-optical scans calibrated. Holographic simulation ready for interactive analysis.',
  },
  {
    name: 'ALL WEAPONS FREE',
    cmd: 'AUTHORIZE_WEAPONS_FREE',
    response: 'Safeties disengaged. Nano-cannons primed, micro-missile silos open, high-intensity laser cutters at 100% capacity.',
  },
];

export default function JarvisTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: 'JARVIS',
      text: 'Good day, Mr. Stark. Mark LXXXV neural uplink is established and operating within nominal parameters.',
      time: '00:00:01',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const { playHover, playClick, playRepulsor, playAlert } = useSound();

  const addLog = (cmdText: string, jarvisResponse: string) => {
    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const userLog: LogEntry = {
      type: 'USER',
      text: `> ${cmdText}`,
      time: timeStr,
    };
    const jarvisLog: LogEntry = {
      type: 'JARVIS',
      text: jarvisResponse,
      time: timeStr,
    };

    setLogs((prev) => [...prev, userLog, jarvisLog]);
  };

  const handleProtocolClick = (item: typeof presetProtocols[0]) => {
    playClick();
    if (item.cmd.includes('WEAPONS') || item.cmd.includes('CLEAN')) {
      playRepulsor();
    }
    addLog(item.name, item.response);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    playClick();
    const query = inputVal.trim().toUpperCase();
    let reply = `Command "${query}" registered. Routing tactical parameters through J.A.R.V.I.S. neural subroutines.`;

    if (query.includes('HELLO') || query.includes('HI')) {
      reply = 'Always a pleasure, sir. Ready when you are.';
    } else if (query.includes('THANOS') || query.includes('THREAT')) {
      playAlert();
      reply = 'Threat Level: OMEGA. All nano-shields and Repulsor blasters locked onto hostile targets.';
    } else if (query.includes('FRIDAY')) {
      reply = 'F.R.I.D.A.Y. tactical sub-core is in co-pilot standby mode, sir.';
    } else if (query.includes('3000') || query.includes('LOVE')) {
      reply = 'We love you 3000, Mr. Stark. The legacy is immortal.';
    }

    addLog(inputVal, reply);
    setInputVal('');
  };

  return (
    <section id="protocols" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#05070c] relative border-t border-zinc-800/80 hud-grid-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs font-mono text-[#00f0ff] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span>AI NEURAL TACTICAL INTERFACE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight uppercase text-white mb-4">
            J.A.R.V.I.S. <span className="text-[#00f0ff] glow-text-cyan">TERMINAL</span>
          </h2>
          <p className="text-zinc-400 font-sans max-w-2xl mx-auto text-sm sm:text-base">
            Issue real-time operational commands to the Iron Legion and configure Mark LXXXV tactical subroutines.
          </p>
        </div>

        {/* Console Container */}
        <div className="hud-panel rounded-2xl border border-[#00f0ff]/40 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] hud-bracket">
          {/* Top Terminal Bar */}
          <div className="bg-[#0c121e] px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#e11d48]/80" />
              <div className="w-3 h-3 rounded-full bg-[#f6c845]/80" />
              <div className="w-3 h-3 rounded-full bg-[#00f0ff]/80" />
              <span className="ml-2 text-xs font-mono text-zinc-400">
                JARVIS_CORE_OS_v8.5 // TACTICAL_CONSOLE
              </span>
            </div>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>SECURE UPLINK ESTABLISHED</span>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Terminal Output Stream (Left) */}
            <div className="lg:col-span-8 bg-[#04060a] p-4 rounded-xl border border-zinc-800/80 h-96 overflow-y-auto font-mono text-xs space-y-3">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-lg border ${
                    log.type === 'USER'
                      ? 'bg-[#00f0ff]/5 border-[#00f0ff]/20 text-[#00f0ff]'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] text-zinc-500 mb-1">
                    <span className="font-bold">{log.type === 'USER' ? 'COMMANDER' : 'J.A.R.V.I.S.'}</span>
                    <span>{log.time}</span>
                  </div>
                  <div className="leading-relaxed">{log.text}</div>
                </div>
              ))}
            </div>

            {/* Tactical Protocol Quick Triggers (Right) */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">
                TACTICAL OVERRIDE PROTOCOLS
              </div>
              {presetProtocols.map((p) => (
                <button
                  key={p.name}
                  onClick={() => handleProtocolClick(p)}
                  onMouseEnter={playHover}
                  className="w-full text-left p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/10 text-zinc-300 hover:text-white transition-all text-xs font-mono group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#00f0ff] group-hover:glow-text-cyan">{p.name}</span>
                    <span className="text-[9px] text-zinc-500">TRIGGER</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Command Input Box */}
          <form onSubmit={handleCustomSubmit} className="p-4 bg-[#080d17] border-t border-zinc-800 flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#00f0ff]">
                &gt;
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter command or protocol (e.g. 'Deploy Nano Shields', 'Status report', 'We love you 3000')..."
                className="w-full bg-[#04060a] border border-zinc-700/80 rounded-xl pl-8 pr-4 py-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#00f0ff]"
              />
            </div>
            <button
              type="submit"
              onMouseEnter={playHover}
              className="hud-btn px-6 py-2.5 rounded-xl text-xs"
            >
              TRANSMIT
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
