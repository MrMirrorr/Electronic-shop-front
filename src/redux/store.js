import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/products';
import { categoriesReducer } from './slices/categories';
import { authReducer } from './slices/auth';
import { uiReducer } from './slices/ui';

const store = configureStore({
	reducer: {
		products: productsReducer,
		categories: categoriesReducer,
		auth: authReducer,
		ui: uiReducer,
	},
});

export default store;
