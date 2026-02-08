import { LyricsLine } from '../types/music';

export const fetchLyrics = async (artist: string, title: string): Promise<LyricsLine[]> => {
  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await response.json();
    if (!data.lyrics) return [];
    return data.lyrics
      .split('\n')
      .filter(Boolean)
      .map((line: string, index: number) => ({
        time: index * 4000,
        text: line,
      }));
  } catch (error) {
    return [];
  }
};
