"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from "react";
import { Song } from "@/app/api/songs";

type MusicContextType = {
  currentSong: Song | null; 
  playing: boolean;
  playSong: (song: Song) => void;
  togglePlay: () => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playing, setPlaying] = useState(false);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setTimeout(() => {
      audioRef.current?.play();
      setPlaying(true);
    }, 0);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <MusicContext.Provider
      value={{ currentSong, playing, playSong, togglePlay }}
    >
      {children}

      {/* 🔑 SATU-SATUNYA AUDIO */}
      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.url}
          onEnded={() => setPlaying(false)}
        />
      )}
    </MusicContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusicPlayer must be used inside MusicPlayerProvider");
  }
  return ctx;
}
