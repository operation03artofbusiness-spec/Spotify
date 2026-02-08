export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  artworkUrl: string;
  audioUrl: string;
  duration: number;
  isLiked?: boolean;
  lyricsId?: string;
  artistId: string;
};

export type Playlist = {
  id: string;
  name: string;
  description?: string;
  artworkUrl?: string;
  trackIds: string[];
  ownerId: string;
};

export type Artist = {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
  followers: number;
  monthlyListeners: number;
};

export type UserProfile = {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
};

export type LyricsLine = {
  time: number;
  text: string;
};
