'use client';

import React, { useState } from 'react';
import { useSound } from '@/components/providers/SoundProvider';

interface ArmorModel {
  id: string;
  name: string;
  codename: string;
  year: string;
  era: string;
  armorClass: string;
  topSpeed: string;
  primaryMaterial: string;
  weapons: string[];
  description: string;
  accentColor: string;
}

const armors: ArmorModel[] = [
  {
    id: 'mk1',
    name: 'MARK I',
    codename: 'The Birth in the Cave',
    year: '2008',
    era: 'AFGHANISTAN PROTOTYPE',
    armorClass: 'Heavy Scrap Ingot',
    topSpeed: 'Sub-Sonic (Short Jump)',
    primaryMaterial: 'Forged Cast Iron & Missile Shells',
    weapons: ['Dual Arm Flamethrowers', 'Single-Shot Micro-Missile', 'Crude Hydraulic Punch'],
    description: 'Constructed under extreme duress in an Afghan cave using recycled Stark Industries missile parts and the first miniature Arc Reactor prototype.',
    accentColor: '#a1a1aa',
  },
  {
    id: 'mk3',
    name: 'MARK III',
    codename: 'Gold Titanium Standard',
    year: '2008',
    era: 'FIRST SUPERHERO SUIT',
    armorClass: 'Gold-Titanium Alloy',
    topSpeed: 'Mach 3 (3,700 km/h)',
    primaryMaterial: 'Gold-Titanium Aerodynamic Composite',
    weapons: ['Twin Palm Repulsors', 'Chest Unibeam', 'Multi-Target Flare Decoys', 'Forearm Anti-Tank Missile'],
    description: 'The first suit to solve high-altitude icing problems and introduce the iconic Hot-Rod Red and Champagne Gold aesthetic.',
    accentColor: '#f6c845',
  },
  {
    id: 'mk7',
    name: 'MARK VII',
    codename: 'Battle of New York',
    year: '2012',
    era: 'CHITAURI INVASION',
    armorClass: 'Rapid-Deploy Combat',
    topSpeed: 'Mach 4.5',
    primaryMaterial: 'Reinforced Carbon-Titanium Matrix',
    weapons: ['High-Energy Laser Cutters', 'Shoulder Micro-Rocket Silos', 'Quad-Thruster Back Booster'],
    description: 'Equipped with rapid mid-air deployment pods keyed to biometric wrist cuffs, enabling Tony to suit up during freefall over Manhattan.',
    accentColor: '#e11d48',
  },
  {
    id: 'mk42',
    name: 'MARK XLII',
    codename: 'The Prodigal Son',
    year: '2013',
    era: 'AUTONOMOUS PREHENSILE',
    armorClass: 'Modular Micro-Propulsion',
    topSpeed: 'Mach 5.2',
    primaryMaterial: 'Lightweight Composite Alloy',
    weapons: ['Individual Sub-Orbital Guided Plates', 'Repulsor Arrays', 'Remote Neural Telepresence'],
    description: 'Each individual plate contains its own micro-thruster and AI guidance system, allowing remote assembly onto Tony or others from across the globe.',
    accentColor: '#f59e0b',
  },
  {
    id: 'mk44',
    name: 'MARK XLIV',
    codename: 'Hulkbuster (Veronica)',
    year: '2015',
    era: 'HEAVY TITAN DETERRING',
    armorClass: 'Ultra-Heavy Exoskeleton',
    topSpeed: 'Mach 2.2',
    primaryMaterial: 'Impact-Absorbent Vibranium Plating',
    weapons: ['Hydraulic Piston Jackhammer Fist', 'Repulsor Restraint Cage', 'Autonomous Limb Replacement Pods'],
    description: 'Designed jointly with Bruce Banner as a containment failsafe. Deployed from orbital satellite Veronica to subdue an enraged Hulk.',
    accentColor: '#dc2626',
  },
  {
    id: 'mk85',
    name: 'MARK LXXXV',
    codename: 'The Endgame Masterpiece',
    year: '2023',
    era: 'INFINITY NANO-TECH',
    armorClass: 'Programmable Nanoparticle',
    topSpeed: 'Mach 8.5+ (Deep Space Flight)',
    primaryMaterial: 'Smart Nanomaterial & Vibranium Weave',
    weapons: ['Nano-Gauntlet Stones Channeler', 'Lightning Refocuser Petals', 'Solid Energy Blade & Shields', 'Unibeam Overload'],
    description: 'The pinnacle of Stark engineering. Integrates bleeding-edge nanotechnology capable of morphing instant weaponry and safely channeling all six Infinity Stones.',
    accentColor: '#00f0ff',
  },
];

