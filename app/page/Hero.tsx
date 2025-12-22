"use client";

import { useEffect, useRef, useState } from "react";
import { Song } from "@/app/api/songs";
// import Overlay from "../components/Overlay"
import SpotifyClient from "../components/SpotifyClient";
import Overlay from "../context/OverlayCard";
import { PlayerProvider } from "../context/PlayerContext";



export default function Hero({ songs }: { songs: Song[] }) {
 


   



  return (
    <section className="text-center py-10  text-white">

      <div className="flex flex-col items-center justify-center gap-5 px-8 sm:px-10 max-w-7xl mx-auto text-center">
        <h1 className="mt-5 text-white font-bold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-relaxed">
          Welcome to My musik{" "}
          <span className="text-indigo-400">Play songs</span>
        </h1>
        <p className="mt-4 text-white/80 max-w-md text-sm sm:text-base">
          Discover and play your favorite music instantly.
        </p>
        <button
         
          className="bg-transparent border-2 border-blue-600 cursor-pointer hover:bg-blue-900/50 px-6 py-2 rounded-full"
        >
          Putar Sekarang
        </button>
   
      </div>

   

   



    </section>
  );
}
