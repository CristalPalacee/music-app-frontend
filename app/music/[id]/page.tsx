"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSongById, getLyricsById, getSongs } from "@/api/songs";
import { Play, Pause } from "lucide-react";

type Song = {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
};

export default function MusicDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [song, setSong] = useState<Song | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [lyrics, setLyrics] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [canAutoPlay, setCanAutoPlay] = useState(false);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!id) return;
    getSongById(id).then(setSong);
    getLyricsById(id).then((res) => setLyrics(res.lyrics));
  }, [id]);

  useEffect(() => {
    getSongs().then(setSongs);
  }, []);



// useEffect(() => {
//   if (performance.navigation.type === 1) {
//     router.replace("/");
//   }
// }, [router]);


  /* ================= NEXT SONG ================= */
  const playNextSong = useCallback(() => {
    if (!song || songs.length === 0) return;

    const index = songs.findIndex((s) => s.id === song.id);
    const nextSong = songs[index + 1] ?? songs[0];

    router.push(`/music/${nextSong.id}`);
  }, [song, songs, router]);

/* ================= START LISTENING (SHUFFLE) ================= */




  /* ================= AUDIO EVENTS ================= */
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setCurrentTime(0);
    };
    const onEnded = () => {
      if (canAutoPlay) playNextSong();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [playNextSong, canAutoPlay]);

  /* ================= RESET SAAT GANTI LAGU ================= */
  useEffect(() => {
    if (!audioRef.current) return;
    if (canAutoPlay) return
    const audio = audioRef.current
    audio.currentTime = 0
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // autoplay diblokir browser (normal)
      });
  }, [song, canAutoPlay]);

  /* ================= CONTROLS ================= */
  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play(); // USER ACTION ✔
        setIsPlaying(true);
        setCanAutoPlay(true);
      }
    } catch (err) {
      console.error("Play blocked:", err);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  if (!song) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3b1d1d] via-black to-black text-white px-6 py-8 md:pl-64">
      <div className="flex flex-col items-center gap-10 max-w-6xl mx-auto">

        {/* COVER */}
        <img
          src={`http://localhost:8000${song.cover}`}
          alt={song.title}
          className="w-72 h-72 md:w-96 md:h-96 rounded-xl shadow-2xl object-cover"
        />

        {/* INFO */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">{song.title}</h1>
          <p className="text-gray-300">{song.artist}</p>
        </div>

        {/* AUDIO */}
        <audio
          ref={audioRef}
          src={`http://localhost:8000${song.url}`}
          preload="metadata"
        />

        {/* PLAYER */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={(e) => {
                if (!audioRef.current) return;
                audioRef.current.currentTime = Number(e.target.value);
                setCurrentTime(Number(e.target.value));
              }}
              className="flex-1 h-1 accent-white cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex justify-center">
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition"
            >
              {isPlaying ? <Pause size={26} /> : <Play size={26} />}
            </button>
          </div>
        </div>

        {/* LYRICS */}
        <div className="w-full mt-12">
          <h2 className="text-xl text-center font-semibold mb-6">Lirik</h2>
          <div className="whitespace-pre-line text-gray-300 leading-8 md:text-2xl">
            {lyrics || "Lirik belum tersedia"}
          </div>
        </div>

      </div>
    </div>
  );
}
