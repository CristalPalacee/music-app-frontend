"use client";

import { Song } from "@/app/api/songs";
import MusicCard from "./MusicCard";
import Slider from "./Slider";
import Hero from "@/app/page/Hero";
import { PlayerProvider } from "../context/PlayerContext";
import OverlayCard from "../context/OverlayCard";
import { useState, useRef } from "react";


declare global {
  interface Window {
    __audios?: HTMLAudioElement[];
  }
}

type Props = {
  songs: Song[];

};

export default function SpotifyClient({ songs }: Props) {
  const [activeSong, setActiveSong] = useState<Song | null>();
  const [showOverlay, setShowOverlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const slides = [
    { id: 1, image: "/banner/logo.jpg", title: "Top Hits" },
    { id: 2, image: "/banner/music.jpg", title: "Chill Vibes" },
    { id: 3, image: "/banner/3.png", title: "Chill Vibes" },
  ];

  const nextSong = () => {
    if (!activeSong) return;

    const currentIndex = songs.findIndex(
      (song) => song.id === activeSong.id
    );

    const nextIndex =
      currentIndex === songs.length - 1 ? 0 : currentIndex + 1;

    setActiveSong(songs[nextIndex]);
  };


  const prevSong = () => {
    if (!activeSong) return;

    const currentIndex = songs.findIndex(
      (song) => song.id === activeSong.id
    );

    const prevIndex =
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1;

    setActiveSong(songs[prevIndex]);

  };


  /* ================= PLAY HELPER ================= */
  const playSong = async (song: Song) => {
    if (!audioRef.current) return;

    audioRef.current.src = song.url;
    audioRef.current.load();

    try {
      await audioRef.current.play();
    } catch (e) {
      console.warn("play blocked:", e);
    }
  };

  const randomSong = async () => {
    if (!songs.length) return;

    let random: Song;

    do {
      random = songs[Math.floor(Math.random() * songs.length)];
    } while (activeSong && random.id === activeSong.id);



    setActiveSong(random);
    await playSong(random);
  };


  const closePlayer = () => {
  if (audioRef.current) {
    audioRef.current.pause();   // 🛑 STOP AUDIO
    audioRef.current.src = "";  // 🧹 HILANGKAN SOURCE
    audioRef.current.load();    // reset state
  }

  setActiveSong(null);          // tutup overlay
};

  return (
    <PlayerProvider>
      <main className="min-h-screen  bg-gradient-to-b from-[#010718] via-[#392cc4] to-[#03040a] p-1">

        <Slider slides={slides} />


        <Hero
          onRandom={randomSong}
          songs={songs} />


        <div className="grid h-full w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:p-15 sm:gap-16 lg:p-30 lg:gap- md:p-15 gap-12 px-7 md:gap-12">
          {songs.map((song, i) => (
            <MusicCard
              key={`${song.id}-${i}`}
              song={song}
              onSelect={async () => {
                setActiveSong(song);
                await playSong(song);
                
              }}
              onNext={nextSong}
              onPrev={prevSong}
            
            />
          ))}

        </div>
      </main>

      {/* ===== SINGLE AUDIO SOURCE ===== */}
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => {
          // pause audio lain (proteksi)
          window.__audios?.forEach((a) => {
            if (a !== audioRef.current) a.pause();
          });
        }}
      />





      {activeSong && (
        <OverlayCard
          audioRef={audioRef}
          song={activeSong}
          onClose={closePlayer}
          onNext={nextSong}
          onPrev={prevSong}

        />
      )}
    </PlayerProvider>
  );
}
