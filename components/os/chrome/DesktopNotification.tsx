'use client';

import type { ReactElement } from 'react';
import { useCallback, useEffect, useState } from 'react';

interface DesktopNotificationProps {
  open: boolean;
  appName: string;
  title: string;
  body: string;
  timeLabel?: string;
  autoDismissMs?: number;
  onDismiss: () => void;
}

const DEFAULT_AUTO_DISMISS_MS = 5000;
const EXIT_ANIM_MS = 240;

export function DesktopNotification({
  open,
  appName,
  title,
  body,
  timeLabel = 'now',
  autoDismissMs = DEFAULT_AUTO_DISMISS_MS,
  onDismiss,
}: DesktopNotificationProps): ReactElement | null {
  const [isExiting, setIsExiting] = useState(false);

  const triggerExit = useCallback((): void => {
    setIsExiting(true);
    window.setTimeout(onDismiss, EXIT_ANIM_MS);
  }, [onDismiss]);

  useEffect(() => {
    if (!open) {
      setIsExiting(false);
      return;
    }
    const t = window.setTimeout(triggerExit, autoDismissMs);
    return (): void => window.clearTimeout(t);
  }, [open, autoDismissMs, triggerExit]);

  if (!open && !isExiting) return null;

  const className = `os-notification${isExiting ? ' dismissing' : ''}`;

  return (
    <div
      className={className}
      role='alert'
      aria-live='polite'
      onClick={triggerExit}
    >
      <div className='os-notification-head'>
        <div className='os-notification-icon' aria-hidden='true'>
          in
        </div>
        <div className='os-notification-meta'>
          <span className='os-notification-app'>{appName}</span>
          <span className='os-notification-when'>{timeLabel}</span>
        </div>
        <button
          type='button'
          className='os-notification-close'
          aria-label='Dismiss notification'
          onClick={(event): void => {
            event.stopPropagation();
            triggerExit();
          }}
        >
          ×
        </button>
      </div>
      <div className='os-notification-title'>{title}</div>
      <div className='os-notification-body'>{body}</div>
    </div>
  );
}
