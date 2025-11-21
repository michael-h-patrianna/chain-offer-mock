import { transformChainOfferData } from '../utils/transformChainOfferData'
import chainOffersRawData from './chainOffersData.json'

export function getDemoChainOfferDialogProps() {
  const expiresAt = new Date(Date.now() + 6 * 24 * 3600 * 1000 + 5 * 3600 * 1000).toISOString()
  const processedItems = (chainOffersRawData as any).items.map((item: any) => ({
    ...item,
    expiresAt,
  }))

  const assignedOffer = processedItems.find((item: any) => item.status === 'ASSIGNED')
  const offerToUse = assignedOffer ?? processedItems[0]

  if (!offerToUse) return null

  return transformChainOfferData(offerToUse)
}
