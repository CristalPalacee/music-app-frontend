import Link from "next/link";

type MusicCardProps = {
  id: number;
  title: string;
  artist: string;
  cover: string;
};

export default function MusicCard({
  id,
  title,
  artist,
  cover,

}: MusicCardProps) {
  return (
    <Link href={`/music/${id}`}>
      <div className="bg-neutral-800 rounded-xl p-4 hover:bg-neutral-700 transition cursor-pointer">
        <img
          src={`http://localhost:8000${cover}`}
          alt={title}
          className="rounded-lg mb-3 w-full h-40 object-cover"
        />
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{artist}</p>
      </div>
    </Link>
  );
}
