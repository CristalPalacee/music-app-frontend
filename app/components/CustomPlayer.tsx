"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

declare global {
  interface Window {
    __audios?: HTMLAudioElement[];
  }
}

export default function CustomPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!window.__audios) window.__audios = [];
    if (audioRef.current) window.__audios.push(audioRef.current);

    return () => {
      window.__audios = window.__audios?.filter(
        (a) => a !== audioRef.current
      );
    };
  }, []);

  const pauseOthers = () => {
    window.__audios?.forEach((a) => {
      if (a !== audioRef.current) a.pause();
    });
  };

const togglePlay = () => {
  if (!audioRef.current) return;

  if (!playing) {
    window.__audios?.forEach((a) => {
      if (a !== audioRef.current) a.pause();
    });
    audioRef.current.play().catch(console.error);
  } else {
    audioRef.current.pause();
  }

  setPlaying(!playing);
};

  return (
    <div>
      <button onClick={togglePlay}>
        {playing ? <Pause /> : <Play />}
      </button>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={pauseOthers}
      />
    </div>
  );
}
