"use client";

import { useEffect, useRef, useState } from "react";
import { Song } from "@/app/api/songs";
// import Overlay from "../components/Overlay"
import SpotifyClient from "../components/SpotifyClient";
import Overlay from "../context/OverlayCard";
import { PlayerProvider } from "../context/PlayerContext";
import { Shuffle } from "lucide-react";


type  Props = {

   onRandom?: () => void;
   songs: Song[];
}



export default function Hero({ songs, onRandom }: Props) {
 


   



  return (
    <section className="text-center py-10  w-full h-full text-white">

      <div className="flex flex-col items-center justify-center gap-5 lg:mt-20 px-8 sm:px-10 max-w-7xl mx-auto text-center">
        <h1 className="mt-5 text-white font-bold text-4xl sm:text-4xl md:text-6xl max-w-2xl lg:leading-relaxed leading-tight">
          Welcome to My musik{" "}
          <span className="text-indigo-400">Play songs</span>
        </h1>
        <p className="mt-0 lg:leading-relaxed text-white/80 max-w-md text-sm sm:text-base">
          Discover and play your favorite music instantly.
        </p>
        <button
         onClick={onRandom}
          className="bg-transparent items-center justify-center inline-flex gap-2 border-2 border-blue-600 cursor-pointer hover:bg-blue-900/50 px-6 py-2 rounded-full"
        >
          Putar Sekarang
          <Shuffle size={17} />
        </button>
   
      </div>

   

   



    </section>
  );
}
