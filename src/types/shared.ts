// Shared types across different feature areas

export type RewardType = 'GC' | 'SC' | 'FS' | 'XP' | 'FREE_SPINS' | 'RANDOM' | 'BADGE'

export interface BaseReward {
  type: RewardType
  amount: number
  iconUrl?: string
  name?: string // for RANDOM rewards
}

// Chain offer specific reward (extends base)
export interface ChainOfferReward extends BaseReward {
  type: 'GC' | 'SC' | 'FS' | 'XP' | 'FREE_SPINS' | 'RANDOM'
}

// Questline specific reward (extends base with additional properties)
export interface QuestlineReward extends BaseReward {
  type: 'GC' | 'FREE_SPINS' | 'BADGE' | 'RANDOM'
  freeAdornmentUrl?: string
}

// Generic reward type that can be either
export type Reward = ChainOfferReward | QuestlineReward
