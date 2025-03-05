import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IInitialState } from './interFace';
import { GIFT } from 'common/interface';

const initialState: IInitialState = {
  confirmLogoutVisible: false,
  isOpenDataForm: true,
  accessToken: "",
  // permissionPhoneNumber: true,
  listGiftData: [],
};

export const homeSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setLogoutVisible: (state, action: PayloadAction<boolean>) => {
      state.confirmLogoutVisible = action.payload;
    },
    setIsOpenDataForm: (state, action: PayloadAction<boolean>) => {
      state.isOpenDataForm = action.payload;
    },
    setAccessTokenApp: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setGiftData: (state, action: PayloadAction<GIFT[]>) => {
      state.listGiftData = action.payload;
    },
    // setPermissionPhoneNumber: (state, action: PayloadAction<boolean>) => {
    //   state.permissionPhoneNumber = action.payload;
    // }
  },
});

export const {
  setLogoutVisible,
  setIsOpenDataForm,
  setAccessTokenApp,
  setGiftData,
} = homeSlice.actions;

export default homeSlice.reducer;
