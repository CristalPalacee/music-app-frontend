"use client";

import { Song } from "@/app/api/songs";
import { Play, Pause, X } from "lucide-react";
import { useEffect, useState } from "react";
declare global {
  interface Window {
    __audios?: HTMLAudioElement[];
  }
}

type Props = {
  song: Song;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onClose: () => void;
};

export default function Overlay({ song, audioRef, onClose }: Props) {

  const [isPlaying, setIsPlaying] = useState(false);

 // 🔑 sinkronkan state dengan audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // initial state
    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef]);


  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // pause audio lain
    window.__audios?.forEach((a) => {
      if (a !== audio) a.pause();
    });

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-3">
       
        {/* cover */}
        <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
          <img
            src={song.cover}
            alt={song.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* info */}
        <div className="flex-1 overflow-hidden">
          <p className="text-white text-sm font-semibold truncate">
            {song.title}
          </p>
          <p className="text-white/60 text-xs truncate">
            {song.artist}
          </p>
        </div>

        {/* play / pause */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition"
        >
          {isPlaying ? (
            <Pause size={18} className="text-black" />
          ) : (
            <Play size={18} className="text-black" />
          )}
        </button>


         {/* close */}
        <button
          onClick={onClose}
          className="  text-white/60  hover:text-white"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
