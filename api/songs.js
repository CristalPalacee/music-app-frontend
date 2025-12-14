// lib/api/songs.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSongs() {
  try {
    const res = await fetch(`${BASE_URL}/api/songs`);

    if (!res.ok) {
      console.error("Fetch failed:", res.status);
      return [];
    }

    const data = await res.json();

    // ✅ BACKEND RETURN ARRAY
    if (Array.isArray(data)) {
      return data;
    }

    // (opsional kalau suatu hari backend berubah)
    if (Array.isArray(data?.songs)) {
      return data.songs;
    }

    console.error("Unexpected songs response:", data);
    return [];
  } catch (err) {
    console.error("Gagal mengambil lagu:", err);
    return [];
  }
}


export async function getSongById(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/songs/${id}`);
    return await res.json();
  } catch (err) {
    console.error("Gagal mengambil detail lagu:", err);
    return null;
  }
}
export async function getLyricsById(id) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/songs/${id}/lyrics`
    );
    return await res.json();
  } catch (err) {
    console.error("Gagal ambil lirik:", err);
    return { lyrics: "" };
  }
}