// Questline Dialog Types
import type { AnimationType } from '../animations/revealAnimations'
import type { QuestlineReward } from './shared'

export type QuestStatus = 'locked' | 'in_progress' | 'unclaimed' | 'completed'

export type RewardType = 'GC' | 'FREE_SPINS' | 'BADGE' | 'RANDOM'

// Re-export as Reward for backwards compatibility
export type Reward = QuestlineReward

export interface Quest {
  questCode: string
  title: string
  description: string
  status: QuestStatus
  progress: number // 0-100
  rewards: Reward[]
  ranking: number
}

export interface BonusReward {
  rewards: Reward[]
  claimed: boolean
  progressRequired: number // Number of quests needed (e.g., 5)
}

export interface BonusRewardsProps extends BonusReward {
  completedQuests: number
  onClaim?: () => void
}

export interface QuestLineDialogProps {
  isOpen: boolean
  questlineCode: string
  title: string
  description: string
  headerImageUrl: string
  endTime: string | number
  quests: Quest[]
  bonusReward: BonusReward
  termsUrl?: string
  onClose: () => void
  onQuestAction?: (questCode: string, action: 'go' | 'claim') => void
  onClaimBonus?: () => void
  animationType?: AnimationType
}
