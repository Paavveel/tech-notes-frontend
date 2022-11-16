import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IAuthResponse } from './authTypes';

interface IInitialState {
  token: null | string;
}

const initialState: IInitialState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthResponse>) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state, action: PayloadAction) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
