import React from 'react'
import { ChainOfferDialog } from '../components/ChainOfferDialog'
import { buildDialogFromSimpleConfig, createSimpleConfig } from '../utils/simpleChainOfferConfig'

export const SimpleHarness: React.FC = () => {
  const dialog = buildDialogFromSimpleConfig(createSimpleConfig({
    expiresInSeconds: 7200,
    items: [
      { type: 'PURCHASE', price: 4.99, rewards: [{ type: 'GC', amount: 50000 }, { type: 'SC', amount: 0.2 }] },
      { type: 'FREE', rewards: [{ type: 'FREE_SPINS', amount: 15 }, { type: 'STARS', amount: 25 }] },
      { type: 'FREE', rewards: [{ type: 'RANDOM', name: 'Mystery Wheel' }] }
    ]
  }), { now: 0 })
  return (
    <div style={{ padding: 24 }}>
      <h1>Simple Config Harness</h1>
      <ChainOfferDialog {...dialog} />
    </div>
  )
}

export default SimpleHarness
