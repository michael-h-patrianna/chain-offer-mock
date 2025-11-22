import React from 'react'

interface ChainOfferIconProps {
  onClick: () => void
}

export const ChainOfferIcon = ({ onClick }: ChainOfferIconProps) => {
  return (
    <div className='RandomRewardsHomePageIcon_root__JxS_V' onClick={onClick} style={{ cursor: 'pointer' }}>
      <button className='RandomRewardsHomePageIcon_button__lKIUV'>
        <img
          alt='Random Rewards'
          className='RandomRewardsHomePageIcon_image__DlPXb RandomRewardsHomePageIcon_loaded__8_Zdt'
          src='/images/chain-offer-icon.png'
        />
        {/* Timer matching QuestLinesIcon style/position */}
        <div className='QuestLinesEntryLayout_content__64GDs'>
          <div
            className='Timer_root__k0daR'
            style={{
              backgroundColor: 'rgb(198, 255, 119)',
              color: 'rgb(29, 9, 47)',
              fontSize: '16px',
              fontWeight: '900',
              borderRadius: '20px',
              padding: '0px 6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '20px',
              width: 'fit-content',
              marginBottom: '2px', // Nudge up to match Questline vertical alignment
            }}
          >
            13:31:19
          </div>
        </div>
      </button>
    </div>
  )
}
