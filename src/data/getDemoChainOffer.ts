import { transformChainOfferData } from '../utils/transformChainOfferData'
import chainOffersRawDataUnknown from './chainOffersData.json'

interface RawChainOfferItem {
  status?: string
  [key: string]: unknown
}

interface ChainOffersDataFile {
  items?: RawChainOfferItem[]
}

export function getDemoChainOfferDialogProps() {
  const expiresAt = new Date(Date.now() + 6 * 24 * 3600 * 1000 + 5 * 3600 * 1000).toISOString()
  const chainOffersRawData = chainOffersRawDataUnknown as ChainOffersDataFile
  const processedItems = (chainOffersRawData.items ?? []).map((item) => ({
    ...item,
    expiresAt,
  }))

  const assignedOffer = processedItems.find((item) => item.status === 'ASSIGNED')

  if (assignedOffer) {
    return transformChainOfferData(assignedOffer)
  }

  if (processedItems[0]) {
    return transformChainOfferData(processedItems[0])
  }

  return null
}
