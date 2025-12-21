"use client";

import { useEffect, useRef, useState } from "react";
import { Song } from "@/app/api/songs";
import Overlay from "../components/Overlay"
import SpotifyClient from "../components/SpotifyClient";



declare global {
  interface Window {
    __audios?: HTMLAudioElement[];
  }
}

export default function Hero({ songs }: { songs: Song[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

   useEffect(() => {
    if (!window.__audios) window.__audios = [];
    if (audioRef.current) window.__audios.push(audioRef.current);

    return () => {
      window.__audios = window.__audios?.filter(
        (a) => a !== audioRef.current
      );
    };
  }, []);

  
    const playRandomSong = () => {
      if (!songs.length) return;


      // pause audio lain
    window.__audios?.forEach((a) => {
      if (a !== audioRef.current) a.pause();


    });
   

     const random = songs[Math.floor(Math.random() * songs.length)];
      setCurrentSong(random);
      setShowOverlay(true);

      // ✅ PAKSA PLAY (INI KUNCI)
      setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = random.url;
        audioRef.current.play().catch(console.error);
      }
    }, 0);
  };



  return (
    <section className="text-center py-10  text-white">

      <div className="flex flex-col items-center justify-center gap-5 px-8 sm:px-10 max-w-7xl mx-auto text-center">
        <h1 className="mt-5 text-white font-bold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-relaxed">
          Welcome to My musik{" "}
          <span className="text-indigo-400">Play songs</span>
        </h1>
        <p className="mt-4 text-white/80 max-w-md text-sm sm:text-base">
          Discover and play your favorite music instantly.
        </p>
        <button
          onClick={playRandomSong}
          className="bg-transparent border-2 border-blue-600 cursor-pointer hover:bg-blue-900/50 px-6 py-2 rounded-full"
        >
          Putar Sekarang
        </button>
        <audio className="hidden" ref={audioRef} />
      </div>

   

      {showOverlay && currentSong && (
        <Overlay
          audioRef={audioRef}
          song={currentSong}
          onClose={() => setShowOverlay(false)}
        />
      )}

    </section>
  );
}
