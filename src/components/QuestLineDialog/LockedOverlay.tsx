import React from 'react'
import lockedIcon from '../../assets/images/locked-questline.svg'
import './LockedOverlay.css'

export const LockedOverlay: React.FC = () => {
  return (
    <div className="locked-overlay">
      <img
        src={lockedIcon}
        alt="Locked quest"
        className="locked-overlay__icon"
      />
      <p className="locked-overlay__text">Complete previous quests to unlock</p>
    </div>
  )
}
