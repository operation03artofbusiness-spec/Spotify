'use client';

import { useMemo, useState } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { Sidebar } from '@/components/Sidebar';
import { Player } from '@/components/Player';
import { SongRow } from '@/components/SongRow';
import { TopBar } from '@/components/TopBar';
import { recommendedSongs } from '@/data/mockData';

const artists = [
  { id: 'artist-1', name: 'Nova Blue', genre: 'Electro Pop' },
  { id: 'artist-2', name: 'Mira Lane', genre: 'Indie Soul' },
  { id: 'artist-3', name: 'Pulse Theory', genre: 'Future Bass' }
];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredSongs = useMemo(() => {
    return recommendedSongs.filter((song) =>
      `${song.title} ${song.artist}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => artist.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 space-y-8 px-6 py-8 lg:px-12">
          <TopBar />
          <SearchInput value={query} onChange={setQuery} />
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Songs</h3>
            <div className="space-y-3">
              {filteredSongs.map((song) => (
                <SongRow key={song.id} {...song} />
              ))}
              {filteredSongs.length === 0 && (
                <p className="text-sm text-white/60">No songs matched your search.</p>
              )}
            </div>
          </section>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Artists</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {filteredArtists.map((artist) => (
                <div key={artist.id} className="rounded-2xl border border-white/10 bg-spotify-card p-4">
                  <p className="text-lg font-semibold">{artist.name}</p>
                  <p className="text-sm text-white/60">{artist.genre}</p>
                </div>
              ))}
              {filteredArtists.length === 0 && (
                <p className="text-sm text-white/60">No artists matched your search.</p>
              )}
            </div>
          </section>
        </main>
      </div>
      <Player />
    </div>
  );
}
