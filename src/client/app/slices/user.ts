import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { auth } from '../../firebase';

export interface UserState {
  id: string | null;
  isInitialized: boolean;
}

export const userState: UserState = {
  id: null,
  isInitialized: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    changeUserId(state, action: PayloadAction<UserState['id']>) {
      state.id = action.payload;
    },
    initializeUser(state, action: PayloadAction<UserState['id']>) {
      state.isInitialized = true;
      state.id = action.payload;
    },
  }
});


export const { changeUserId, initializeUser } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;
export const userIdSelector = (state: RootState) => state.user.id;
export const userIsInitializedSelector = (state: RootState) => state.user.isInitialized;

export default userSlice.reducer;