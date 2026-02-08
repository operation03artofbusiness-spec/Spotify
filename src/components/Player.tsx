'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { cacheTrackForOffline, getCachedTrackUrl } from '@/lib/offlineCache';
import { LyricsPanel } from './LyricsPanel';

const fallbackUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp3';

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentTrack, isPlaying, togglePlay, volume, setVolume, shuffle, repeat, toggleShuffle, toggleRepeat } =
    usePlayerStore();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioSrc, setAudioSrc] = useState<string>(fallbackUrl);

  useEffect(() => {
    if (!currentTrack) return;
    const resolveSource = async () => {
      if (!navigator.onLine) {
        const cached = await getCachedTrackUrl(currentTrack.id);
        if (cached) {
          setAudioSrc(cached);
          return;
        }
      }
      setAudioSrc(currentTrack.audioUrl ?? fallbackUrl);
    };

    resolveSource();
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack?.audioUrl) return;
    cacheTrackForOffline(currentTrack.id, currentTrack.audioUrl).catch(() => undefined);
  }, [currentTrack]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const formattedTime = (value: number) => {
    if (!value || Number.isNaN(value)) return '0:00';
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="sticky bottom-0 z-40 border-t border-white/10 bg-spotify-dark/95 px-6 py-4 backdrop-blur">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        loop={repeat}
      />
      <div className="grid items-center gap-4 lg:grid-cols-[1.5fr_2fr_1fr]">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl">
            <Image src={currentTrack.artwork} alt={currentTrack.title} fill className="object-cover" unoptimized />
          </div>
          <div>
            <p className="font-semibold">{currentTrack.title}</p>
            <p className="text-sm text-white/60">{currentTrack.artist}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={toggleShuffle}
              className={`text-xs uppercase tracking-[0.2em] ${shuffle ? 'text-spotify-green' : 'text-white/50'}`}
            >
              Shuffle
            </button>
            <button
              onClick={togglePlay}
              className="rounded-full bg-white/10 px-6 py-2 text-sm font-semibold transition hover:bg-white/20"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={toggleRepeat}
              className={`text-xs uppercase tracking-[0.2em] ${repeat ? 'text-spotify-green' : 'text-white/50'}`}
            >
              Repeat
            </button>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span>{formattedTime(progress)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={(event) => handleSeek(Number(event.target.value))}
              className="w-full accent-spotify-green"
            />
            <span>{formattedTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="w-32 accent-spotify-green"
          />
        </div>
      </div>
      <LyricsPanel trackTitle={currentTrack.title} artist={currentTrack.artist} />
    </div>
  );
}
