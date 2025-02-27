import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartMiniData, IInitialState } from './interface';


const initialState: IInitialState = {
  cartMiniData: {
    giftListData: [],
    quantity: 0
  }
};

export const cartMiniSlice = createSlice({
  name: 'cartMini',
  initialState,
  reducers: {
    setCartMini: (state, action: PayloadAction<ICartMiniData>) => {
      state.cartMiniData = action.payload
    }
  },
});

export const {
  setCartMini,
  
} = cartMiniSlice.actions;

export default cartMiniSlice.reducer;
