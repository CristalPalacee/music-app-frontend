"use client";

// import { Play, Pause, SkipBack, SkipForward, Heart, Home, Search, LibraryBig } from "lucide-react";
import { useState,useEffect } from "react";
import {getSongs, Song} from "@/app/api/songs"
import MusicCard from "./components/MusicCard";
import Slider from "./slider/page";


export default function SpotifyLikeUI() {
  // const [playing, setPlaying] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);

 useEffect(() => {
    getSongs()
    .then(setSongs)
    .catch(console.error);
  }, []);


  // if (loading) return <p>Loading...</p>;
const slides = [
  {
    id: 1,
    image: "/banner/logo.jpg",
    title: "Top Hits",
  },
  {
    id: 2,
    image: "/banner/music.jpg",
    title: "Chill Vibes",
  },
  {
    id: 3,
    image: "/banner/orang.jpg",
    title: "Chill Vibes",
  },

 
];




  return (
    <main className="min-h-screen bg-gradient-to-b from-red-900/50 to-black bg-black  md:px-0 p-1">
        <Slider slides={slides} />
      <h1 className="text-white text-2xl font-bold md:pt-8 p-8 leading-relaxed space-y-2  text-center ">
        Welcome To My Musik saya
      </h1>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-4
        md:p-30
        gap-6
        px-3
        md:gap-10
      ">
        {songs.map((song) => (
          <MusicCard key={song.id} song={song} />
        ))}
      </div>
    </main>
  );
}
