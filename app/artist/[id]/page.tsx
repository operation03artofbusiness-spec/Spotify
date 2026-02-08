import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Player } from '@/components/Player';
import { SongRow } from '@/components/SongRow';
import { recommendedSongs } from '@/data/mockData';

const artistProfiles = {
  'nova-blue': {
    name: 'Nova Blue',
    bio: 'A luminous blend of electro-pop and cinematic soundscapes.',
    followers: '1.2M',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80'
  }
};

export default function ArtistPage({ params }: { params: { id: string } }) {
  const artist = artistProfiles[params.id as keyof typeof artistProfiles] ?? artistProfiles['nova-blue'];

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 space-y-8 px-6 py-8 lg:px-12">
          <Link href="/" className="text-sm text-white/60">
            ← Back to Home
          </Link>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-spotify-card">
            <img src={artist.image} alt={artist.name} className="h-64 w-full object-cover opacity-70" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 p-6">
              <p className="text-sm uppercase tracking-[0.4em] text-spotify-green">Artist</p>
              <h1 className="text-4xl font-semibold">{artist.name}</h1>
              <p className="mt-2 max-w-2xl text-sm text-white/70">{artist.bio}</p>
              <p className="mt-4 text-sm text-white/60">{artist.followers} followers</p>
              <button className="mt-4 w-fit rounded-full bg-spotify-green px-5 py-2 text-sm font-semibold text-black">
                Follow
              </button>
            </div>
          </div>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Top tracks</h3>
            <div className="space-y-3">
              {recommendedSongs.map((song) => (
                <SongRow key={song.id} {...song} />
              ))}
            </div>
          </section>
        </main>
      </div>
      <Player />
    </div>
  );
}
