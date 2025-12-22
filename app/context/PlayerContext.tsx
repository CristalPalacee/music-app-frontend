"use client";

import { createContext, useContext, useRef, useState } from "react";
import { Song } from "@/app/api/songs";

type PlayerContextType = {
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong, audioRef }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}
