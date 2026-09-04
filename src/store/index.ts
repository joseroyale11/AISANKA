import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import studentReducer from './slices/studentSlice';
import languageReducer from './slices/languageSlice';
import progressReducer from './slices/progressSlice';
import syncReducer from './slices/syncSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    language: languageReducer,
    progress: progressReducer,
    sync: syncReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;