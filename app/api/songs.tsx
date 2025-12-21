// lib/api/songs.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!

export interface Song {
  length: number;
  id: number;
  title: string;
  cover: string
  url: string
  artist?: string;
}
export interface LyricsResponse {
  lyrics: string;
}

export async function getSongs(): Promise<Song[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/songs`, {
      cache: "no-store",
    });
    const data: Song[] = await res.json();
    if (!Array.isArray(data)) return [];


    // 🔑 DEDUPLICATE BY ID
    const uniqueSongs = Array.from(
      new Map(data.map(song => [song.id, song])).values()
    );

    return uniqueSongs;


  } catch (err) {
    console.error("gagal mengambil lagu:", err);
    return [];
  }
}


export async function getSongById(id: number): Promise<Song> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/songs/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch song");
  }

  return res.json();
}

export async function getLyricsById(id: number): Promise<Song[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/songs/${id}/lyrics`
    );
    return await res.json();
  } catch (err) {
    console.error("Gagal ambil lirik:", err);
    throw err
  }
}