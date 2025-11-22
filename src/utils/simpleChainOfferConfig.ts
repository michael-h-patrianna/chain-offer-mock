import { ChainOfferDialogProps } from '../components/ChainOfferDialog'
import type { Reward } from '../types/chainoffer'

// Local background images to use for map items
const localBackgroundImages = [
  '/assets/images/co-background1.png',
  '/assets/images/co-background2.png',
  '/assets/images/co-background3.png'
]

// Simplified configuration types for easier test setup
export interface SimpleChainOfferConfig {
  headerImage: string
  /** Seconds until expiration */
  expiresInSeconds: number
  /** Optional title text */
  title?: string
  /** Terms & Conditions URL */
  termsUrl?: string
  items: SimpleChainOfferItem[]
}

export type SimpleChainOfferItem = {
  type: 'FREE' | 'PURCHASE'
  /** Required for PURCHASE */
  price?: number
  rewards: SimpleReward[]
}

export type SimpleReward =
  | { type: 'GC'; amount: number } // Gold Coins
  | { type: 'SC'; amount: number } // Sweepstakes Coins (can be fractional e.g. 0.20)
  | { type: 'FREE_SPINS'; amount: number }
  | { type: 'STARS'; amount: number }
  | { type: 'RANDOM'; name: string } // Always amount 1, name required

interface BuildOptions {
  /** Override now (ms) for deterministic tests */
  now?: number
}

export function buildDialogFromSimpleConfig(
  config: SimpleChainOfferConfig,
  opts: BuildOptions = {}
): ChainOfferDialogProps {
  const now = opts.now ?? Date.now()
  const endTime = new Date(now + config.expiresInSeconds * 1000).toISOString()

  const items = config.items.map((item, idx) => {
    if (item.type === 'PURCHASE' && (item.price == null || isNaN(item.price))) {
      throw new Error(`Purchase item at index ${String(idx)} missing valid price`)
    }

  const rewards: Reward[] = item.rewards.map(r => {
      switch (r.type) {
        case 'GC':
          return { type: 'GC', amount: r.amount }
        case 'SC':
          return { type: 'SC', amount: r.amount }
        case 'FREE_SPINS':
          return { type: 'FREE_SPINS', amount: r.amount }
        case 'STARS':
          return { type: 'XP', amount: r.amount }
        case 'RANDOM':
          return { type: 'RANDOM', amount: 1, name: r.name }
        default: {
          const unknownType: never = r
          throw new Error(`Unsupported reward type: ${String((unknownType as { type: string }).type)}`)
        }
      }
    })

    return {
      id: `simple-${String(idx + 1)}`,
      name: `${item.type === 'PURCHASE' ? 'Purchase' : 'Free'} Step ${String(idx + 1)}`,
      position: idx + 1,
      status: (idx === 0 ? 'UNLOCKED' : 'LOCKED') as 'LOCKED' | 'UNLOCKED' | 'CLAIMED',
      type: item.type,
      price: item.type === 'PURCHASE' ? item.price : undefined,
      rewards,
      backgroundImage: localBackgroundImages[idx % localBackgroundImages.length],
    }
  })

  return {
    isOpen: true,
    imageSrc: config.headerImage,
    endTime,
    title: config.title,
    items,
    termsUrl: config.termsUrl,
    onClose: () => {},
  }
}

// Helper factory for tests
export function createSimpleConfig(partial: Partial<SimpleChainOfferConfig> = {}): SimpleChainOfferConfig {
  return {
    headerImage: 'https://example.com/header.png',
    expiresInSeconds: 3600,
    title: 'Test Offer',
    termsUrl: 'https://example.com/terms',
    items: [
      { type: 'PURCHASE', price: 9.99, rewards: [{ type: 'GC', amount: 50000 }, { type: 'SC', amount: 0.2 }] },
      { type: 'FREE', rewards: [{ type: 'FREE_SPINS', amount: 10 }, { type: 'STARS', amount: 10 }] },
      { type: 'FREE', rewards: [{ type: 'RANDOM', name: 'Mystery Wheel' }] }
    ],
    ...partial,
  }
}
