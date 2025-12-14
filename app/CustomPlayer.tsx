"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipForward } from "lucide-react";

interface PlayerProps {
    url: string;
    songs: song[];
    currentIndex: number;
}

export default function CustomPlayer({ url, songs, currentIndex }: PlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // 🔥 STOP SEMUA PLAYER LAIN
    useEffect(() => {
        const stop = () => {
            setIsPlaying(false);
            audioRef.current?.pause();
        };

        window.addEventListener("stop-all-player", stop);
        return () => window.removeEventListener("stop-all-player", stop);
    }, []);

    // 🔥 AUTO PLAY jika Home mengubah currentSongIndex
    useEffect(() => {
        const handler = (e: any) => {
            if (e.detail === currentIndex) {
                // Stop others
                window.dispatchEvent(new Event("stop-all-player"));

                // Set audio baru
                setIsPlaying(true);

                // Tunggu render audioRef 0.1 detik
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                        audioRef.current.play();
                    }
                }, 100);
            }
        };

        window.addEventListener("change-song", handler);
        return () => window.removeEventListener("change-song", handler);
    }, [currentIndex]);

    // Play / pause tombol
    const togglePlay = () => {
        if (!audioRef.current) return;

        if (!isPlaying) {
            window.dispatchEvent(new Event("stop-all-player"));
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Update waktu dan progress bar
    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration || 0);
            setProgress((audio.currentTime / (audio.duration || 1)) * 100);
        }
    };

    // Geser progress bar
    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;

        const value = Number(e.target.value);
        audioRef.current.currentTime = (value / 100) * duration;
        setProgress(value);
    };

    // NEXT lagu manual
    const handleNextSong = () => {

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }



        const nextIndex = currentIndex + 1;
        if (nextIndex < songs.length) {
            window.dispatchEvent(
                new CustomEvent("change-song", { detail: nextIndex })
            );
        }
    };

    // NEXT otomatis saat lagu selesai
    const handleEnded = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
        handleNextSong();
    };

    // Format menit:detik
    const formatTime = (sec: number) => {
        if (!sec || isNaN(sec)) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="mt-3">
            <audio
                ref={audioRef}
                src={url}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />

            <div className="flex items-center gap-3">
                {/* PLAY / PAUSE */}
                <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-neutral-700 flex justify-center items-center"
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                {/* NEXT */}
                <button
                    onClick={handleNextSong}
                    className="w-10 h-10 rounded-full bg-neutral-700 flex justify-center items-center"
                >
                    <SkipForward size={20} />
                </button>

                {/* PROGRESS BAR */}
                <div className="flex-1">
                    <input
                        type="range"
                        value={progress}
                        className="w-full accent-purple-500"
                        onChange={handleProgressChange}
                    />

                    <div className="flex justify-between text-xs text-neutral-400">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
