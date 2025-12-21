"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getSongById, Song, getSongs } from "@/app/api/songs";




export default function SongDetailPage() {
  const params = useParams();
  const rawId = params.id;
  const router = useRouter();
  // const [song, setSong] = useState<Song | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);


  const id =
    typeof rawId === "string"
      ? Number(rawId)
      : Array.isArray(rawId)
        ? Number(rawId[0])
        : NaN;


  // 🔹 fetch semua lagu
  useEffect(() => {
    getSongs()
      .then((data) => {
        setSongs(data);

        const index = data.findIndex((s) => s.id === id);
        if (index !== -1) {
          setCurrentIndex(index);
        }
      })
      .catch(console.error);
  }, [id]);

  // 🔹 audio listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
    };
  }, [currentIndex]);

  // 🔹 autoplay saat ganti lagu
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();

    if (hasUserInteracted) {
      audioRef.current.play().catch(() => { });
    }
  }, [currentIndex, hasUserInteracted]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.addEventListener("ended", onEnded);
    };
  }, []);



  if (!songs.length || !songs[currentIndex]) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }
  if (Number.isNaN(id)) {
    return <div className="text-white">ID tidak valid</div>;
  }


  const song = songs[currentIndex];

  // toggle play
  const togglePlay = async () => {
    if (!audioRef.current) return;
    setHasUserInteracted(true);
    try {
      if (audioRef.current.paused) {
        await audioRef.current.play(); //  user click = OK
      } else {
        audioRef.current.pause();
      }
    } catch (err) {
      console.warn("Play blocked by browser:", err);
    }
  };


  // 🔥 NEXT / PREV
  const nextSong = () => {
    const next =
      currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(next);
    router.replace(`/songs/${songs[next].id}`);
  };

  const prevSong = () => {
    const prev =
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentIndex(prev);
    router.replace(`/songs/${songs[prev].id}`);
  };

  /* ================= FORMAT WAKTU ================= */
  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };



  return (
    <main className="min-h-screen  bg-gradient-to-b from-[#01227c] via-[#171342] to-[#03040a] text-white">


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
        <div className="flex flex-col   px-2 md:p-20">
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
          <div className="pt-4 my-2 bg-zinc-800 rounded-xl p-6 flex flex-col md:my-5 ">
            <audio

              preload="metadata"
              src={song.url}
              className="w-full"
              ref={audioRef}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                setIsPlaying(false);
                nextSong();
              }}
            />

            {/* PROGRESS */}
            <div className="flex flex-col  justify-between gap-1 text-xs text-zinc-400">
              <span>{formatTime(currentTime)}</span>

              {/* PROGRESS */}
              <input
                className="flex-1 w-full accent-red-500"
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => {
                  if (!audioRef.current) return;
                  const t = Number(e.target.value);
                  audioRef.current.currentTime = t;
                  setCurrentTime(t);
                }}
              />



              {/* CONTROL */}
              <div className="flex  items-center justify-center gap-6 md:gap-12 md:py-3 mt-4">
                <button
                  onClick={prevSong}
                  className="p-2 rounded-full hover:scale-110  cursor-pointer  bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-md"
                  aria-label="Next track"
                >
                  <svg xmlns="www.w3.org" className="w-9 h-9  md:w-15 md:h-15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                  </svg>
                </button>

                <button
                  onClick={togglePlay}
                  className="w-17 h-17  md:w-20 md:h-20 rounded-full cursor-pointer   bg-transparent border border-red-500  hover:bg-red-500/50  text-white
                       flex items-center justify-center text-2xl
                       hover:scale-110 active:scale-95 transition shadow-lg"
                >

                  {isPlaying ? (

                    /* PAUSE ICON */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6  md:w-8 md:h-8"
                    >
                      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                    </svg>

                  ) : (


                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6   md:w-8 md:h-8"
                    >
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>

                  )


                  }
                </button>

                <button
                  onClick={nextSong}
                  className="p-2 rounded-full hover:scale-110 bg-gray-700 cursor-pointer  text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-md"
                  aria-label="Next track"
                >
                  <svg xmlns="www.w3.org" className="w-9 h-9  md:w-15 md:h-15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                  </svg>
                </button>
              </div>

            </div>



          </div>
          {/* BACK */}
          <div className="px-2  pt-6">
            <Link
              href="/"
              className="inline-block text-sm bg-transparent hover:bg-red-500/90  font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded text-zinc-300 hover:text-white"
            >
              ← Back
            </Link>
          </div>
        </div>


      </section>
    </main>
  );
}
