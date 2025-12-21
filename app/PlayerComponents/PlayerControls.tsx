"use client";

import { RefObject } from "react";
import { Song } from "@/app/api/songs";
import PlayRandomButton from "./PlayRandomButton";

type Props = {
  currentSong: Song | null;
  audioRef: RefObject<HTMLAudioElement | null> ;
  onPlayRandom: () => void;
};

export default function PlayerControls({
  currentSong,
  audioRef,
  onPlayRandom,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <PlayRandomButton onPlay={onPlayRandom} />

      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.url}
          autoPlay
         
          onEnded={onPlayRandom}
        />
      )}
    </div>
  );
}
