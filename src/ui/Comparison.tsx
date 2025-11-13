import React from 'react'
import { ChainOfferDialog } from '../components'
import rawData from '../data/chainOffersData.json'
import { transformChainOfferData } from '../utils/transformChainOfferData'

export const Comparison: React.FC = () => {
  const instance = (rawData as any).items[0]
  const dialogProps = transformChainOfferData(instance)
  return (
    <div style={{ padding: 24 }}>
      <h1>Chain Offer Dialog - Transformed vs Static Reference</h1>
      <ChainOfferDialog {...dialogProps} />
    </div>
  )
}

export default Comparison
