'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseYouTubePlayerArgs {
  initialVideoId: string;
  containerId: string;
}

export interface YouTubePlayerHandle {
  isReady: boolean;
  isPlaying: boolean;
  activate: () => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  loadVideo: (params: { videoId: string; autoplay: boolean }) => void;
  setVolume: (next: number) => void;
  mute: () => void;
  unmute: () => void;
}

const YT_SCRIPT_SRC = 'https://www.youtube.com/iframe_api';

let apiPromise: Promise<typeof YT> | null = null;

function loadYouTubeApi(): Promise<typeof YT> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<typeof YT>((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(
        new Error(
          '[useYouTubePlayer] cannot load YouTube IFrame API outside the browser'
        )
      );
      return;
    }
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = (): void => {
      previousReady?.();
      if (window.YT?.Player) {
        resolve(window.YT);
      } else {
        reject(
          new Error(
            '[useYouTubePlayer] YouTube IFrame API loaded without YT.Player'
          )
        );
      }
    };
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${YT_SCRIPT_SRC}"]`
    );
    if (existing) return;
    const script = document.createElement('script');
    script.src = YT_SCRIPT_SRC;
    script.async = true;
    script.onerror = (): void => {
      apiPromise = null;
      reject(
        new Error('[useYouTubePlayer] failed to load YouTube IFrame API script')
      );
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function useYouTubePlayer({
  initialVideoId,
  containerId,
}: UseYouTubePlayerArgs): YouTubePlayerHandle {
  const playerRef = useRef<YT.Player | null>(null);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activate = useCallback((): void => {
    setIsActivated(true);
  }, []);

  useEffect(() => {
    if (!isActivated) return;
    let isCancelled = false;
    let createdPlayer: YT.Player | null = null;

    loadYouTubeApi()
      .then(YTApi => {
        if (isCancelled) return;
        const mountEl = document.getElementById(containerId);
        if (!mountEl) {
          throw new Error(
            `[useYouTubePlayer] mount element #${containerId} not found in DOM`
          );
        }
        createdPlayer = new YTApi.Player(mountEl, {
          videoId: initialVideoId,
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            disablekb: 1,
            autoplay: 0,
            playsinline: 1,
          },
          events: {
            onReady: (): void => {
              if (isCancelled) return;
              playerRef.current = createdPlayer;
              setIsReady(true);
            },
            onStateChange: (event): void => {
              if (isCancelled) return;
              setIsPlaying(event.data === YTApi.PlayerState.PLAYING);
            },
          },
        });
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : 'unknown error';
        throw new Error(`[useYouTubePlayer] init failed: ${message}`);
      });

    return (): void => {
      isCancelled = true;
      const existing = playerRef.current ?? createdPlayer;
      if (existing) {
        existing.destroy();
      }
      playerRef.current = null;
    };
  }, [isActivated, initialVideoId, containerId]);

  const play = (): void => {
    playerRef.current?.playVideo();
  };
  const pause = (): void => {
    playerRef.current?.pauseVideo();
  };
  const toggle = (): void => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };
  const loadVideo = ({
    videoId,
    autoplay,
  }: {
    videoId: string;
    autoplay: boolean;
  }): void => {
    const p = playerRef.current;
    if (!p) return;
    if (autoplay) {
      p.loadVideoById(videoId);
    } else {
      p.cueVideoById(videoId);
    }
  };
  const setVolume = (next: number): void => {
    playerRef.current?.setVolume(next);
  };
  const mute = (): void => {
    playerRef.current?.mute();
  };
  const unmute = (): void => {
    playerRef.current?.unMute();
  };

  return {
    isReady,
    isPlaying,
    activate,
    play,
    pause,
    toggle,
    loadVideo,
    setVolume,
    mute,
    unmute,
  };
}
