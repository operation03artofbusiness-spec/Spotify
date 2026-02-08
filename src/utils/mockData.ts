import { Artist, Playlist, Song } from '../types/music';

export const mockSongs: Song[] = [
  {
    id: 'song-1',
    title: 'Midnight Drive',
    artistId: 'artist-1',
    artistName: 'Nova Ray',
    album: 'Neon Nights',
    artworkUrl: 'https://images.unsplash.com/photo-1511376777868-611b54f68947',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 240000,
  },
  {
    id: 'song-2',
    title: 'Echoes',
    artistId: 'artist-2',
    artistName: 'The Drift',
    album: 'Tidal',
    artworkUrl: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 210000,
  },
  {
    id: 'song-3',
    title: 'Ocean Lights',
    artistId: 'artist-3',
    artistName: 'Luna & Co',
    album: 'Moonlit',
    artworkUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 200000,
  },
  {
    id: 'song-4',
    title: 'Solar Flare',
    artistId: 'artist-1',
    artistName: 'Nova Ray',
    album: 'Neon Nights',
    artworkUrl: 'https://images.unsplash.com/photo-1463412855783-1f99d0a9345f',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 260000,
  },
  {
    id: 'song-5',
    title: 'Drift Away',
    artistId: 'artist-2',
    artistName: 'The Drift',
    album: 'Tidal',
    artworkUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 230000,
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: 'playlist-1',
    name: 'Top Hits',
    artworkUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    songIds: ['song-1', 'song-2', 'song-3'],
  },
  {
    id: 'playlist-2',
    name: 'Late Night',
    artworkUrl: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1',
    songIds: ['song-4', 'song-5'],
  },
  {
    id: 'playlist-3',
    name: 'Focus Mode',
    artworkUrl: 'https://images.unsplash.com/photo-1461783436728-0a921771469f',
    songIds: ['song-1', 'song-4'],
  },
  {
    id: 'playlist-4',
    name: 'Weekend Vibes',
    artworkUrl: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf',
    songIds: ['song-2', 'song-3'],
  },
];

export const mockArtists: Artist[] = [
  {
    id: 'artist-1',
    name: 'Nova Ray',
    imageUrl: 'https://images.unsplash.com/photo-1485579149621-3123dd979885',
    bio: 'Nova Ray blends synthwave with cinematic textures and neon-inspired beats.',
    followers: 120340,
    monthlyListeners: 860000,
  },
  {
    id: 'artist-2',
    name: 'The Drift',
    imageUrl: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee',
    bio: 'The Drift is known for oceanic soundscapes and ambient guitar riffs.',
    followers: 98200,
    monthlyListeners: 540000,
  },
  {
    id: 'artist-3',
    name: 'Luna & Co',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    bio: 'Luna & Co bring dreamy vocals with lush, spacey arrangements.',
    followers: 70210,
    monthlyListeners: 410000,
  },
];
