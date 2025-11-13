import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChainOfferReward {
  type: 'GC' | 'SC' | 'FREE_SPINS' | 'XP'
  amount: number
}

export interface ChainOfferMapItem {
  code: string
  stepNumber: number
  status: 'LOCKED' | 'UNLOCKED' | 'CLAIMED'
  type: 'FREE' | 'PURCHASE'
  price?: number
  currency?: string
  rewards: ChainOfferReward[]
  backgroundImage?: string
  dividerImage?: string
}

export interface ChainOfferInstance {
  id: string
  code: string
  status: 'ASSIGNED' | 'COMPLETED' | 'EXPIRED'
  expiresAt: string
  iconLarge: string
  iconSmall: string
  title?: string
  mapItems: ChainOfferMapItem[]
}

export interface ChainOffersState {
  items: ChainOfferInstance[]
  isBootstrapped: boolean
  loading: boolean
  error: string | null
}

const initialState: ChainOffersState = {
  items: [],
  isBootstrapped: false,
  loading: false,
  error: null,
}

const chainOffersSlice = createSlice({
  name: 'chainOffers',
  initialState,
  reducers: {
    setChainOffersItems: (state, action: PayloadAction<ChainOfferInstance[]>) => {
      state.items = action.payload
    },
    setChainOffersBootstrapped: (state) => {
      state.isBootstrapped = true
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    claimOffer: (state, action: PayloadAction<{ instanceCode: string; mapItemCode: string }>) => {
      const { instanceCode, mapItemCode } = action.payload
      const instance = state.items.find(item => item.code === instanceCode)
      if (instance) {
        const mapItemIndex = instance.mapItems.findIndex(item => item.code === mapItemCode)
        if (mapItemIndex >= 0) {
          // Mark current item as claimed
          instance.mapItems[mapItemIndex].status = 'CLAIMED'
          // Unlock next item if it exists and is locked
          const nextItem = instance.mapItems[mapItemIndex + 1]
          if (nextItem && nextItem.status === 'LOCKED') {
            nextItem.status = 'UNLOCKED'
          }
        }
      }
    },
  },
})

export const {
  setChainOffersItems,
  setChainOffersBootstrapped,
  setLoading,
  setError,
  claimOffer,
} = chainOffersSlice.actions

export const chainOffersReducer = chainOffersSlice.reducer
