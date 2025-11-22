import React from 'react'

interface RewardService {
  getRewards: () => Promise<{ rewards: unknown[] }>
}

interface LoyaltyService {
  getAccountVariants: () => Promise<{ variants: unknown[] }>
}

interface OfferChainService {
  getOfferChainInstances: () => Promise<{ items: unknown[] }>
  claimOffer: () => Promise<{ success: boolean }>
}

interface RewardAmountProps {
  text: string
  className?: string
}

interface MapItemButtonProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export interface ChainOffersConfig {
  config: {
    serviceDependencies: {
      reward: RewardService
      loyalty: LoyaltyService
      offerchain: OfferChainService
    }
    featureFlags: {
      autoReopen: boolean
    }
    customClassNames: Record<string, string>
    RewardAmountSC: React.ComponentType<RewardAmountProps>
    RewardAmountGC: React.ComponentType<RewardAmountProps>
    RewardAmountFS: React.ComponentType<RewardAmountProps>
    RewardAmountXP: React.ComponentType<RewardAmountProps>
    MapItemButton: React.ComponentType<MapItemButtonProps>
  }
  dialogManager: {
    openDialog: (data: unknown) => void
    closeDialog: () => void
    openSnackBar: (params: { message: string }) => void
  }
  iconManager: {
    setIcons: (icons: Record<string, unknown>) => void
  }
}

// Create a mock config similar to the original
export const chainOffersConfig: ChainOffersConfig = {
  config: {
    serviceDependencies: {
      reward: {
        getRewards: () => Promise.resolve({ rewards: [] }),
      },
      loyalty: {
        getAccountVariants: () => Promise.resolve({ variants: [] }),
      },
      offerchain: {
        getOfferChainInstances: () => Promise.resolve({ items: [] }),
        claimOffer: () => Promise.resolve({ success: true }),
      },
    },
    featureFlags: { autoReopen: true },
    customClassNames: {},
    // Simple reward amount wrappers
    RewardAmountSC: ({ text, className }: RewardAmountProps) => React.createElement('span', { className }, text),
    RewardAmountGC: ({ text, className }: RewardAmountProps) => React.createElement('span', { className }, text),
    RewardAmountFS: ({ text, className }: RewardAmountProps) => React.createElement('span', { className }, text),
    RewardAmountXP: ({ text, className }: RewardAmountProps) => React.createElement('span', { className }, text),
    // Simple button component
    MapItemButton: ({ children, className, disabled, onClick }: MapItemButtonProps) =>
      React.createElement('button', { className, disabled, onClick }, children),
  },
  dialogManager: {
    openDialog: () => {},
    closeDialog: () => {},
    openSnackBar: () => {},
  },
  iconManager: {
    setIcons: () => {},
  },
}
