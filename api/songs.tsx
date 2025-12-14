// lib/api/songs.js

const BASE_URL ="http://127.0.0.1:8000";

export interface Song {
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
    const data = await res.json();
   return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("gagal mengambil lagu:", err);
    return [];
  }
}


export async function getSongById(id: number ): Promise<Song[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/songs/${id}`);
    return await res.json();
  } catch (err) {
    console.error("Gagal mengambil detail lagu:", err);
    throw err
  }
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