export default function ArmorVault() {
  const [activeArmor, setActiveArmor] = useState<ArmorModel>(armors[5]);
  const { playHover, playClick, playRepulsor } = useSound();

  return (
    <section id="vault" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#05070c] relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#f6c845]/10 border border-[#f6c845]/30 text-xs font-mono text-[#f6c845] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f6c845] animate-ping" />
            <span>STARK ARCHIVAL VAULT // 85 SUITS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight uppercase text-white mb-4">
            HALL OF <span className="text-[#f6c845] glow-text-gold">ARMOR</span>
          </h2>
          <p className="text-zinc-400 font-sans max-w-2xl mx-auto text-sm sm:text-base">
            From scrap metal in a cave to the ultimate nanotech suit that saved the cosmos.
          </p>
        </div>

        {/* Armor Timeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {armors.map((armor) => {
            const isSelected = activeArmor.id === armor.id;
            return (
              <button
                key={armor.id}
                onClick={() => {
                  setActiveArmor(armor);
                  playClick();
                  if (armor.id === 'mk85') playRepulsor();
                }}
                onMouseEnter={playHover}
                className={`p-4 rounded-xl border text-center transition-all duration-200 relative ${
                  isSelected
                    ? 'hud-panel border-[#f6c845] shadow-[0_0_20px_rgba(246,200,69,0.25)]'
                    : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400'
                }`}
              >
                <div className="text-[10px] font-mono text-zinc-500">{armor.year}</div>
                <div
                  className={`text-sm sm:text-base font-mono font-bold mt-1 ${
                    isSelected ? 'text-white' : 'text-zinc-300'
                  }`}
                >
                  {armor.name}
                </div>
                <div className="text-[9px] font-mono text-zinc-500 truncate mt-1">
                  {armor.codename}
                </div>
                {isSelected && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#f6c845] rounded-full shadow-[0_0_8px_#f6c845]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Armor Blueprint Card */}
        <div className="hud-panel p-6 sm:p-10 rounded-2xl border border-[#f6c845]/30 hud-bracket relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description & Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-[#f6c845]/20 border border-[#f6c845]/40 text-xs font-mono text-[#f6c845] font-bold">
                  {activeArmor.name}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {activeArmor.era}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-mono font-black text-white uppercase tracking-tight">
                "{activeArmor.codename}"
              </h3>

              <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
                {activeArmor.description}
              </p>

              {/* Weapons Payload */}
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  TACTICAL WEAPONS ARRAY:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeArmor.weapons.map((w) => (
                    <span
                      key={w}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-700/80 text-xs font-mono text-zinc-200"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Specs Telemetry Panel */}
            <div className="lg:col-span-5 bg-[#04060a]/90 p-6 rounded-xl border border-zinc-800 space-y-4">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest pb-2 border-b border-zinc-800">
                BLUEPRINT SPECIFICATIONS
              </div>

              <div>
                <div className="text-[10px] font-mono text-zinc-500">ARMOR CLASSIFICATION</div>
                <div className="text-sm font-mono font-bold text-white mt-0.5">
                  {activeArmor.armorClass}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono text-zinc-500">MAXIMUM FLIGHT SPEED</div>
                <div className="text-sm font-mono font-bold text-[#00f0ff] mt-0.5">
                  {activeArmor.topSpeed}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono text-zinc-500">PRIMARY HULL ALLOY</div>
                <div className="text-sm font-mono font-bold text-[#f6c845] mt-0.5">
                  {activeArmor.primaryMaterial}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => playRepulsor()}
                  onMouseEnter={playHover}
                  className="w-full hud-btn-gold py-2.5 rounded-lg text-xs"
                >
                  SIMULATE {activeArmor.name} REPULSOR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
