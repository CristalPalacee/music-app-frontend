// PlaylistPlayer.tsx
import { useState, useRef } from "react";
import CustomPlayer from "@/app/CustomPlayer";

interface Song {
    id: number;
    title: string;
    url: string;
}

const songs: Song[] = [
    { id: 1, title: "Song One", url: "/music/song1.mp3" },
    { id: 2, title: "Song Two", url: "/music/song2.mp3" },
    { id: 3, title: "Song Three", url: "/music/song3.mp3" },
];

export default function PlaylistPlayer() {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

    const handlePlay = (index: number) => {
        // Stop all currently playing audios
        audioRefs.current.forEach((audio, i) => {
            if (audio && i !== index) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        setCurrentIndex(index);
    };

    const handleNext = () => {
        if (currentIndex === null) return;

        const nextIndex = (currentIndex + 1) % songs.length;
        setCurrentIndex(nextIndex);
    };

    const handlePrev = () => {
        if (currentIndex === null) return;

        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        setCurrentIndex(prevIndex);
    };

    return (
        <div className="space-y-5">
            {songs.map((song, index) => (
                <CustomPlayer
                    key={song.id}
                    ref={(el) => (audioRefs.current[index] = el)}
                    title={song.title}
                    url={song.url}
                    isActive={currentIndex === index}
                    onPlay={() => handlePlay(index)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            ))}
        </div>
    );
}
