import { configureStore } from '@reduxjs/toolkit';
import { authService } from '../modules/auth/AuthService';

const store = configureStore({
	reducer: {
		[authService.reducerPath]: authService.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(authService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
