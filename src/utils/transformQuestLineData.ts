import type { BonusReward, Quest, QuestLineDialogProps, QuestStatus, Reward, RewardType } from '../types/questline';

interface RawReward {
  type?: string;
  amount?: number;
  name?: string;
  [key: string]: unknown;
}

interface RawQuest {
  rewards?: RawReward[];
  [key: string]: unknown;
}

interface RawBonusReward {
  rewards?: RawReward[];
  claimed?: boolean;
  progressRequired?: number;
  [key: string]: unknown;
}

interface RawQuestLineData {
  questlineCode?: string;
  title?: string;
  description?: string;
  expiresAt?: string;
  termsUrl?: string;
  quests?: RawQuest[];
  bonusReward?: RawBonusReward;
  [key: string]: unknown;
}

// Map reward types to icon URLs (served from public folder)
const REWARD_ICON_MAP: Record<RewardType, string> = {
  GC: '/assets/images/reward icons/reward-gc.png',
  FREE_SPINS: '/assets/images/reward icons/reward-free-spins.png',
  BADGE: '/assets/images/reward icons/reward-free-badge.png',
  RANDOM: '/assets/images/reward icons/reward-random-reward.png',
}

/**
 * Transform raw questline data into component props format
 */
export function transformQuestLineData(rawData: Record<string, unknown>): QuestLineDialogProps {
  const data = rawData as RawQuestLineData;
  const { questlineCode, title, description, expiresAt, termsUrl, quests, bonusReward } = data

  // Transform quests and add icon URLs to rewards
  const transformedQuests: Quest[] = (quests ?? []).map((quest) => ({
    questCode: String(quest.questCode || ''),
    title: String(quest.title || ''),
    description: String(quest.description || ''),
    status: (quest.status || 'locked') as QuestStatus,
    progress: Number(quest.progress || 0),
    ranking: Number(quest.ranking || 0),
    rewards: (quest.rewards ?? []).map((reward) => ({
      type: (reward.type || 'GC') as RewardType,
      amount: Number(reward.amount || 0),
      name: reward.name,
      iconUrl: REWARD_ICON_MAP[reward.type as RewardType] || '',
      freeAdornmentUrl: reward.type === 'FREE_SPINS' ? '/assets/images/reward icons/free.png' : undefined,
    })),
  }))

  // Transform bonus rewards
  const transformedBonusReward: BonusReward = bonusReward ? {
    claimed: !!bonusReward.claimed,
    progressRequired: Number(bonusReward.progressRequired || 0),
    rewards: (bonusReward.rewards ?? []).map((reward) => ({
      type: (reward.type || 'GC') as RewardType,
      amount: Number(reward.amount || 0),
      name: reward.name,
      iconUrl: REWARD_ICON_MAP[reward.type as RewardType] || '',
      freeAdornmentUrl: reward.type === 'FREE_SPINS' ? '/assets/images/reward icons/free.png' : undefined,
    })),
  } : { rewards: [], claimed: false, progressRequired: 0 }

  return {
    isOpen: true,
    questlineCode: questlineCode ?? '',
    title: title ?? '',
    description: description ?? '',
    headerImageUrl: '/assets/images/questline-header.png',
    endTime: expiresAt ?? new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    quests: transformedQuests,
    bonusReward: transformedBonusReward,
    termsUrl: termsUrl ?? '#terms',
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
