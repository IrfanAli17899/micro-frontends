import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../types';

export interface AppState {
  products: Product[];
  selectedProducts: Record<string, boolean>;
}

const initialState: AppState = {
  products: [
    { id: '1', name: 'Product 1', price: 10 },
    { id: '2', name: 'Product 2', price: 20 },
    { id: '3', name: 'Product 3', price: 30 },
  ],
  selectedProducts: {},
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProducts[action.payload.id] = true;
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      delete state.selectedProducts[action.payload.id];
    }
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct } = appSlice.actions

export default appSlice.reducer