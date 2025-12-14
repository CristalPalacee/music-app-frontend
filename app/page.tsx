"use client";
import { startListening } from "@/app/components/startListening";

import { useEffect, useState } from "react";
import { getSongById, getSongs } from "@/api/songs";
// import CustomPlayer from "@/app/CustomPlayer";
// import ThemeToggle from "@/app/components/ThemeToggle";
import MusicCard from "./components/MusicCard";
import { useRouter } from "next/navigation";
// TYPE untuk data lagu
interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}
// async function getSongs() {
//   const res = await fetch("http://localhost:8000/api/songs", {
//     cache: "no-store",
//   });
//   return res.json();
// }


export default function Home() {

  //  const songs = await getSongs();
  
  const router = useRouter();
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);

  // Ambil daftar lagu
  useEffect(() => {
    getSongs().then((data: Song[]) => setSongs(data));
  }, []);

  // Mendengar event NEXT dari CustomPlayer
  useEffect(() => {
    const handler = (e: any) => {
      setCurrentSongIndex(e.detail);
    };

    window.addEventListener("change-song", handler);
    return () => window.removeEventListener("change-song", handler);
  }, []);

  useEffect(() => {
    if (currentSongIndex !== null) {
      window.dispatchEvent(
        new CustomEvent("change-song", { detail: currentSongIndex })
      );
    }
  }, [currentSongIndex])
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3b1d1d] via-65% to-black p-6  md:p-12 space-y-10">

      {/* Header */}
      <header className="flex flex-col items-center justify-center text-center space-y-4 w-full">
        <h1 className="text-3xl text-center text-white w-full font-extrabold">MyMusic</h1>

        <input
          type="text"
          placeholder="Search songs, artists..."
          className="bg-neutral-800 text-white p-2 rounded-xl w-60 focus:outline-none"
        />
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-12 shadow-xl text-center">
        <h2 className="text-3xl text-amber-50 font-extrabold">Welcome To Discover Music</h2>

        <p className="text-neutral-200 mt-6 leading-relaxed">
          Selamat datang di website musik pribadi saya. <br />
          Di sini Anda dapat menemukan kumpulan karya, eksperimen audio, dan
          berbagai proyek musik yang sedang saya kembangkan. <br />
          Terima kasih telah berkunjung.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button onClick={() => startListening(songs, router)} className="mt-6 hover:bg-red-950/50 bg-white cursor-pointer text-black px-6 py-2 rounded-2xl md:rounded-full font-semibold shadow">
            Start Listening
          </button>
          {/* <ThemeToggle /> */}
        </div>
      </section>

      {/* List Lagu */}
      <section>
        <h3 className="text-2xl text-center text-white my-11 font-extrabold mb-7">
          Daftar Lagu Indonesia
        </h3>

        <div className="grid md:grid-cols-3 md:p-20 font-bold text-amber-50 md:gap-7 gap-5">
          {songs.map((song: any) => (
            <MusicCard
              key={song.id}
              id={song.id}
              title={song.title}
              artist={song.artist}
              cover={song.cover}
            />
            
          ))}
        </div>
      </section>

    </div>
  );
}
