'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { sound } from '@/lib/sound';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
  playRepulsor: () => void;
  playAlert: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: false,
  toggleSound: () => {},
  playHover: () => {},
  playClick: () => {},
  playRepulsor: () => {},
  playAlert: () => {},
});

export const useSound = () => useContext(SoundContext);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.setEnabled(nextState);
  };

  useEffect(() => {
    sound.setEnabled(soundEnabled);
  }, [soundEnabled]);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playHover: () => sound.playHover(),
        playClick: () => sound.playClick(),
        playRepulsor: () => sound.playRepulsor(),
        playAlert: () => sound.playAlert(),
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export default SoundProvider;
