import { getSongs,Song } from "../api/songs"



export default function Image({song}: {song: Song}){
    return(
   <div aria-label="Photos of leaders" className="mt-12 flex max-w-4xl w-full pb-6">
            <img 
                alt={song.title}
                className="w-25 h-30 md:h-60 md:w-60  rounded-2xl md:rounded-3xl hover:-translate-y-1 transition duration-300 object-cover flex-shrink-0" 
                src={song.cover}
                width="150" />
        </div>
    )
} 