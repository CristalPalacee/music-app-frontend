"use client";

import { Song } from "@/app/api/songs";
import { Play, Pause, X, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  song: Song;
  onNext?: () => void;
  onPrev?: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onClose: () => void;
};

export default function Overlay({ song, audioRef, onClose, onNext, onPrev }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // sync awal
    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef, song]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.paused ? audio.play() : audio.pause();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-3">

        {/* COVER */}
        <img
          src={song.cover}
          alt={song.title}
          className="w-12 h-12 rounded-md object-cover"
        />

        {/* INFO */}
        <div className="flex-1 overflow-hidden">
          <p className="text-white text-sm font-semibold truncate">
            {song.title}
          </p>
          <p className="text-white/60 text-xs truncate">
            {song.artist}
          </p>
        </div>


          {/* CONTROLS */}
        <div className="flex items-center gap-3">
          {onPrev && (
            <button onClick={onPrev} className="text-white/70 hover:text-white">
              <SkipBack size={20} />
            </button>
          )}

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          {onNext && (
            <button onClick={onNext} className="text-white/70 hover:text-white">
              <SkipForward size={20} />
            </button>
          )}
        </div>

     

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* AUDIO */}
        <audio
          ref={audioRef}
          src={song.url}
          autoPlay
        
        />
      </div>
    </div>
  );
}
