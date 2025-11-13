import React from 'react'
import './CompletedOverlay.css'

export interface CompletedOverlayProps {
  hasRewards: boolean
}

export const CompletedOverlay: React.FC<CompletedOverlayProps> = ({ hasRewards }) => {
  return (
    <>
      <div className="completed-overlay" />
      <div className="completed-status">
        <div className="completed-status__icon">✓</div>
        <span className="completed-status__text">
          {hasRewards ? 'Claimed' : 'Quest Done'}
        </span>
      </div>
    </>
  )
}
