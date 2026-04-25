'use client';

import type { CSSProperties, ReactElement } from 'react';

import type { IconKind, ProjectColor } from '@/components/os/types';

interface PixelIconProps {
  kind: IconKind;
  color?: ProjectColor | 'ink';
  glyph?: string;
}

const GLYPH_KINDS: ReadonlySet<IconKind> = new Set<IconKind>([
  'pix-app',
  'pix-music',
  'pix-terminal',
]);

export function PixelIcon({
  kind,
  color,
  glyph,
}: PixelIconProps): ReactElement {
  const style: CSSProperties = color
    ? {
        background: color === 'ink' ? 'var(--ink)' : `var(--${color})`,
        color: 'var(--paper)',
      }
    : {};

  const shouldRenderGlyph = GLYPH_KINDS.has(kind) && Boolean(glyph);

  return (
    <div className={`pix-icon ${kind}`} style={style}>
      {shouldRenderGlyph ? glyph : null}
    </div>
  );
}
