import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { saleSlice } from './sale';
import { productSlice } from './product/productSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    sales: saleSlice.reducer,
  }
})