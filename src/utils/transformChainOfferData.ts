import type { ChainOfferDialogProps, ChainOfferMapItemProps } from '../components/ChainOfferDialog'
import type { Reward } from '../types/chainoffer'

// Raw data structure from backend API
interface RawPurchaseOffer {
  gc?: number
  sc?: number
  price?: number
}

interface RawContent {
  offerType?: string
  purchaseOffer?: RawPurchaseOffer
  gcAmount?: number
  scAmount?: number
  freeSpinsAmount?: number
}

interface RawItemType {
  code?: string
}

interface RawMapItem {
  code?: string
  name?: string
  position?: number
  status?: string
  type?: RawItemType
  content?: RawContent[]
}

interface RawMapTypeParams {
  mapListHeader?: {
    stringValue?: string
  }
}

interface RawMapType {
  params?: RawMapTypeParams
}

interface RawChainOfferData {
  mapItems?: RawMapItem[]
  expiresAt?: string
  mapType?: RawMapType
  displayTagline?: string
  displayName?: string
  termUrl?: string
}

// Local background images to use for map items
const localBackgroundImages = [
  '/assets/images/co-background1.png',
  '/assets/images/co-background2.png',
  '/assets/images/co-background3.png',
]

/**
 * Transform raw chain offer data into component props format
 */
export function transformChainOfferData(rawData: RawChainOfferData): ChainOfferDialogProps {
  const { mapItems = [], expiresAt, mapType, displayTagline, displayName, termUrl } = rawData

  // Use local background images (prefer local over remote URLs from data)
  const backgroundImages: string[] = localBackgroundImages

  const transformedItems: Omit<ChainOfferMapItemProps, 'onButtonClick'>[] = mapItems.map((item, index) => {
    const rewards: Reward[] = []

    // Content driven rewards
    item.content?.forEach((content) => {
      if (content.offerType === 'PURCHASE_OFFER' && content.purchaseOffer) {
        if ((content.purchaseOffer.gc ?? 0) > 0) rewards.push({ type: 'GC', amount: content.purchaseOffer.gc ?? 0 })
        if ((content.purchaseOffer.sc ?? 0) > 0) rewards.push({ type: 'SC', amount: content.purchaseOffer.sc ?? 0 })
      } else {
        if ((content.gcAmount ?? 0) > 0) rewards.push({ type: 'GC', amount: content.gcAmount ?? 0 })
        if ((content.scAmount ?? 0) > 0) rewards.push({ type: 'SC', amount: content.scAmount ?? 0 })
        if ((content.freeSpinsAmount ?? 0) > 0)
          rewards.push({ type: 'FREE_SPINS', amount: content.freeSpinsAmount ?? 0 })
      }
    })

    // Parse Stars / XP from the item name if present (e.g. "1,000 Gold Coins + 50 Stars")
    if (typeof item.name === 'string') {
      const starMatch = item.name.match(/([0-9][0-9,]*)\s*Stars?/i)
      if (starMatch) {
        const starAmount = parseInt(starMatch[1].replace(/,/g, ''), 10)
        if (starAmount > 0 && !rewards.some((r) => r.type === 'XP')) {
          rewards.push({ type: 'XP', amount: starAmount })
        }
      }
    }

    // Extract purchase price
    let price: number | undefined
    if (item.type?.code === 'PURCHASE') {
      const purchaseContent = item.content?.find((c) => c.purchaseOffer)
      price = purchaseContent?.purchaseOffer?.price
    }

    return {
      id: item.code || String(item.position || index + 1),
      name: item.name || '',
      position: item.position || index + 1,
      status: item.status === 'UNLOCKED' ? 'UNLOCKED' : item.status === 'CLAIMED' ? 'CLAIMED' : 'LOCKED',
      type: item.type?.code === 'PURCHASE' ? 'PURCHASE' : 'FREE',
      price,
      rewards,
      backgroundImage: backgroundImages[index] || backgroundImages[0],
    }
  })

  return {
    isOpen: true,
    imageSrc:
      mapType?.params?.mapListHeader?.stringValue ||
      'https://storage.googleapis.com/www.playfame.com/images/19082025_PF_STARSHOP_QUEST_HEADER_V4.png',
    // If backend expiry is unrealistically far (e.g., > 10 days) cap to ~6d 4h to mirror production display patterns
    endTime: (() => {
      const raw = expiresAt ? new Date(expiresAt).getTime() : Date.now() + 6 * 24 * 3600 * 1000
      const diffDays = (raw - Date.now()) / (1000 * 60 * 60 * 24)
      if (diffDays > 10) {
        return new Date(Date.now() + (6 * 24 + 4) * 3600 * 1000).toISOString()
      }
      return new Date(raw).toISOString()
    })(),
    title: displayTagline || displayName,
    items: transformedItems,
    termsUrl: termUrl || '#terms',
    onClose: () => {},
  }
}
