"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface Props {
  src: string;
}

export default function CustomPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <div className="mt-3 flex items-center gap-4 bg-white rounded-full px-4 py-2 shadow">
      {/* Play Button */}
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-black/10 transition"
      >
        {playing ? (
          <Pause size={20} className="text-black" />
        ) : (
          <Play size={20} className="text-black" />
        )}
      </button>

      {/* Progress (native hidden audio) */}
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}
