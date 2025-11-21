import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { App } from '../ui/App'

beforeAll(() => {
  // mock fetch for JSON + images
  global.fetch = (async (input: RequestInfo) => {
    if (typeof input === 'string' && input.endsWith('chain-offer-list.json')) {
      return new Response(JSON.stringify(require('../../public/chain-offer-list.json')))
    }
    // image fetch stub
    return new Response(new Blob(['']))
  }) as any
})

describe('Chain Offers Mock', () => {
  it('renders icon and opens dialog', async () => {
    render(<App />)
    const img = await screen.findByAltText('promo img')
    expect(img).toBeInTheDocument()
    fireEvent.click(img)
    await waitFor(() => {
      // header image inside dialog
      expect(document.querySelector('dialog')).toBeTruthy()
    })
  })
})
