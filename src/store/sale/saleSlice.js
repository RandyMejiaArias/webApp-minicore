import { createSlice } from '@reduxjs/toolkit';

export const saleSlice = createSlice({
  name: 'sale',
  initialState: {
    isSaving: false,
    messageSaved: '',
    status: '',
    sales: [],
    error: '',
    currentSale: {}
  },
  reducers: {
    savingNewSale: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      state.status = '';
    },
    setSavingSale: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      state.status = '';
    },
    setSavedSale: (state, action) => {
      state.isSaving = false;
      state.status = action.payload.status
    },
    setSales: (state, action) => {
      state.sales = action.payload.sales;
      state.messageSaved = action.payload.message;
      state.error = action.payload.error;
    },
    setCurrentSale: (state, action) => {
      state.currentSale = action.payload.currentSale
    }
  }
});

export const {
  savingNewSale,
  setCurrentSale,
  setSales,
  setSavedSale,
  setSavingSale
} = saleSlice.actions;