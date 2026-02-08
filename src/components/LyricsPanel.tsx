'use client';

import { useEffect, useState } from 'react';

interface LyricsPanelProps {
  trackTitle: string;
  artist: string;
}

export function LyricsPanel({ trackTitle, artist }: LyricsPanelProps) {
  const [lyrics, setLyrics] = useState<string>('Loading lyrics...');

  useEffect(() => {
    const controller = new AbortController();
    const fetchLyrics = async () => {
      try {
        const response = await fetch(`/api/lyrics?track=${encodeURIComponent(trackTitle)}&artist=${encodeURIComponent(artist)}`);
        const data = await response.json();
        setLyrics(data.lyrics ?? 'Lyrics unavailable.');
      } catch (error) {
        setLyrics('Lyrics unavailable.');
      }
    };
    fetchLyrics();
    return () => controller.abort();
  }, [trackTitle, artist]);

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">Lyrics</p>
      <div className="mt-3 max-h-40 overflow-y-auto whitespace-pre-line text-sm text-white/70">
        {lyrics}
      </div>
    </div>
  );
}
