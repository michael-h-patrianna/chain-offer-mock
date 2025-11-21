

export interface Reward {
  type: 'GC' | 'SC' | 'FS' | 'XP' | 'FREE_SPINS' | 'RANDOM'
  amount: number
  iconUrl?: string
  name?: string // for RANDOM rewards
}
