import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from './tmdbApi';
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
});
