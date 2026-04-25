'use client';

import { useEffect, useState } from 'react';

import { useStudioPlayer } from '@/components/os/studio/StudioPlayerContext';
import type { StudioTrack } from '@/components/os/types';
import { studioTracks } from '@/data/os/studio';

const VU_BAR_COUNT = 12;
const VU_RED_THRESHOLD = 8;
const VU_AMBER_THRESHOLD = 6;
const VU_TICK_MS = 110;
const DECK_A_MOOD = 'LIVE MIX';
const DECK_B_MOOD = 'OFFLINE';
const DECK_B_TRACK_NAME = 'Welcome to my zone.';
const DECK_B_DUR = '∞';

type DeckSide = 'A' | 'B';

interface DeckProps {
  side: DeckSide;
  track: StudioTrack;
  mood: string;
  durOverride?: string;
  isPlaying: boolean;
  isStatic: boolean;
  vuTick: number;
  onPrev?: () => void;
  onNext?: () => void;
  onTogglePlay?: () => void;
  isPlayDisabled?: boolean;
}

function getNeighborTrack({
  current,
  step,
}: {
  current: StudioTrack;
  step: number;
}): StudioTrack {
  const i = studioTracks.indexOf(current);
  const len = studioTracks.length;
  const nextIndex = (i + step + len) % len;
  return studioTracks[nextIndex];
}

function getVuPeak(vuTick: number): number {
  const wave =
    0.55 + 0.32 * Math.sin(vuTick * 0.55) + 0.18 * Math.sin(vuTick * 1.43);
  const clamped = Math.max(0.18, Math.min(1, wave));
  return Math.max(2, Math.round(clamped * VU_BAR_COUNT));
}

function VuMeter({
  active,
  vuTick,
}: {
  active: boolean;
  vuTick: number;
}): React.ReactElement {
  const peak = active ? getVuPeak(vuTick) : 0;
  return (
    <div className='vu'>
      {Array.from({ length: VU_BAR_COUNT }).map((_, i) => {
        if (!active || i >= peak) {
          return <span key={i} />;
        }
        let cls = 'lvl-green';
        if (i >= VU_RED_THRESHOLD) {
          cls = 'lvl-red';
        } else if (i >= VU_AMBER_THRESHOLD) {
          cls = 'lvl-amber';
        }
        return <span key={i} className={cls} />;
      })}
    </div>
  );
}

function Deck({
  side,
  track,
  mood,
  durOverride,
  isPlaying,
  isStatic,
  vuTick,
  onPrev,
  onNext,
  onTogglePlay,
  isPlayDisabled = false,
}: DeckProps): React.ReactElement {
  const liveColor = isPlaying ? 'var(--phosphor)' : '#5a564a';
  const cuedLabel = isStatic ? '◉ STATIC' : '● CUE';
  const liveLabel = isPlaying ? '● LIVE' : cuedLabel;
  const dur = durOverride ?? track.dur;
  return (
    <div
      className={`deck ${isPlaying ? 'playing' : ''} ${isStatic ? 'static' : ''}`}
      data-side={side}
    >
      <div className='meta'>DECK {side}</div>
      <div className='track'>{track.name}</div>
      <div className='stat-row'>
        <span>{mood}</span>
        <span>·</span>
        <span>{dur}</span>
        <span>·</span>
        <span style={{ color: liveColor }}>{liveLabel}</span>
      </div>
      <div className='platter-wrap'>
        <div className='platter' />
        <div className='tonearm'>
          <div className='tonearm-arm' />
          <div className='tonearm-head' />
        </div>
      </div>
      <VuMeter active={isPlaying} vuTick={vuTick} />
      <div className='deck-controls'>
        <button
          type='button'
          className='deck-btn'
          onClick={onPrev}
          disabled={isStatic}
        >
          ‹‹
        </button>
        <button
          type='button'
          className={`deck-btn ${isPlaying ? 'primary' : ''}`}
          onClick={onTogglePlay}
          disabled={isPlayDisabled || isStatic}
        >
          {isPlaying ? '■ STOP' : '▶ PLAY'}
        </button>
        <button
          type='button'
          className='deck-btn'
          onClick={onNext}
          disabled={isStatic}
        >
          ››
        </button>
      </div>
    </div>
  );
}

export function StudioWindow(): React.ReactElement {
  const studio = useStudioPlayer();
  const [aTrack, setATrack] = useState<StudioTrack>(studioTracks[0]);
  const [vuTick, setVuTick] = useState<number>(0);

  const { ensureReady } = studio;
  useEffect(() => {
    ensureReady();
  }, [ensureReady]);

  useEffect(() => {
    const id = setInterval(() => setVuTick(v => (v + 1) % 1024), VU_TICK_MS);
    return (): void => clearInterval(id);
  }, []);

  const isAPlaying = studio.isPlaying;

  const playTrack = (next: StudioTrack): void => {
    setATrack(next);
    studio.loadTrack({ videoId: next.videoId, autoplay: true });
  };

  const staticBTrack: StudioTrack = {
    id: -1,
    name: DECK_B_TRACK_NAME,
    videoId: '',
    dur: DECK_B_DUR,
  };

  return (
    <div
      className='os-window-body'
      style={{
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className='os-studio'>
        <div className='studio-deck'>
          <Deck
            side='A'
            track={aTrack}
            mood={DECK_A_MOOD}
            isPlaying={isAPlaying}
            isStatic={false}
            vuTick={vuTick}
            onPrev={(): void =>
              playTrack(getNeighborTrack({ current: aTrack, step: -1 }))
            }
            onNext={(): void =>
              playTrack(getNeighborTrack({ current: aTrack, step: 1 }))
            }
            onTogglePlay={studio.toggle}
            isPlayDisabled={!studio.isReady}
          />
          <Deck
            side='B'
            track={staticBTrack}
            mood={DECK_B_MOOD}
            durOverride={DECK_B_DUR}
            isPlaying={false}
            isStatic
            vuTick={vuTick}
          />
        </div>
        <div className='studio-tracklist'>
          <div className='tl-meta'>
            <span>{`// CRATE · ${studioTracks.length} tracks`}</span>
            <span>click → loads + plays on deck A</span>
          </div>
          <div className='tl-head'>
            <div style={{ textAlign: 'right' }}>#</div>
            <div>TITLE</div>
            <div>SOURCE</div>
            <div style={{ textAlign: 'right' }}>TIME</div>
          </div>
          {studioTracks.map(t => {
            const onA = aTrack.id === t.id;
            const isLivePlaying = isAPlaying && onA;
            return (
              <div
                key={t.id}
                className={`tl-row ${isLivePlaying ? 'playing' : ''} ${onA && !isLivePlaying ? 'cued' : ''}`}
                onClick={(): void => playTrack(t)}
                style={{ cursor: 'pointer' }}
              >
                <div className='num'>
                  {onA ? 'A' : String(t.id).padStart(2, '0')}
                </div>
                <div className='ttl'>{t.name}</div>
                <div className='bpm'>YT</div>
                <div className='dur'>{t.dur}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
