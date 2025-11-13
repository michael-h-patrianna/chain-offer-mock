import React from 'react'

export interface Reward {
  type: 'GC' | 'SC' | 'FS' | 'XP' | 'FREE_SPINS' | 'RANDOM'
  amount: number
  iconUrl?: string
  name?: string // for RANDOM rewards
}

export interface ChainOfferMapRewardsProps {
  rewards: Reward[]
  className?: string
}

export const ChainOfferMapRewards: React.FC<ChainOfferMapRewardsProps> = ({
  rewards,
  className = ''
}) => {
  const getRewardText = (reward: Reward) => {
    switch (reward.type) {
      case 'GC':
        return `GC ${reward.amount}`
      case 'SC':
        return `Free SC ${reward.amount}`
      case 'FS':
      case 'FREE_SPINS':
        return `${reward.amount} Free Spins`
      case 'RANDOM':
        return reward.name ? reward.name : 'Mystery Reward'
      case 'XP':
        return `${reward.amount} Stars`
      default:
        return `${reward.amount}`
    }
  }

  const getRewardClass = (reward: Reward) => {
    const baseClass = 'chain-offer-reward'
    const typeClass = reward.type === 'FREE_SPINS' ? 'fs' : reward.type.toLowerCase()
    return `${baseClass} ${baseClass}--${typeClass}`
  }

  const getRewardIcon = (reward: Reward) => {
    if (reward.iconUrl) {
      return (
        <img
          src={reward.iconUrl}
          alt={`Icon ${reward.type}`}
          className="chain-offer-reward__icon"
          height="48"
        />
      )
    }

    // Production icon URLs
    const iconMap: Record<string, string> = {
      GC: 'https://storage.googleapis.com/www.playfame.com/images/chain-offers/GC_desktop.png',
      SC: 'https://storage.googleapis.com/www.playfame.com/images/chain-offers/SC_desktop.png',
      FS: 'https://storage.googleapis.com/www.playfame.com/images/chain-offers/free_spins_desktop.png',
      FREE_SPINS: 'https://storage.googleapis.com/www.playfame.com/images/chain-offers/free_spins_desktop.png',
      XP: 'https://storage.googleapis.com/www.playfame.com/images/Store_icon_-_65px_height_(1).png',
      RANDOM: 'https://storage.googleapis.com/www.playfame.com/images/Store_icon_-_65px_height_(1).png'
    }

    const iconUrl = iconMap[reward.type]
    if (iconUrl) {
      return (
        <img
          src={iconUrl}
          alt={`Icon ${reward.type}`}
          className="chain-offer-reward__icon"
          height="48"
        />
      )
    }

    // Final fallback
    return (
      <span className="chain-offer-reward__icon-fallback">
        🎁
      </span>
    )
  }

  return (
    <div className={`chain-offer-rewards ${className}`}>
      {rewards.map((reward, index) => (
        <div key={index} className={getRewardClass(reward)}>
          {getRewardIcon(reward)}
          <div className="chain-offer-reward__amount">
            {getRewardText(reward)}
          </div>
        </div>
      ))}
    </div>
  )
}
