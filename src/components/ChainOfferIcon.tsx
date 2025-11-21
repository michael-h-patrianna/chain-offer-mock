import React from 'react'

interface ChainOfferIconProps {
  onClick: () => void
}

export const ChainOfferIcon: React.FC<ChainOfferIconProps> = ({ onClick }) => {
  return (
    <div className="RandomRewardsHomePageIcon_root__JxS_V" onClick={onClick} style={{cursor: 'pointer'}}>
      <button className="RandomRewardsHomePageIcon_button__lKIUV">
        <img 
          alt="Random Rewards" 
          className="RandomRewardsHomePageIcon_image__DlPXb RandomRewardsHomePageIcon_loaded__8_Zdt" 
          src="/images/0a57925c9582128e6e7afc32fd2ec9d5.png" 
        />
      </button>
    </div>
  )
}