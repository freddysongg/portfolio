'use client';

import type { ReactElement } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const isExitingRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const remainingMsRef = useRef<number>(autoDismissMs);

  const triggerExit = useCallback((): void => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;
    setIsExiting(true);
    window.setTimeout(onDismiss, EXIT_ANIM_MS);
  }, [onDismiss]);

  const clearAutoDismiss = useCallback((): void => {
    if (timerRef.current === null) return;
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const armAutoDismiss = useCallback(
    (ms: number): void => {
      clearAutoDismiss();
      startedAtRef.current = Date.now();
      remainingMsRef.current = ms;
      timerRef.current = window.setTimeout(triggerExit, ms);
    },
    [clearAutoDismiss, triggerExit]
  );

  const handleMouseEnter = useCallback((): void => {
    if (isExitingRef.current) return;
    if (timerRef.current === null || startedAtRef.current === null) return;
    const elapsed = Date.now() - startedAtRef.current;
    remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed);
    clearAutoDismiss();
  }, [clearAutoDismiss]);

  const handleMouseLeave = useCallback((): void => {
    if (isExitingRef.current) return;
    if (timerRef.current !== null) return;
    if (remainingMsRef.current <= 0) {
      triggerExit();
      return;
    }
    armAutoDismiss(remainingMsRef.current);
  }, [armAutoDismiss, triggerExit]);

  useEffect(() => {
    if (!open) {
      isExitingRef.current = false;
      setIsExiting(false);
      clearAutoDismiss();
      startedAtRef.current = null;
      remainingMsRef.current = autoDismissMs;
      return;
    }
    armAutoDismiss(autoDismissMs);
    return clearAutoDismiss;
  }, [open, autoDismissMs, armAutoDismiss, clearAutoDismiss]);

  if (!open && !isExiting) return null;

  const className = `os-notification${isExiting ? ' dismissing' : ''}`;

  return (
    <div
      className={className}
      role='alert'
      aria-live='polite'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
