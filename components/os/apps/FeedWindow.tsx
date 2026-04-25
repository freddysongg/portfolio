/* eslint-disable @next/next/no-img-element */
'use client';

import type { MouseEvent as ReactMouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import type {
  FeedImageItem,
  FeedPost,
  ReactionDef,
  ReactionKey,
} from '@/components/os/types';
import { feedPosts, REACTION_TYPES } from '@/data/os/feed';
import { profile } from '@/data/os/profile';

interface ReactPixProps {
  type: ReactionKey;
  onClick?: (e: ReactMouseEvent<HTMLSpanElement>) => void;
}

interface FeedWindowProps {
  targetPostId?: string | null;
  onTargetHandled?: () => void;
}

const PICKER_CLOSE_DELAY_MS = 180;
const TOP_REACTIONS_LIMIT = 3;
const HIGHLIGHT_HOLD_MS = 1600;
const SCROLL_DELAY_MS = 60;

function findReaction(key: ReactionKey | null): ReactionDef | undefined {
  if (!key) return undefined;
  return REACTION_TYPES.find(r => r.key === key);
}

function ReactPix({ type, onClick }: ReactPixProps): React.ReactElement {
  const def = findReaction(type);
  return (
    <span
      className={`react-pix ${type}`}
      data-label={def?.label}
      onClick={onClick}
    >
      {def?.glyph}
    </span>
  );
}

interface PostImageProps {
  src: string;
  label?: string;
  href?: string;
  objectPosition?: string;
}

function PostImage({
  src,
  label,
  href,
  objectPosition,
}: PostImageProps): React.ReactElement {
  const className = `post-image has-img${href ? ' linked' : ''}`;
  const imgStyle = objectPosition ? { objectPosition } : undefined;
  const content = (
    <>
      <img src={src} alt={label ?? ''} style={imgStyle} />
      {label ? <div className='ph-label'>{label}</div> : null}
    </>
  );
  if (href) {
    return (
      <a
        className={className}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
      >
        {content}
      </a>
    );
  }
  return <div className={className}>{content}</div>;
}

interface PostCarouselProps {
  items: FeedImageItem[];
}

function PostCarousel({ items }: PostCarouselProps): React.ReactElement {
  const [index, setIndex] = useState<number>(0);
  const total = items.length;
  const current = items[index];

  const goPrev = (e: ReactMouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setIndex(prev => (prev - 1 + total) % total);
  };
  const goNext = (e: ReactMouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setIndex(prev => (prev + 1) % total);
  };
  const goTo = (next: number) => (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIndex(next);
  };

  return (
    <div className='post-image has-img is-carousel'>
      <div className='carousel-track'>
        {items.map((item, i) => (
          <img
            key={item.src}
            src={item.src}
            alt={item.label ?? ''}
            className={i === index ? 'carousel-slide active' : 'carousel-slide'}
            style={
              item.objectPosition
                ? { objectPosition: item.objectPosition }
                : undefined
            }
          />
        ))}
      </div>
      {total > 1 ? (
        <>
          <button
            type='button'
            className='carousel-nav carousel-prev'
            onClick={goPrev}
            aria-label='Previous image'
          >
            ‹
          </button>
          <button
            type='button'
            className='carousel-nav carousel-next'
            onClick={goNext}
            aria-label='Next image'
          >
            ›
          </button>
          <div className='carousel-dots'>
            {items.map((item, i) => (
              <button
                type='button'
                key={item.src}
                className={i === index ? 'carousel-dot active' : 'carousel-dot'}
                onClick={goTo(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
      {current.label ? <div className='ph-label'>{current.label}</div> : null}
    </div>
  );
}

interface PostProps {
  post: FeedPost;
  isHighlighted: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
}

function Post({
  post,
  isHighlighted,
  registerRef,
}: PostProps): React.ReactElement {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [reaction, setReaction] = useState<ReactionKey | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);
  const pickerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return (): void => {
      if (pickerTimer.current) clearTimeout(pickerTimer.current);
    };
  }, []);

  const topReactions = (
    Object.entries(post.reactions) as Array<[ReactionKey, number]>
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_REACTIONS_LIMIT)
    .map(([k]) => k);

  const handlePointerEnter = (): void => {
    if (pickerTimer.current) clearTimeout(pickerTimer.current);
    setShowPicker(true);
  };

  const handlePointerLeave = (): void => {
    pickerTimer.current = setTimeout(
      () => setShowPicker(false),
      PICKER_CLOSE_DELAY_MS
    );
  };

  const activeReaction = findReaction(reaction);

  return (
    <div
      ref={registerRef}
      className={`post ${isHighlighted ? 'highlight' : ''}`}
      data-post-id={post.id}
    >
      <div className='post-head'>
        <div className='mini-avatar'>{post.avatar}</div>
        <div className='meta'>
          <div className='who'>{post.who}</div>
          <div className='what'>{post.what}</div>
          <div className='when'>{post.when}</div>
        </div>
        <button type='button' className='more'>
          ···
        </button>
      </div>
      <div className='post-body'>
        {post.body.split('\n').map((line, i) => (
          <p key={`${post.id}-line-${i}`} style={{ marginBottom: 8 }}>
            {line.split(/(#\w+)/g).map((part, j) =>
              part.startsWith('#') ? (
                <span key={`${post.id}-tag-${i}-${j}`} className='hashtag'>
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </p>
        ))}
      </div>
      {post.hasImage ? (
        post.imgGallery && post.imgGallery.length > 0 ? (
          <PostCarousel items={post.imgGallery} />
        ) : post.imgSrc ? (
          <PostImage
            src={post.imgSrc}
            label={post.imgLabel}
            href={post.imgHref}
            objectPosition={post.imgObjectPosition}
          />
        ) : (
          <div className='post-image'>
            {post.imgLabel ? (
              <div className='ph-label'>{post.imgLabel}</div>
            ) : null}
          </div>
        )
      ) : null}
      <div className='post-stats'>
        <div className='reactions-stack'>
          {topReactions.map(r => (
            <ReactPix key={r} type={r} />
          ))}
        </div>
        <span>{post.total + (reaction ? 1 : 0)}</span>
        <span style={{ marginLeft: 'auto' }}>
          {post.comments.length} comments
        </span>
      </div>
      <div className='post-actions'>
        <div
          style={{ position: 'relative' }}
          onMouseEnter={handlePointerEnter}
          onMouseLeave={handlePointerLeave}
        >
          <button
            type='button'
            className={`post-action ${reaction ? 'active' : ''}`}
            onClick={(): void => setReaction(reaction ? null : 'fire')}
            style={{ width: '100%' }}
          >
            <span className='glyph'>
              {activeReaction ? activeReaction.glyph : '△'}
            </span>
            {activeReaction ? activeReaction.label : 'React'}
          </button>
          {showPicker ? (
            <div className='react-popover'>
              {REACTION_TYPES.map(r => (
                <span
                  key={r.key}
                  className={`react-pix ${r.key}`}
                  data-label={r.label}
                  onClick={(e): void => {
                    e.stopPropagation();
                    setReaction(r.key);
                    setShowPicker(false);
                  }}
                >
                  {r.glyph}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <button
          type='button'
          className='post-action'
          onClick={(): void => setShowComments(!showComments)}
        >
          <span className='glyph'>◌</span> Comment
        </button>
        <button type='button' className='post-action'>
          <span className='glyph'>↻</span> Repost
        </button>
        <button type='button' className='post-action'>
          <span className='glyph'>↗</span> Share
        </button>
      </div>
      {showComments ? (
        <div className='post-comments'>
          {post.comments.map((c, i) => {
            const initials = c.who
              .split(' ')
              .map(w => w[0])
              .slice(0, 2)
              .join('');
            return (
              <div className='comment' key={`${post.id}-comment-${i}`}>
                <div className='mini-avatar'>{initials}</div>
                <div className='bubble'>
                  <div className='who'>{c.who}</div>
                  <div className='text'>{c.text}</div>
                  <div className='when'>{c.when} ago</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function FeedWindow({
  targetPostId,
  onTargetHandled,
}: FeedWindowProps): React.ReactElement {
  const firstName = profile.name.split(' ')[0];
  const postRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    if (!targetPostId) return;
    const el = postRefs.current.get(targetPostId);
    if (!el) return;
    const scrollTimer = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, SCROLL_DELAY_MS);
    setHighlightedId(targetPostId);
    const clearTimer = setTimeout(() => {
      setHighlightedId(null);
      onTargetHandled?.();
    }, HIGHLIGHT_HOLD_MS);
    return (): void => {
      clearTimeout(scrollTimer);
      clearTimeout(clearTimer);
    };
  }, [targetPostId, onTargetHandled]);

  return (
    <div
      className='os-window-body padded'
      style={{ background: 'var(--paper-2)' }}
    >
      <div className='section-head'>
        <h2>{'// Field Notes'}</h2>
        <div className='meta'>{feedPosts.length} posts</div>
      </div>
      <div className='composer'>
        <div className='mini-avatar'>FS</div>
        <div className='ghost-input'>Start a post, {firstName}…</div>
      </div>
      <div className='feed' style={{ marginTop: 14 }}>
        {feedPosts.map(p => (
          <Post
            post={p}
            key={p.id}
            isHighlighted={highlightedId === p.id}
            registerRef={(el): void => {
              if (el) postRefs.current.set(p.id, el);
              else postRefs.current.delete(p.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
