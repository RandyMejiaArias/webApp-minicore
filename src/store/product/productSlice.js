import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    isSaving: false,
    messageSaved: '',
    status: '',
    products: [],
    error: '',
    currentProduct: {}
  },
  reducers: {
    savingNewProduct: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      state.status = '';
    },
    setSavingProduct: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      state.status = '';
    },
    setSavedProduct: (state, action) => {
      state.isSaving = false;
      state.status = action.payload.status
    },
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.messageSaved = action.payload.message;
      state.error = action.payload.error;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload.currentProduct
    }
  }
});

export const {
  savingNewProduct,
  setCurrentProduct,
  setProducts,
  setSavedProduct,
  setSavingProduct
} = productSlice.actions;