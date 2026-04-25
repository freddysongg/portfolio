'use client';

import type { ReactElement } from 'react';
import { useCallback, useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 900;

function isBelowBreakpoint(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

export function MobileBlocker(): ReactElement | null {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(isBelowBreakpoint());
    const handleResize = (): void => setIsMobile(isBelowBreakpoint());
    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDismiss = useCallback((): void => {
    setIsDismissed(true);
  }, []);

  if (!isMobile || isDismissed) return null;

  return (
    <div
      className='os-mobile-blocker'
      role='dialog'
      aria-modal='true'
      aria-labelledby='mobile-blocker-title'
    >
      <div className='os-mobile-blocker-card'>
        <div className='os-mobile-blocker-head'>
          <div className='os-mobile-blocker-logo' aria-hidden='true' />
          <div className='os-mobile-blocker-meta'>
            <span className='os-mobile-blocker-app'>Freddy OS</span>
            <span className='os-mobile-blocker-when'>now</span>
          </div>
        </div>
        <div id='mobile-blocker-title' className='os-mobile-blocker-title'>
          Best viewed on desktop
        </div>
        <div className='os-mobile-blocker-body'>
          I recommend you access this site on a MacBook or a desktop for the
          full experience.
        </div>
        <div className='os-mobile-blocker-actions'>
          <button
            type='button'
            className='os-mobile-blocker-btn'
            onClick={handleDismiss}
          >
            Continue anyway
          </button>
        </div>
      </div>
    </div>
  );
}
