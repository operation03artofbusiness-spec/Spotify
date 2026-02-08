export type Song = {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  album: string;
  artworkUrl: string;
  audioUrl: string;
  duration: number;
};

export type Playlist = {
  id: string;
  name: string;
  artworkUrl: string;
  songIds: string[];
};

export type Artist = {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
  followers: number;
  monthlyListeners: number;
};

export type LyricsLine = {
  time: number;
  text: string;
};
