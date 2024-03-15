import { configureStore } from '@reduxjs/toolkit'
import Star from '../slices/addSlice'

export const store = configureStore({
  reducer: {
    data:Star,
  },
})