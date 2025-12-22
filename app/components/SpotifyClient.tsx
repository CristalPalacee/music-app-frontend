"use client";

import { Song } from "@/app/api/songs";
import MusicCard from "./MusicCard";
import Slider from "./Slider";
import Hero from "@/app/page/Hero";
import { PlayerProvider } from "../context/PlayerContext";
import OverlayCard from "../context/OverlayCard";
import { useState, useRef } from "react";


type Props = {
  songs: Song[];
  
};

export default function SpotifyClient({ songs}: Props) {
   const [activeSong, setActiveSong] = useState<Song | null>(null);
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

  return (
    <PlayerProvider>
    <main className="min-h-screen bg-gradient-to-b from-[#010718] via-[#392cc4] to-[#03040a] p-1">

      <Slider slides={slides} />
      <Hero songs={songs} />
      <div className="grid grid-cols-1 md:grid-cols-3 md:p-40 gap-6 px-3 md:gap-16">
        {songs.map((song, i) => (
          <MusicCard
            key={`${song.id}-${i}`}
            song={song}
            onSelect={() => setActiveSong(song)}
            onNext={nextSong}
            onPrev={prevSong}
           />
        ))}
     
      </div>

    </main>
     {activeSong && (
           <OverlayCard
             audioRef={audioRef}
             song={activeSong}
             onClose={() => setActiveSong(null)}
             onNext={nextSong}
             onPrev={prevSong}
           />
         )}
    </PlayerProvider>
  );
}
