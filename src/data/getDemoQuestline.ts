import { transformQuestLineData } from '../utils/transformQuestLineData'
import questlineRawDataUnknown from './questlineData.json'

export function getDemoQuestlineDialogProps() {
  return transformQuestLineData(questlineRawDataUnknown as Record<string, unknown>)
}

export function getSimpleQuestlineDialogProps() {
  const base = getDemoQuestlineDialogProps()
  // Create a simplified version with only 1 quest
  return {
    ...base,
    title: 'Simple Quest',
    description: 'Complete this single quest to claim your reward!',
    quests: [
      {
        ...base.quests[1], // Use "unclaimed" quest for demo
        title: 'Quick Win Challenge',
        description: 'Win 5,000 GC in any slot game.',
        status: 'unclaimed' as const,
      },
    ],
    bonusReward: {
      rewards: [
        {
          type: 'GC' as const,
          amount: 5000,
          iconUrl: '/assets/images/reward icons/reward-gc.png',
        },
        {
          type: 'FREE_SPINS' as const,
          amount: 10,
          iconUrl: '/assets/images/reward icons/reward-free-spins.png',
          freeAdornmentUrl: '/assets/images/reward icons/free.png',
        },
      ],
      claimed: false,
      progressRequired: 1,
    },
  }
}
