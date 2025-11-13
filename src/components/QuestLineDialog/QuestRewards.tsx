import React from 'react'
import type { Reward } from '../../types/questline'
import { formatRewardAmount, getRewardText } from '../../utils/transformQuestLineData'
import './QuestRewards.css'

export interface QuestRewardsProps {
  rewards: Reward[]
  large?: boolean
}

export const QuestRewards: React.FC<QuestRewardsProps> = ({ rewards, large = false }) => {
  return (
    <div className="quest-rewards">
      <div className="quest-rewards__label">You get:</div>
      <div className="quest-rewards__items">
        {rewards.map((reward, index) => (
          <div
            key={index}
            className={`quest-reward ${large ? 'quest-reward--large' : ''}`}
          >
            {reward.iconUrl && (
              <img
                src={reward.iconUrl}
                alt={getRewardText(reward)}
                className="quest-reward__icon"
              />
            )}
            <div className="quest-reward__text">
              <span className="quest-reward__amount">{formatRewardAmount(reward)}</span>
              <span className="quest-reward__type">{getRewardText(reward)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
