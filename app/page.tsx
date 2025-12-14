"use client";

// import { Play, Pause, SkipBack, SkipForward, Heart, Home, Search, LibraryBig } from "lucide-react";
import { useState,useEffect } from "react";
import {getSongs, Song} from "@/api/songs"
import MusicCard from "./components/MusicCard";


export default function SpotifyLikeUI() {
  const [playing, setPlaying] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);

 useEffect(() => {
    getSongs()
    .then(setSongs)
    .catch(console.error);
  }, []);


  // if (loading) return <p>Loading...</p>;





  return (
      <main className="min-h-screen bg-gradient-to-b from-red-900/50 to-black bg-black  p-6">
      <h1 className="text-white text-3xl font-bold md:pt-8 p-8 leading-relaxed space-y-2  text-center ">
        Welcome <br/> To <br/> My Musik
      </h1>

      <div className="
        grid
        grid-cols
        md:grid-cols-4
        md:p-30
        gap-6
        md:gap-10
      ">
        {songs.map((song) => (
          <MusicCard key={song.id} song={song} />
        ))}
      </div>
    </main>
  );
}
