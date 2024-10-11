import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const INIT_AUTH = {
  isPending: true,
  isLogged: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INIT_AUTH,
  selectors: {
    selectIsPendingAuth: (state) => state.isPending,
    selectIsLoggedAuth: (state) => state.isLogged
  },
  reducers: {
    setIsLoggedAuthAction(state, action: PayloadAction<{ isLogged: boolean }>) {
      state.isLogged = action.payload.isLogged;
    },
    setIsPendingAuthAction(state, action: PayloadAction<{ isPending: boolean }>) {
      state.isPending = action.payload.isPending;
    }
  }
});

export const authSliceSelectors = authSlice.selectors;
export const { selectIsPendingAuth, selectIsLoggedAuth } = authSlice.selectors;
export const authSliceActions = authSlice.actions;
export const { setIsLoggedAuthAction, setIsPendingAuthAction } = authSlice.actions;
