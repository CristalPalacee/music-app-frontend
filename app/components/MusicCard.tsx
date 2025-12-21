"use client";

import { useEffect, useRef } from "react";
import { Song } from "@/app/api/songs";
import Link from "next/link";

declare global {
  interface Window {
    __audios?: HTMLAudioElement[];
  }
}

type Props = {

  song: Song;
 

}

export default function MusicCard({ song}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!window.__audios) window.__audios = [];
    if (audioRef.current) window.__audios.push(audioRef.current);

    return () => {
      window.__audios = window.__audios?.filter(
        (a) => a !== audioRef.current
      );
    };
  }, []);

const handlePlay = () => {
  window.__audios?.forEach((a) => {
    if (a !== audioRef.current) a.pause();
  });
};


  return (
    <div className="bg-zinc-900 rounded-xl p-4 flex flex-col gap-3 shadow-md hover:bg-zinc-800 transition">
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

      {/* 🔑 AUDIO TIDAK DI DALAM LINK */}
      <audio className="w-full"
        ref={audioRef}
        src={song.url}
        controls
        preload="metadata"
          onPlay={handlePlay}
      />
    </div>
  );
}
