import questlineHeaderImg from '../assets/images/questline-header.png'
import rewardBadge from '../assets/images/reward icons/reward-free-badge.png'
import rewardFreeSpins from '../assets/images/reward icons/reward-free-spins.png'
import rewardGC from '../assets/images/reward icons/reward-gc.png'
import rewardRandom from '../assets/images/reward icons/reward-random-reward.png'
import type { QuestLineDialogProps, Reward, RewardType } from '../types/questline'

// Map reward types to icon URLs
const REWARD_ICON_MAP: Record<RewardType, string> = {
  GC: rewardGC,
  FREE_SPINS: rewardFreeSpins,
  BADGE: rewardBadge,
  RANDOM: rewardRandom,
}

/**
 * Transform raw questline data into component props format
 */
export function transformQuestLineData(rawData: any): QuestLineDialogProps {
  const { questlineCode, title, description, expiresAt, termsUrl, quests, bonusReward } = rawData

  // Transform quests and add icon URLs to rewards
  const transformedQuests = quests.map((quest: any) => ({
    ...quest,
    rewards: quest.rewards.map((reward: any) => ({
      ...reward,
      iconUrl: REWARD_ICON_MAP[reward.type as RewardType],
    })),
  }))

  // Transform bonus rewards
  const transformedBonusReward = {
    ...bonusReward,
    rewards: bonusReward.rewards.map((reward: any) => ({
      ...reward,
      iconUrl: REWARD_ICON_MAP[reward.type as RewardType],
    })),
  }

  return {
    isOpen: true,
    questlineCode,
    title,
    description,
    headerImageUrl: questlineHeaderImg,
    endTime: expiresAt,
    quests: transformedQuests,
    bonusReward: transformedBonusReward,
    termsUrl,
    onClose: () => {},
  }
}

/**
 * Format reward amount for display
 */
export function formatRewardAmount(reward: Reward): string {
  switch (reward.type) {
    case 'GC':
      return reward.amount >= 1000
        ? `${(reward.amount / 1000).toFixed(0)}K`
        : reward.amount.toString()
    case 'FREE_SPINS':
      return reward.amount.toString()
    case 'BADGE':
      return reward.name || 'Badge'
    case 'RANDOM':
      return reward.name || 'Mystery'
    default:
      return reward.amount.toString()
  }
}

/**
 * Get reward display text
 */
export function getRewardText(reward: Reward): string {
  switch (reward.type) {
    case 'GC':
      return 'GC'
    case 'FREE_SPINS':
      return reward.amount === 1 ? 'Free Spin' : 'Free Spins'
    case 'BADGE':
      return reward.name || 'Badge'
    case 'RANDOM':
      return reward.name || 'Mystery Reward'
    default:
      return ''
  }
}
