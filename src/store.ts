import { configureStore } from '@reduxjs/toolkit'
import { chainOffersReducer } from './store/chainOffersSlice'

export const store = configureStore({
  reducer: {
    chainOffers: chainOffersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
