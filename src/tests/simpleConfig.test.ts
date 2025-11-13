import { describe, expect, it } from 'vitest'
import { buildDialogFromSimpleConfig, createSimpleConfig } from '../utils/simpleChainOfferConfig'

describe('simpleChainOfferConfig', () => {
  it('builds dialog props with correct item mapping', () => {
    const config = createSimpleConfig({
      expiresInSeconds: 1800,
      items: [
        { type: 'PURCHASE', price: 19.99, rewards: [{ type: 'GC', amount: 75000 }, { type: 'SC', amount: 0.5 }] },
        { type: 'FREE', rewards: [{ type: 'FREE_SPINS', amount: 20 }, { type: 'STARS', amount: 15 }] },
        { type: 'FREE', rewards: [{ type: 'RANDOM', name: 'Mystery Wheel' }] }
      ]
    })
    const dialog = buildDialogFromSimpleConfig(config, { now: 0 })
    expect(dialog.items).toHaveLength(3)
    expect(dialog.items[0].type).toBe('PURCHASE')
    expect(dialog.items[0].rewards.find(r => r.type === 'GC')?.amount).toBe(75000)
    expect(dialog.items[1].rewards.find(r => r.type === 'FREE_SPINS')?.amount).toBe(20)
    expect(dialog.items[2].rewards[0].type).toBe('RANDOM')
    // expiry check
    expect(new Date(dialog.endTime).getTime()).toBe(1800 * 1000)
  })
})
