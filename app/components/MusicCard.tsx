"use client"


import { Song } from "@/api/songs";

export default function MusicCard({ song }: { song: Song }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 flex flex-col gap-3 shadow-md hover:bg-zinc-800 transition">
      {/* Cover */}
      <div className="w-full aspect-square overflow-hidden rounded-lg">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="min-h-auto">
        <h3 className="text-white text-sm font-semibold truncate">
          {song.title}
        </h3>
        <p className="text-zinc-400 text-xs truncate">
          {song.artist}
        </p>
      </div>

      {/* Audio */}
      <audio
        controls
        preload="metadata"
        src={song.url}
        className="w-full"
      />
    </div>
  );
}
