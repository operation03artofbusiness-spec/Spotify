'use client';

import Image from 'next/image';
import { usePlayerStore } from '@/store/usePlayerStore';

interface SongRowProps {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  duration: string;
}

export function SongRow({ id, title, artist, artwork, duration }: SongRowProps) {
  const { playTrack } = usePlayerStore();

  return (
    <button
      onClick={() => playTrack({ id, title, artist, artwork, duration })}
      className="flex w-full items-center gap-4 rounded-xl border border-white/5 bg-black/30 p-4 text-left transition hover:border-white/20 hover:bg-white/10"
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-lg">
        <Image src={artwork} alt={title} fill className="object-cover" unoptimized />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-white/60">{artist}</p>
      </div>
      <span className="text-sm text-white/60">{duration}</span>
    </button>
  );
}
