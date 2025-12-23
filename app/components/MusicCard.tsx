"use client";

import { useEffect, useRef, useState } from "react";
import { Song } from "@/app/api/songs";
import Link from "next/link";
import { Play, Pause, X, SkipBack, SkipForward } from "lucide-react";

declare global {
  interface Window {
    __audios?: HTMLAudioElement[];
  }
}

type Props = {
 
  song: Song;
  onSelect: () => void;
  onNext?: () => void;
  onPrev?: () => void;

}

export default function MusicCard({ song, onSelect,onNext,onPrev}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!window.__audios) window.__audios = [];
    if (audioRef.current) window.__audios.push(audioRef.current);

    return () => {
      window.__audios = window.__audios?.filter(
        (a) => a !== audioRef.current
      );
    };
  }, []);

const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

const handlePlayPause = () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }

  setIsPlaying(!isPlaying);
};


  return (

    
    <div 
   
    className="bg-zinc-900 rounded-xl p-4 flex flex-col gap-3 shadow-md hover:bg-zinc-800 transition">
   
      <Link href={`/songs/${song.id}`}>
         <div className="w-full aspect-square overflow-hidden rounded-lg">
          <img
            src={song.cover}
            alt={song.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

       <div>
        <h3 className="text-white text-sm font-semibold truncate">
          {song.title}
        </h3>
        <p className="text-zinc-400 text-xs truncate">
          {song.artist}
        </p>
      </div>

       {/* button next play pause prev */}
      <div className="justify-center gap-4 flex">
 <button onClick={onPrev} className="text-white/70 hover:text-white">
              <SkipBack size={20} />
            </button>


       <button
  onClick={onSelect}
  className={`
    relative w-10 h-10 md:w-9 md:h-8
    rounded-full
    text-amber-50
    border border-amber-100
    flex items-center justify-center
    transition-all duration-300 ease-out
    ${isPlaying ? "bg-red-500 scale-110 shadow-red-500/50" : "bg-transparent"}
    hover:scale-110 active:scale-95
  `}
>
  {/* PLAY */}
  <span
    className={`
      absolute transition-all duration-300 
      ${isPlaying ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100"}
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  </span>

  {/* PAUSE */}
  <span
    className={`
      absolute transition-all duration-300
      ${isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-50"}
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
    </svg>
  </span>
</button>
         <button onClick={onNext} className="text-white/70 hover:text-white">
              <SkipForward size={20} />
            </button>


      </div>

    
    </div>
  );
}
