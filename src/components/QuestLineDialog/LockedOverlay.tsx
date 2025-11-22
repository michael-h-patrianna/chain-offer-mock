import React from 'react'

export const LockedOverlay = () => {
  return (
    <div className='locked-overlay' role='status' aria-label='Quest locked. Complete previous quests to unlock.'>
      <img src='/assets/images/locked-questline.svg' alt='' className='locked-overlay__icon' aria-hidden='true' />
      <p className='locked-overlay__text' aria-hidden='true'>
        Complete previous quests to unlock
      </p>
    </div>
  )
}
