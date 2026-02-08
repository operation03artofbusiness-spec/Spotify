import { MediaCard } from '@/components/MediaCard';
import { Player } from '@/components/Player';
import { Sidebar } from '@/components/Sidebar';
import { SongRow } from '@/components/SongRow';
import { Toasts } from '@/components/Toasts';
import { TopBar } from '@/components/TopBar';
import { recommendedSongs, recentlyPlayed, trendingPlaylists } from '@/data/mockData';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 space-y-10 px-6 py-8 lg:px-12">
          <TopBar />
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Recently played</h3>
              <span className="text-sm text-white/50">View all</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recentlyPlayed.map((item) => (
                <div key={item.id} className="rounded-2xl bg-spotify-card p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                      <img src={item.artwork} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-white/60">{item.artist}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Trending playlists</h3>
              <span className="text-sm text-white/50">Explore</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {trendingPlaylists.map((playlist) => (
                <MediaCard
                  key={playlist.id}
                  title={playlist.title}
                  description={playlist.description}
                  artwork={playlist.artwork}
                />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Recommended songs</h3>
              <span className="text-sm text-white/50">For you</span>
            </div>
            <div className="space-y-3">
              {recommendedSongs.map((song) => (
                <SongRow key={song.id} {...song} />
              ))}
            </div>
          </section>
        </main>
      </div>
      <Player />
      <Toasts />
    </div>
  );
}
