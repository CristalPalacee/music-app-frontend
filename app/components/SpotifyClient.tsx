"use client";

import { Song } from "@/app/api/songs";
import MusicCard from "./MusicCard";
import Slider from "./Slider";
import Hero from "@/app/page/Hero";

type Props = {
  songs: Song[];
  
};

export default function SpotifyClient({ songs}: Props) {
  const slides = [
    { id: 1, image: "/banner/logo.jpg", title: "Top Hits" },
    { id: 2, image: "/banner/music.jpg", title: "Chill Vibes" },
    { id: 3, image: "/banner/3.png", title: "Chill Vibes" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#010718] via-[#392cc4] to-[#03040a] p-1">
      <Slider slides={slides} />
      <Hero songs={songs} />
      <div className="grid grid-cols-1 md:grid-cols-3 md:p-40 gap-6 px-3 md:gap-16">
        {songs.map((song, i) => (
          <MusicCard
            key={`${song.id}-${i}`}
            song={song}
           />
        ))}
      </div>
    </main>
  );
}
