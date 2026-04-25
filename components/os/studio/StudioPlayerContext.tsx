'use client';

import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { useYouTubePlayer } from './useYouTubePlayer';

interface StudioPlayerProviderProps {
  initialVideoId: string;
  children: ReactNode;
}

interface LoadTrackParams {
  videoId: string;
  autoplay: boolean;
}

export interface StudioPlayerContextValue {
  isReady: boolean;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  ensureReady: () => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  loadTrack: (params: LoadTrackParams) => void;
  setVolume: (next: number) => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
}

const DEFAULT_VOLUME = 60;
const PLAYER_MOUNT_ID = 'os-studio-yt-mount';
const VOLUME_MIN = 0;
const VOLUME_MAX = 100;

const HIDDEN_HOST_STYLE: CSSProperties = {
  position: 'fixed',
  width: 1,
  height: 1,
  left: -9999,
  top: -9999,
  opacity: 0,
  pointerEvents: 'none',
};

const StudioPlayerContext = createContext<StudioPlayerContextValue | null>(
  null
);

function clampVolume(next: number): number {
  if (Number.isNaN(next)) return VOLUME_MIN;
  if (next < VOLUME_MIN) return VOLUME_MIN;
  if (next > VOLUME_MAX) return VOLUME_MAX;
  return Math.round(next);
}

export function StudioPlayerProvider({
  initialVideoId,
  children,
}: StudioPlayerProviderProps): ReactElement {
  const player = useYouTubePlayer({
    initialVideoId,
    containerId: PLAYER_MOUNT_ID,
  });
  const [volume, setVolumeState] = useState<number>(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const hasPushedInitialStateRef = useRef<boolean>(false);

  useEffect(() => {
    if (!player.isReady || hasPushedInitialStateRef.current) return;
    player.setVolume(volume);
    if (isMuted) player.mute();
    hasPushedInitialStateRef.current = true;
  }, [player, volume, isMuted]);

  const setVolume = (next: number): void => {
    const clamped = clampVolume(next);
    setVolumeState(clamped);
    player.setVolume(clamped);
    if (isMuted && clamped > 0) {
      player.unmute();
      setIsMuted(false);
    }
  };

  const mute = (): void => {
    player.mute();
    setIsMuted(true);
  };

  const unmute = (): void => {
    player.unmute();
    setIsMuted(false);
  };

  const toggleMute = (): void => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  };

  const value: StudioPlayerContextValue = {
    isReady: player.isReady,
    isPlaying: player.isPlaying,
    volume,
    isMuted,
    ensureReady: player.activate,
    play: player.play,
    pause: player.pause,
    toggle: player.toggle,
    loadTrack: player.loadVideo,
    setVolume,
    mute,
    unmute,
    toggleMute,
  };

  return (
    <StudioPlayerContext.Provider value={value}>
      <div aria-hidden style={HIDDEN_HOST_STYLE}>
        <div id={PLAYER_MOUNT_ID} />
      </div>
      {children}
    </StudioPlayerContext.Provider>
  );
}

export function useStudioPlayer(): StudioPlayerContextValue {
  const ctx = useContext(StudioPlayerContext);
  if (!ctx) {
    throw new Error(
      '[useStudioPlayer] must be used inside <StudioPlayerProvider>'
    );
  }
  return ctx;
}
