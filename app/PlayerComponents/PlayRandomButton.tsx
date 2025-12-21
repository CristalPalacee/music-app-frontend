"use client";

type Props = {
  onPlay: () => void;
};

export default function PlayRandomButton({ onPlay }: Props) {
  return (
    <button
      onClick={onPlay}
      className="bg-transparent border-2 border-blue-600 hover:bg-blue-600/50 text-white px-6 py-2 rounded-full font-semibold"
    >
       Putar Sekarang
    </button>
  );
}
