import { configureStore } from '@reduxjs/toolkit'
import Star from '../slices/addSlice'
import paymentReducer from '../slices/paymentSlice'

export const store = configureStore({
  reducer: {
    data:Star,
    payment: paymentReducer,
  },
})