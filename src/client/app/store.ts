import { configureStore } from '@reduxjs/toolkit';
import userSlice, { changeUserId, initializeUser } from './slices/user';
import themeReducer from './slices/theme';
import { auth } from '../firebase';

export const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeReducer,
  },
});

auth.onAuthStateChanged(user => {
  const { isInitialized } = store.getState().user;

  if (isInitialized) {
    store.dispatch(changeUserId(user?.uid ?? null));
  } else {
    store.dispatch(initializeUser(user?.uid ?? null));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;