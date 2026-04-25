'use client';

import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

type TrashAlertKind = 'click' | 'drop';

const ALERT_MESSAGES: Record<TrashAlertKind, string> = {
  click: 'You really thought you could access this?',
  drop: 'You really thought this was gonna work?',
};

const TRASH_REJECT_EVENT = 'os-trash-reject';
const TRASH_HOVER_EVENT = 'os-trash-hover';

export function TrashBin(): ReactElement {
  const [alert, setAlert] = useState<TrashAlertKind | null>(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const handleReject = (): void => setAlert('drop');
    const handleHover = (event: Event): void => {
      const detail = (event as CustomEvent<boolean>).detail;
      setIsOver(Boolean(detail));
    };
    window.addEventListener(TRASH_REJECT_EVENT, handleReject);
    window.addEventListener(TRASH_HOVER_EVENT, handleHover);
    return (): void => {
      window.removeEventListener(TRASH_REJECT_EVENT, handleReject);
      window.removeEventListener(TRASH_HOVER_EVENT, handleHover);
    };
  }, []);

  const handleClick = (): void => setAlert('click');
  const handleClose = (): void => setAlert(null);

  const binClasses = ['os-trash-bin'];
  if (isOver) binClasses.push('over');

  return (
    <>
      <button
        type='button'
        data-trash-zone
        className={binClasses.join(' ')}
        onClick={handleClick}
        aria-label='Recycle Bin'
      >
        <div className='os-trash-glyph' aria-hidden='true'>
          <span className='os-trash-handle' />
          <span className='os-trash-lid' />
          <span className='os-trash-body' />
        </div>
        <div className='label'>Recycle</div>
      </button>
      {alert ? (
        <div
          className='os-modal-overlay'
          onMouseDown={handleClose}
          role='presentation'
        >
          <div
            className='os-detail-modal os-trash-modal'
            onMouseDown={(event): void => event.stopPropagation()}
            role='alertdialog'
            aria-modal='true'
          >
            <div className='os-titlebar'>
              <div className='traffic'>
                <button
                  type='button'
                  className='traffic-light close'
                  onClick={handleClose}
                  aria-label='Dismiss'
                >
                  <span>×</span>
                </button>
                <span className='traffic-light min' aria-hidden='true' />
                <span className='traffic-light max' aria-hidden='true' />
              </div>
              <div className='title'>system message</div>
              <div className='spacer' />
            </div>
            <div className='os-trash-modal-body'>
              <div className='os-trash-modal-icon' aria-hidden='true'>
                !
              </div>
              <div className='os-trash-modal-text'>{ALERT_MESSAGES[alert]}</div>
              <button
                type='button'
                className='os-btn primary'
                onClick={handleClose}
              >
                fine
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
