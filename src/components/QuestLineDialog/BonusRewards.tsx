import React, { useState } from 'react'
import type { BonusRewardsProps } from '../../types/questline'
import { formatRewardAmount, getRewardText } from '../../utils/transformQuestLineData'

const MAX_REWARDS_PREVIEW = 4

export const BonusRewards = ({ rewards, claimed, progressRequired, completedQuests, onClaim }: BonusRewardsProps) => {
  const [isExpanded] = useState(false)

  const canClaim = completedQuests >= progressRequired && !claimed

  const rewardsToShow = isExpanded ? rewards : rewards.slice(0, MAX_REWARDS_PREVIEW)

  return (
    <div className='bonus-rewards'>
      <div className='bonus-rewards__card'>
        <div className='bonus-rewards__header'>
          <h3 className='bonus-rewards__title'>ULTIMATE REWARD</h3>
        </div>
        <div className='bonus-rewards__content'>
          {rewardsToShow.map((reward, index) => (
            <div key={index} className='bonus-rewards__reward-item'>
              <div className='bonus-rewards__reward-icon-wrapper'>
                {reward.iconUrl && (
                  <img src={reward.iconUrl} alt={getRewardText(reward)} className='bonus-rewards__reward-icon' />
                )}
                {reward.freeAdornmentUrl && (
                  <img src={reward.freeAdornmentUrl} alt='Free' className='bonus-rewards__reward-free-adornment' />
                )}
              </div>
              <p className='bonus-rewards__reward-text'>
                {reward.type === 'GC' && (
                  <>
                    GC <span className='bonus-rewards__reward-amount'>{formatRewardAmount(reward)}</span>
                  </>
                )}
                {reward.type === 'FREE_SPINS' && (
                  <>
                    <span className='bonus-rewards__reward-amount'>{reward.amount}</span> FREE SPINS
                  </>
                )}
                {reward.type !== 'GC' && reward.type !== 'FREE_SPINS' && getRewardText(reward)}
              </p>
            </div>
          ))}
        </div>
      </div>
      {canClaim && (
        <button className='bonus-rewards__claim-button' onClick={onClaim} disabled={false}>
          Claim Bonus
        </button>
      )}
    </div>
  )
}
