import Hero from "@/app/page/Hero";
import { getSongs } from "@/app/api/songs";
import SpotifyClient from "./components/SpotifyClient";

export default async function Page() {
 
 const  songs = await getSongs();

  return (
   <SpotifyClient songs={songs} />
  )
}
