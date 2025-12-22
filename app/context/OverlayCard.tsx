"use client";

import { Song } from "@/app/api/songs";
import { Play, Pause, X, SkipBack, SkipForward, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    song: Song;
    onNext?: () => void;
    onPrev?: () => void;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    onClose: () => void;
};

declare global {
    interface Window {
        __audios?: HTMLAudioElement[];
    }
}


type OverlayMode = "mini" | "expanded";

export default function Overlay({
    song,
    audioRef,
    onClose,
    onNext,
    onPrev,
}: Props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [mode, setMode] = useState<OverlayMode>("mini");

    /* ================= AUDIO SYNC ================= */
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        setIsPlaying(!audio.paused);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
        };
    }, [audioRef, song]);



    /* ================= AUDIO SYNC + PAUSE OTHER ================= */
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => {
            setIsPlaying(true);

            // 🔥 PAUSE AUDIO LAIN
            window.__audios?.forEach((a) => {
                if (a !== audio) a.pause();
            });
        };

   const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef, song]);




        const togglePlay = () => {
            const audio = audioRef.current;
            if (!audio) return;
            audio.paused ? audio.play() : audio.pause();
        };


        /* ================= UI ================= */
        return (
            <div
                onClick={() => {
                    if (mode === "mini") setMode("expanded");
                }}
                className={`
        fixed left-0 right-0 z-50
        bg-[#020617]/95 backdrop-blur-md border-t border-white/10
        transition-all duration-500 ease-in-out
        ${mode === "mini"
                        ? "bottom-0 h-20"
                        : "top-0 bottom-0 h-screen border-t-0"}
      `}
            >
                {/* ================= AUDIO (SATU SAJA) ================= */}
                <audio ref={audioRef} src={song.url} autoPlay preload="metadata" />

                {/* ================= MINI PLAYER ================= */}
                {mode === "mini" && (
                    <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 h-full">
                        {/* COVER */}
                        <img
                            src={song.cover}
                            alt={song.title}
                            className="w-12 h-12 rounded-md object-cover"
                        />

                        {/* INFO */}
                        <div className="flex-1 overflow-hidden">
                            <p className="text-white text-sm font-semibold truncate">
                                {song.title}
                            </p>
                            <p className="text-white/60 text-xs truncate">
                                {song.artist}
                            </p>
                        </div>

                        {/* CONTROLS */}
                        <div
                            className="flex items-center gap-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {onPrev && (
                                <button onClick={onPrev} className="text-white/70 hover:text-white">
                                    <SkipBack size={20} />
                                </button>
                            )}

                            <button
                                onClick={togglePlay}
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                            >
                                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                            </button>

                            {onNext && (
                                <button onClick={onNext} className="text-white/70 hover:text-white">
                                    <SkipForward size={20} />
                                </button>
                            )}
                        </div>

                        {/* CLOSE */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className="text-white/60 hover:text-white"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

                {/* ================= EXPANDED PLAYER ================= */}
                {mode === "expanded" && (
                    <div className="h-full flex flex-col items-center justify-between px-6 py-6">
                        {/* HEADER */}
                        <div className="w-full flex items-center justify-between">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMode("mini");
                                }}
                                className="text-white/70 hover:text-white"
                            >
                                <ChevronDown size={26} />
                            </button>

                            <p className="text-white text-sm font-semibold">
                                Playing now
                            </p>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                }}
                                className="text-white/70 hover:text-white"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {/* COVER */}
                        <img
                            src={song.cover}
                            alt={song.title}
                            className="w-72 h-72 rounded-2xl object-cover shadow-2xl"
                        />

                        {/* INFO */}
                        <div className="text-center">
                            <h1 className="text-white text-xl font-bold">
                                {song.title}
                            </h1>
                            <p className="text-white/60 mt-1">
                                {song.artist}
                            </p>
                        </div>

                        {/* CONTROLS */}
                        <div
                            className="flex items-center gap-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {onPrev && (
                                <button onClick={onPrev} className="text-white/80">
                                    <SkipBack size={28} />
                                </button>
                            )}

                            <button
                                onClick={togglePlay}
                                className="w-16 h-16 rounded-full bg-white flex items-center justify-center"
                            >
                                {isPlaying ? <Pause size={26} /> : <Play size={26} />}
                            </button>

                            {onNext && (
                                <button onClick={onNext} className="text-white/80">
                                    <SkipForward size={28} />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
