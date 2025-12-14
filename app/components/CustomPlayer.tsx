"use client";

interface Props {
  src: string;
}

export default function CustomPlayer({ src }: Props) {
  return (
    <audio
      src={src}
      controls
      preload="metadata"
      className="w-full mt-3"
    />
  );
}
