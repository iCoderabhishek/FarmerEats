import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/modules/auth/auth.slice';
import signupReducer from '@/modules/signup/signup.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;