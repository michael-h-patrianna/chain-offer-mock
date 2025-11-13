import React from 'react'
import './LockedOverlay.css'

export const LockedOverlay: React.FC = () => {
  return (
    <div className="locked-overlay">
      <img
        src="/assets/images/locked-questline.svg"
        alt="Locked quest"
        className="locked-overlay__icon"
      />
      <p className="locked-overlay__text">Complete previous quests to unlock</p>
    </div>
  )
}
