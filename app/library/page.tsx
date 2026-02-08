'use client';

import { Sidebar } from '@/components/Sidebar';
import { Player } from '@/components/Player';
import { TopBar } from '@/components/TopBar';
import { useLibraryStore } from '@/store/useLibraryStore';
import { SongRow } from '@/components/SongRow';

export default function LibraryPage() {
  const { likedSongs, playlists, recentPlays } = useLibraryStore();

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 space-y-8 px-6 py-8 lg:px-12">
          <TopBar />
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Liked Songs</h3>
            <div className="space-y-3">
              {likedSongs.map((song) => (
                <SongRow key={song.id} {...song} />
              ))}
              {likedSongs.length === 0 && (
                <p className="text-sm text-white/60">You haven't liked any songs yet.</p>
              )}
            </div>
          </section>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Your playlists</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="rounded-2xl border border-white/10 bg-spotify-card p-4">
                  <p className="text-lg font-semibold">{playlist.name}</p>
                  <p className="text-sm text-white/60">{playlist.tracks.length} tracks</p>
                </div>
              ))}
              {playlists.length === 0 && (
                <p className="text-sm text-white/60">No playlists yet. Create one to get started.</p>
              )}
            </div>
          </section>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Recently played</h3>
            <div className="space-y-3">
              {recentPlays.map((song) => (
                <SongRow key={song.id} {...song} />
              ))}
              {recentPlays.length === 0 && (
                <p className="text-sm text-white/60">Stream music to see your history here.</p>
              )}
            </div>
          </section>
        </main>
      </div>
      <Player />
    </div>
  );
}
