"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSongById, Song } from "@/app/api/songs";

export default function SongDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    if (!id) return;

    getSongById(Number(id))
      .then(setSong)
      .catch(console.error);
  }, [id]);

  if (!song) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black bg-gradient-to-b from-red-900/50 to-black text-white">


      {/* CONTENT */}
      <section className="max-w-6xl mx-auto md:px-6 p-4 py-10 flex flex-col gap-10">
        {/* COVER */}
        <div className="flex-shrink-0 justify-center flex">
          <img
            src={song.cover}
            alt={song.title}
            className="w-full h-full md:w-150 md:h-150 object-cover rounded-4xl shadow-2xl"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col  px-2 md:p-20">
          <div>
            <span className="text-zinc-400 uppercase font-bold text-xs tracking-wide">
              Song
            </span>

            <h1 className="text-3xl md:text-5xl md:my-5 font-bold mt-2">
              {song.title}
            </h1>

            <p className="text-zinc-300 mt-2 font-bold">{song.artist}</p>
          </div>

          {/* AUDIO */}
          <div className="pt-4 md:my-5 ">
            <audio
              controls
              preload="metadata"
              src={song.url}
              className="w-full"
            />
          </div>
          {/* BACK */}
          <div className="px-2  pt-6">
            <Link
              href="/"
              className="inline-block text-sm bg-transparent hover:bg-red-500/90 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded text-zinc-300 hover:text-white"
            >
              ← Back
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
