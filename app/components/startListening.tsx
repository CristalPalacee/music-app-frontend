import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type Song = {
  id: number;
};

export function startListening(
  songs: Song[],
  router: AppRouterInstance,
  setCanAutoPlay?: (v: boolean) => void
) {
  if (!songs || songs.length === 0) return;

  const randomIndex = Math.floor(Math.random() * songs.length);
  const randomSong = songs[randomIndex];

  // khusus MusicDetail
  if (setCanAutoPlay) {
    setCanAutoPlay(true);
  }

  router.push(`/music/${randomSong.id}`);
}
