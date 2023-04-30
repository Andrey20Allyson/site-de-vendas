import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface UserState {
  id: string | null,
}

export const userState: UserState = {
  id: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    userIdChanged(state, action: PayloadAction<UserState['id']>) {
      state.id = action.payload;
    }
  }
});

export const { userIdChanged } = userSlice.actions;

export const idSelector = (state: RootState) => state.user.id;

export default userSlice.reducer;