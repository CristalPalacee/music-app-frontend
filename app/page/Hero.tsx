
import { Song } from "../api/songs"
import Image from "./Image";

type Props = {
songs: Song[];
};
export default function Hero({songs}: Props) {
    return (
<header className="w-full mt-2 bg-gradient-to-b from-[#244bbe] via-[#0d2966] to-[#020613]/2 h-full min-hecreen">
 <main className="flex justify-center items-center flex-col px-6 sm:px-10 max-w-7xl mx-auto w-full">
     
        <h1 className="text-center mt-5 text-white font-bold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
           Welcome to My musik
            <span className="text-indigo-500">
                Play songs
            </span>
        </h1>
        <p className="mt-4 text-center text-white max-w-md text-sm sm:text-base leading-relaxed">
            Learn why professionals trust our solution to complete
            their customer journey.
        </p>
        <button
            className="mt-8 inline-block text-sm bg-transparent hover:bg-blue-500/50 text-blue-00 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-zinc-300 hover:text-white"
            type="button">
            <span>
                Letsgoo
            </span>
        
        </button>
        <div className="flex gap-6 p-2 mb-3">
           
             {songs.slice(0, 3).map((song) => (
            <Image key={song.id} song={song} />
          ))}
     
        </div>
     
    </main>
</header>

    )
} 