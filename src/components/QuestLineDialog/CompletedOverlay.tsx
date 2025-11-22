import React from 'react'

export interface CompletedOverlayProps {
  hasRewards: boolean
}

export const CompletedOverlay = ({ hasRewards }: CompletedOverlayProps) => {
  const statusText = hasRewards ? 'Claimed' : 'Quest Done'

  return (
    <>
      <div className='completed-overlay' role='status' aria-label={`Quest completed: ${statusText}`} />
      <div className='completed-status' aria-hidden='true'>
        <div className='completed-status__icon'>✓</div>
        <span className='completed-status__text'>{statusText}</span>
      </div>
    </>
  )
}
