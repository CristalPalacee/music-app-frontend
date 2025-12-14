"use client";

import { useEffect, useState } from "react";
import { getSongs } from "@/api/songs";
import MusicCard from "./components/MusicCard";
import { useRouter } from "next/navigation";
import { startListening } from "@/app/components/startListening";

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function Home() {
  const router = useRouter();
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getSongs();
      console.log("SONGS FETCHED:", data);
      setSongs(data);
    };

    fetchSongs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3b1d1d] via-65% to-black p-6 md:p-12 space-y-10">

      {/* Header */}
      <header className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl text-white font-extrabold">MyMusic</h1>
        <input
          type="text"
          placeholder="Search songs, artists..."
          className="bg-neutral-800 text-white p-2 rounded-xl w-60 focus:outline-none"
        />
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-12 shadow-xl text-center">
        <h2 className="text-3xl text-amber-50 font-extrabold">
          Welcome To Discover Music
        </h2>

        <p className="text-neutral-200 mt-6">
          Selamat datang di website musik pribadi saya.
        </p>

        <button
          onClick={() => startListening(songs, router)}
          className="mt-6 bg-white hover:bg-red-950/50 text-black px-6 py-2 rounded-full font-semibold shadow"
        >
          Start Listening
        </button>
      </section>

      {/* List Lagu */}
      <section>
        <h3 className="text-2xl text-center text-white my-11 font-extrabold">
          Daftar Lagu Indonesia
        </h3>

        <div className="grid md:grid-cols-3 md:p-20 gap-6">
          {songs.map((song) => (
            <MusicCard
              key={song.id}
              id={song.id}
              title={song.title}
              artist={song.artist}
              cover={`${BASE_URL}${song.cover}`}
              audioUrl={`${BASE_URL}${song.url}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
