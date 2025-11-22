import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import chainOfferListData from '../../public/chain-offer-list.json'
import { App } from '../ui/App'

beforeAll(() => {
  // mock fetch for JSON + images
  global.fetch = ((input: RequestInfo) => {
    if (typeof input === 'string' && input.endsWith('chain-offer-list.json')) {
      return new Response(JSON.stringify(chainOfferListData))
    }
    // image fetch stub
    return new Response(new Blob(['']))
  }) as typeof fetch
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
