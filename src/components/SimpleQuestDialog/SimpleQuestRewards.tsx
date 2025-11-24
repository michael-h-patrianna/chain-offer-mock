import { useState } from 'react'
import type { BonusRewardsProps } from '../../types/questline'
import { formatRewardAmount, getRewardText } from '../../utils/transformQuestLineData'

const MAX_REWARDS_PREVIEW = 4

export const SimpleQuestRewards = ({ rewards }: BonusRewardsProps) => {
  const [isExpanded] = useState(false)

  const rewardsToShow = isExpanded ? rewards : rewards.slice(0, MAX_REWARDS_PREVIEW)

  return (
    <div className='simple-quest-rewards'>
      <div className='simple-quest-rewards__content'>
        {rewardsToShow.map((reward, index) => (
          <div key={index} className='simple-quest-rewards__item'>
            <div className='simple-quest-rewards__icon-wrapper'>
              {reward.iconUrl && (
                <img src={reward.iconUrl} alt={getRewardText(reward)} className='simple-quest-rewards__icon' />
              )}
              {reward.freeAdornmentUrl && (
                <img src={reward.freeAdornmentUrl} alt='Free' className='simple-quest-rewards__free-adornment' />
              )}
            </div>
            <p className='simple-quest-rewards__text'>
              {reward.type === 'GC' && (
                <>
                  GC <span className='simple-quest-rewards__amount'>{formatRewardAmount(reward)}</span>
                </>
              )}
              {reward.type === 'FREE_SPINS' && (
                <>
                  <span className='simple-quest-rewards__amount'>{reward.amount}</span> FREE SPINS
                </>
              )}
              {reward.type !== 'GC' && reward.type !== 'FREE_SPINS' && getRewardText(reward)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
