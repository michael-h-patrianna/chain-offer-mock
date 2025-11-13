import React from 'react'

export interface ChainOffersConfig {
  config: {
    serviceDependencies: {
      reward: any
      loyalty: any
      offerchain: any
    }
    featureFlags: {
      autoReopen: boolean
    }
    customClassNames: Record<string, string>
    RewardAmountSC: React.ComponentType<any>
    RewardAmountGC: React.ComponentType<any>
    RewardAmountFS: React.ComponentType<any>
    RewardAmountXP: React.ComponentType<any>
    MapItemButton: React.ComponentType<any>
  }
  dialogManager: {
    openDialog: (data: any) => void
    closeDialog: () => void
    openSnackBar: (params: { message: string }) => void
  }
  iconManager: {
    setIcons: (icons: Record<string, any>) => void
  }
}

// Create a mock config similar to the original
export const chainOffersConfig: ChainOffersConfig = {
  config: {
    serviceDependencies: {
      reward: {
        getRewards: async () => ({ rewards: [] }),
      },
      loyalty: {
        getAccountVariants: async () => ({ variants: [] }),
      },
      offerchain: {
        getOfferChainInstances: async () => ({ items: [] }),
        claimOffer: async () => ({ success: true }),
      },
    },
    featureFlags: { autoReopen: true },
    customClassNames: {},
    // Simple reward amount wrappers
    RewardAmountSC: ({ text, className }: any) => React.createElement('span', { className }, text),
    RewardAmountGC: ({ text, className }: any) => React.createElement('span', { className }, text),
    RewardAmountFS: ({ text, className }: any) => React.createElement('span', { className }, text),
    RewardAmountXP: ({ text, className }: any) => React.createElement('span', { className }, text),
    // Simple button component
    MapItemButton: ({ children, className, disabled, onClick }: any) =>
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
