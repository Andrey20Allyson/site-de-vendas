import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { THEME } from '../../utils/storage-keys';
import type { RootState } from '../store';
import { Themes } from '../features/theme';

export interface ThemeState {
  current: Themes,
}

function getDefaultTheme() {
  const storedTheme = window.localStorage.getItem(THEME);

  if (!storedTheme) return Themes.LIGHT;

  return JSON.parse(storedTheme) as Themes; 
}

export const userState: ThemeState = {
  current: getDefaultTheme(),
};

export const userSlice = createSlice({
  name: 'theme',
  initialState: userState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemeState['current']>) {
      state.current = action.payload;
    }
  }
});

export const { changeTheme } = userSlice.actions;

export const themeSelector = (state: RootState) => state.theme.current;

export default userSlice.reducer;