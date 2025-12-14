"use client";

import CustomPlayer from "./CustomPlayer";

interface Props {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
}

export default function MusicCard({
  title,
  artist,
  cover,
  audioUrl,
}: Props) {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 shadow">
      <img
        src={cover}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
        loading="lazy"
      />

      <h4 className="mt-3 text-lg font-bold text-white">{title}</h4>
      <p className="text-neutral-400">{artist}</p>

      <CustomPlayer src={audioUrl} />
    </div>
  );
}
